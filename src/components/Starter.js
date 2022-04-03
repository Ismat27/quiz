import React from "react";

export default function Starter(props) {
    return (
        <div className='starter'>
            <h1>Quizzical</h1>
            <form onSubmit={props.start}>
                <div className="form-item">
                    <label htmlFor="ques_no">Number of Questions</label>
                    <input id="ques_no" type={'number'} min={0} max={50} onChange={props.formElementHandler} name="ques_no" value={props.formData.ques_no}/>
                </div>
                <div className="form-item">
                    <label htmlFor="category">Select category</label>
                    <select id="category" name="category" value={props.formData.category} onChange={props.formElementHandler}>
                        <option value={""}>Any category</option>
                        <option value={"9"}>General Knowledge</option>
                        <option value={"10"}>Entertainment: Books</option>
                        <option value={"11"}>Entertainment: Films</option>
                        <option value={"12"}>Entertainment: Music</option>
                    </select>
                </div>
                <div className="form-item">
                    <label htmlFor="difficulty">Select Difficulty</label>
                    <select id="difficulty" name="difficulty" value={props.formData.difficulty} onChange={props.formElementHandler}>
                        <option value={""}>Any Difficulty</option>
                        <option value={"9"}>Easy</option>
                        <option value={"10"}>Medium</option>
                        <option value={"11"}>Hard</option>
                    </select>
                </div>
                <div className="form-item">
                    <label htmlFor="type">Select Type</label>
                    <select id="type" name="type" value={props.formData.type} onChange={props.formElementHandler}>
                        <option value={""} >Any Type</option>
                        <option value={"9"}>Multiple Choice</option>
                        <option value={"10"}>True/False</option>
                    </select>
                </div>
                {/* <button>Submit</button> */}
                <button className="start-btn">Start Quiz</button>
            </form>
            <p className="description">Some description if needed</p>
        </div>
    )
}