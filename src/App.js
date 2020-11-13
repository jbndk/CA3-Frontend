import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react"
import facade from "./apiFacade";
import TwoJokes from './jokes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch,
  Prompt,
  Link,
  useHistory
} from "react-router-dom";

function LogIn({ login, errorMessage, setErrorMessage }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);


  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }

  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }


  return (
    <div>
      <form onChange={onChange} >
        <div className="col-sm-1">
          <br />
          <h2>Login</h2>
          <input class="form-control" placeholder="User Name" id="username" />
          <input class="form-control" placeholder="Password" id="password" />
          <br />
          <button class="btn btn-primary" onClick={performLogin}>Login</button>
        </div>
      </form>
      <h2>{errorMessage}</h2>
    </div>
  )
}

function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...")

  useEffect(() => {
    facade.fetchUserData().then(data => setDataFromServer(data.msg));
  }, [])

  useEffect(() => {
    facade.fetchAdminData().then(data => setDataFromServer(data.msg));
  }, [])

  return (
    <div>
      <h2>{dataFromServer} </h2>
    </div>
  )

}

function Header({ isLoggedin, loginMsg }) {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      {isLoggedin && (
        <li><NavLink activeClassName="active" to="/jokes">Jokes</NavLink></li>
      )}
      <li><NavLink activeClassName="active" to="/login-out"> {loginMsg}  </NavLink></li>
      <li><NavLink activeClassName="active" to="/home2">Home2 </NavLink></li>
      <li><NavLink activeClassName="active" to="/readme">READ ME</NavLink></li>
    </ul>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  }

  const login = (user, pass) => {
    facade.login(user, pass)
      .then((res) => {
        setLoggedIn(true);
        setErrorMessage("");
      }).catch((error) => {
        error.fullError.then((err) => {
          setErrorMessage(err.message);
          console.log("Error: ", errorMessage);
        })
      })
  }

  return (
    <div class="col-sm">
      
      <Header loginMsg={loggedIn ? 'You are logged in' : 'Please log in'} isLoggedin={loggedIn} />

      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path='/login-out'>
          {!loggedIn ? (
            <LogIn
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              login={login} />
          ) : (
              <div>
                <LoggedIn />
                <button class="btn btn-primary" onClick={logout}>Logout</button>
              </div>
            )}
        </Route>

        <Route exact path="/home2">
          <Home2 />
        </Route>

        <Route path="/jokes">
          <Jokes />
        </Route>
        
        <Route path="/readme">
          <ReadMe />
        </Route>

        <Route path="*">
          <NoMatch />
        </Route>

      </Switch>

    </div>
  )
}

function Home() {
  return (
    <div>
      <br />
      <h2>Home</h2>
      <br/>
      <h4>Please go to the READ ME tab for instructions. </h4>
      <br />
    </div>
  );
}

function Home2() {
  return (
    <div>
      <h2>Home2</h2>
    </div>
  );
}

function Jokes() {
  return (
    <div>
      <h2>Two jokes</h2>
      <TwoJokes />
    </div>
  );
}

const NoMatch = () => {
  return (
    <div>
      <h3>
        No match found for this.
      </h3>
    </div>
  );
};

const ReadMe = () => {
  return (
    <div>
      <h3>
        READ ME
      </h3>
      <br/>
      <p>
        <b>Welcome to our REACT App startcode!</b>
        <br/>
        <br/>
        IMPORTANT! Before using our startcode, make sure that you have installed <a href="https://nodejs.org/en/">Node.js</a>.
        <br/>
        <br/>
        <b>How to use:</b>
        <ul>
          <li>Download the project <a href="https://github.com/jbndk/CA3-Frontend">here</a></li>
          <li>Delete the .git file from the project</li>
          <li>Open the folder in Git Bash or a similar program</li>
          <li>Run <i>npm start</i> to open the project in a browser with hot reload</li>
          <li>Run <i>code .</i> to open the project in Visual Studio Code</li>
          <li>Remember to change the URL in settings.js to point on your own REST endpoint</li>
        </ul>
        
        <b>You are now done - happy coding!</b>
        </p>
    </div>
  );
};

export default App;