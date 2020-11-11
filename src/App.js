import React, { useState,useEffect } from "react"
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
 
function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
 
  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials,[evt.target.id]: evt.target.value })
  }
 
  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange} >
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  )
 
}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...")
  
  useEffect(() => {
    facade.fetchData().then(data=> setDataFromServer(data.msg)); }, [])
 
  return (
    <div>
      <h2>Your are logged in as: {dataFromServer}</h2>
    </div>
  )
 
}
 
function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
 
  const logout = () => { 
    facade.logout();
    setLoggedIn(false);
   } 

  const login = (user, pass) => { 
    facade.login(user,pass)
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
    <div>
      <Header
          loginMsg={loggedIn ? 'You are logged in' : 'Please log in'}
          isLoggedin={loggedIn}
        />

      {!loggedIn ? (<LogIn login={login} />) :
        (
        <div>
          <LoggedIn />
          
          <Router>
      <div>



        <p></p>

        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/jokes">
            <Jokes />
          </Route>

          <Route>
            <NoMatch />
          </Route>

        </Switch>
      </div>

    </Router>
    
          <button onClick={logout}>Logout</button>
        </div>)}

    </div>
  )
}

function Header({ isLoggedin, loginMsg }) {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      {isLoggedin && (
        <React.Fragment>
          <li><NavLink activeClassName="selected" to="/jokes">Jokes</NavLink></li>
        </React.Fragment>
      )}
      <li><NavLink activeClassName="active" to="/login-out"> {loginMsg} </NavLink></li>
    </ul>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
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

export default App;