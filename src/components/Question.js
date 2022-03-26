import React from "react";

export default function Question (props) {
    const incorrectAnswers = props.incorrectAnswers
    const correctAnswer = props.correctAnswer
    return (
        <div className="question">
            <h2 className="question--text">{props.questionText}</h2>
            <div className="options">
                {props.optionElements}
            </div>
        </div>
    )
}


 