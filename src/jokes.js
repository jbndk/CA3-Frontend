import mainURL from "./settings";
import { useState } from "react";

const TwoJokes = () => {
    const [jokes, setJokes] = useState("");
    const GetJokes = () => {
        fetch(mainURL + "/api/jokes/parallel")
            .then((res) => res.json())
            .then((data) => {
                setJokes(data);
            });
    };
    return (
        <div>
            <h2>Dad joke:</h2>
            <ul>
            <li>{jokes.joke1}</li>
            <li>Link: {jokes.joke1Reference}</li>
            </ul>
            <h2>Chuck Norris joke:</h2>
            <ul>
            <li>{jokes.joke2}</li>
            <li>Link: {jokes.joke2Reference}</li>
            </ul>
            <br/>
            <button class="btn btn-primary" onClick={() => GetJokes()}>Press for two new jokes</button>
        </div>
    );
};

export default TwoJokes;