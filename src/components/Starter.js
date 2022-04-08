import React from "react";

export default function Starter(props) {
    return (
        <div className='starter'>
            <h1>Quizzical</h1>
            <form onSubmit={props.start}>
                <div className="form-item">
                    <label htmlFor="ques_no">Number of Questions</label>
                    <input
                        id="ques_no"
                        type={'number'}
                        min={0}
                        max={50}
                        onChange={props.formElementHandler}
                        name="ques_no"
                        value={props.formData.ques_no}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="category">Select category</label>
                    <select id="category" name="category" value={props.formData.category} onChange={props.formElementHandler}>
                        <option value={""}>Any category</option>
                        <option value={"9"}>General Knowledge</option>
                        <option value={"10"}>Entertainment: Books</option>
                        <option value={"11"}>Entertainment: Films</option>
                        <option value={"12"}>Entertainment: Music</option>
                        <option value={"19"}>Science: Mathematics</option>
                    </select>
                </div>
                <div className="form-item">
                    <label htmlFor="difficulty">Select Difficulty</label>
                    <select id="difficulty" name="difficulty" value={props.formData.difficulty} onChange={props.formElementHandler}>
                        <option value={""}>Any Difficulty</option>
                        <option value={"easy"}>Easy</option>
                        <option value={"medium"}>Medium</option>
                        <option value={"hard"}>Hard</option>
                    </select>
                </div>
                <div className="form-item">
                    <label htmlFor="type">Select Type</label>
                    <select id="type" name="type" value={props.formData.type} onChange={props.formElementHandler}>
                        <option value={""} >Any Type</option>
                        <option value={"multiple"}>Multiple Choice</option>
                        <option value={"boolean"}>True/False</option>
                    </select>
                </div>
                {/* <button>Submit</button> */}
                <button className="start-btn">Start Quiz</button>
            </form>
        </div>
    )
}