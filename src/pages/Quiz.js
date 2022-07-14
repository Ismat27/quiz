import { useState } from "react"

const Quiz = (props) => {

    const [index, setIndex] = useState(0)

    if (props.questions.length <= 0) {
        return (
            <h1>Loading...</h1>
           )
    }
   
    function nextQuestion(currentIndex, totalQuestions) {
        const lastIndex = totalQuestions - 1
        if (currentIndex < lastIndex) {
            setIndex(prev => prev + 1)
        }
        else {
            setIndex(prev => prev)
        }
    }

    function prevQuestion(currentIndex, totalQuestions) {
        if (currentIndex > 0) {
            setIndex(prev => prev - 1)
        }
        else {
            setIndex(prev => prev)
        }
    }

    return (
        <main className="quiz-area">
            <div className='questions--container'>
                <h1>Choose correct answer</h1>
                <h2 className="question-no">Question {index + 1} of {props.questions.length}</h2>
                {props.questionsData[index]}
            </div>
            <div className="nav-btns">
                <button onClick={() => prevQuestion(index, props.questions.length)}>Previous</button>
                <button onClick={() => nextQuestion(index, props.questions.length)}>Next</button>
            </div>
            {props.isAnswering?
                <button onClick={props.mark}>Submit</button>:
                <div className='score-info'>
                    <p>You scored {props.grade +"/"+ props.questions.length} correct answers</p>
                    <button onClick={props.playAgain}>Play again</button>
                </div>
            }
        </main>        
    )
   

}

export default Quiz