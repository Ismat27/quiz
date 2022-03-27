import React from "react";

export default function Option(props) {
    const questionId = props.questionId
    const id = props.id
    const optionIndex = props.index
    const styles = {
        backgroundColor: props.bg?props.bg:(props.isClicked? "#D6DBF5" : "white"),
        border: props.isClicked? "none" : "0.794239px solid #4D5B9E" 
    }
    return (
        <span
            style={styles}
            className="option" 
            onClick={() => props.handleOptionClick(questionId, id, optionIndex)}
        >
            {props.value}
        </span>
    )
}
