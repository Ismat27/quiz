import './App.css'
import React, { useEffect, useState } from 'react'
import Question from './components/Question'
import Starter from './components/Starter'
import Option from './components/Option'

export default function App() {
    const [grade, setGrade] = useState(0)
    const [isSubmit, setIsubmit] = useState(false) // use for getting new questions
    const [isAnswering, setIsAnswering] = useState(true)
    const [questions, setQuestions] = useState([])
    const [isStart, setIsStart] = useState(false)
    const [formData, setFormData] = useState({
        ques_no: 10,
        category: "",
        difficulty: "",
        type: ""

    })
    // useEffect(() => {
    //     fetch("https://opentdb.com/api.php?amount=5&category=19&difficulty=medium")
    //     .then(response => response.json())
    //     .then(data => setQuestions(getQuestionsData(data.results)))

    // }, [isSubmit])
    function formElementHandler (event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        }) 
    }
    function handleFormSubmit(event) {
        console.log(formData);
        event.preventDefault()
    }
    const start = (event) => {
        setIsStart(true)
        fetch("https://opentdb.com/api.php?amount=5&category=19&difficulty=medium")
        .then(response => response.json())
        .then(data => setQuestions(getQuestionsData(data.results)))
        event.preventDefault()
    }
    function shuffle(arra1) {
        var ctr = arra1.length, temp, index;
    // While there are elements in the array
        while (ctr > 0) {
    // Pick a random index
            index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
            ctr--;
    // And swap the last element with it
            temp = arra1[ctr];
            arra1[ctr] = arra1[index];
            arra1[index] = temp;
        }
        return arra1;
    }

    // form questionsData to be an object that will contain  the following ppts:
    // questionText, questionId, correctAnswer, options (to be provided to user to pick the correct answer)

    function getQuestionsData(apiData) { 
        const newQuestions = apiData.map((data, index) => {
            const questionId = "question_" + (index+1)
            const options = shuffle([data.correct_answer, ...data.incorrect_answers])
            const newOptions = options.map((option, index) => {
                const optionId = questionId + "option_" + (index + 1)
                return {
                    index: index,
                    value: option,
                    id: optionId,
                    bg:"",
                    isClicked: false
                }
            })
            return {
                questionText: data.question,
                questionId: questionId,
                correctAnswer: data.correct_answer,
                options: newOptions,  
            }
        })
        return newQuestions
    }

    const questionsData = questions.map((data, index) => {
        const options = data.options
        const optionElements = options.map(optionData => {
            return (
                <Option
                    key={optionData.id}
                    questionId={data.questionId}
                    id={optionData.id}
                    index={optionData.index}
                    value={optionData.value}
                    isClicked={optionData.isClicked}
                    bg={optionData.bg}
                    handleOptionClick={handleOptionClick}
                />
            )
        })
        return (
            <Question
                key={data.questionId}
                id={data.questionId}
                questionText={data.questionText}
                optionElements={optionElements}
            />
        )
        
    })

    function handleOptionClick(questionId, optionId, optionIndex) { 
        const newQuestions = questions.map(question => {
            if (question.questionId === questionId) {
                const options = question.options
                const newOptions = []
                const currentOption = options[optionIndex]
                if (currentOption.isClicked) {
                    for (const option of options) {
                        if (option.id === currentOption.id) {
                            newOptions.push({...option, isClicked:!option.isClicked})
                        }
                        else {newOptions.push(option)}
                    }
                }
                else {
                    for (const option of options) {
                        if (option.id === currentOption.id) {
                            newOptions.push({...option, isClicked:!option.isClicked})
                        }
                        else {newOptions.push({...option, isClicked:false})}
                    }
                }
                return {...question, options:newOptions}
            }
            else {
                return question
            }
        })
        setQuestions(newQuestions) 
    }

    function mark() {
        let markedQuestions = []
        let score = 0;
        for (const question of questions) {
            const correctAnswer = question.correctAnswer
            let questionOptions = [...question.options]
            const isQuestionAnswered = questionOptions.some(option => option.isClicked) // check if the user answered the question
            if (isQuestionAnswered) {
                const chosenOption = questionOptions.filter(option => option.isClicked)[0] // find the option the user picked
                if(chosenOption.value === correctAnswer) {
                    // setGrade(prevGrade => prevGrade + 1)
                    // change the chosen option bg color to #94D7A2
                    questionOptions[chosenOption.index].bg = "#94D7A2"
                    chosenOption.bg = "#94D7A2" 
                    score+=1
                }
                else {
                    // setGrade(prevGrade => prevGrade)
                    // set the background color of the chosen option to ligtred
                    questionOptions[chosenOption.index].bg = "#F8BCBC"
                    chosenOption.bg = "#F8BCBC"
                    // get the correct option and set its bg color to #94D7A2
                    questionOptions = questionOptions.map(option => {
                        if (option.value === correctAnswer) {
                            option.bg = "#94D7A2"
                        }
                        return option
                    })
                }
            }
            else {
                // get the correct option and set its bg color to #94D7A2
                questionOptions = questionOptions.map(option => {
                    if (option.value === correctAnswer) {
                        option.bg = "#94D7A2"
                    }
                    return option
                })
            }
            markedQuestions.push({...question, options:questionOptions})
        }
        setGrade(score)
        setIsAnswering(false) //the user has finished answering the questions
        console.log(markedQuestions);
    }
    
    function playAgain() {
        setIsubmit(prevState => !prevState) // get new set of questions
        setIsAnswering(true) //the user is ready to answer question
        setGrade(0) // since user is starting new set of questions, set the current grade to zero
    }

    return (
        <div className='container'>
            {isStart? 
            <>
                <div className='questions--container'>
                    {questionsData}
                </div>
                {isAnswering?
                    <button onClick={mark}>Check answers</button>:
                    <div className='score-info'>
                        <p>You scored {grade +"/"+ questions.length} correct answers</p>
                        <button onClick={playAgain}>Play again</button>
                    </div>
                }
            </>:
            <Starter 
                formData={formData}
                formElementHandler={formElementHandler}
                handleFormSubmit={handleFormSubmit}
                start={start}
            />
             }
        </div>

    )
}
