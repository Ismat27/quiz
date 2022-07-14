export default function Question (props) {
    return (
        <div className="question">
            <h2 className="question--text">{props.questionText}</h2>
            <div className="options">
                {props.optionElements}
            </div>
        </div>
    )
}


 