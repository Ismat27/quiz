import React from "react";

export default function Starter(props) {
    return (
        <div className='starter'>
            <h1>Quizzical</h1>
            <p className="description">Some description if needed</p>
            <button className="start-btn" onClick={props.start}>Start Quiz</button>
        </div>
    )
}