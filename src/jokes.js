import { useState } from "react";

const TwoJokes = () => {
    const [jokes, setJokes] = useState("");
    const GetJokes = () => {
        fetch("https://annemaj.dk/ca3/api/jokes/parallel")
            .then((res) => res.json())
            .then((data) => {
                setJokes(data);
            });
    };
    return (
        <div>
            <h2>Dad joke:</h2>
            <p>{jokes.joke1}</p>
            <p>Link: {jokes.joke1Reference}</p>
            <h2>Chuck Norris joke:</h2>
            <p>{jokes.joke2}</p>
            <p>Link: {jokes.joke2Reference}</p>
            <button onClick={() => GetJokes()}>Press for two new jokes</button>
        </div>
    );
};

export default TwoJokes;