import './App.css'
import React, { useEffect, useState } from 'react'
import Question from './components/Question'
import Starter from './components/Starter'
import Option from './components/Option'

export default function App() {
    const [grade, setGrade] = useState(0)
    const [questions, setQuestions] = useState([])
    const [isStart, setIsStart] = useState(false)
    
    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
        .then(response => response.json())
        .then(data => setQuestions(getQuestionsData(data.results)))

    }, [])

    // form questionsData to be an object that will contain  the following ppts:
    // questionText, questionId, correctAnswer, options (to be provided to user to pick the correct answer)

    function getQuestionsData(apiData) { 
        const newQuestions = apiData.map((data, index) => {
            const questionId = "question_" + (index+1)
            const options = [data.correct_answer, ...data.incorrect_answers]
            const newOptions = options.map((option, index) => {
                const optionId = questionId + "option_" + (index + 1)
                return {
                    index: index,
                    value: option,
                    id: optionId,
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
        for (const question of questions) {
            const correctAnswer = question.correctAnswer
            const questionOptions = question.options
            const chosenOption = questionOptions.filter(option => option.isClicked)[0]
            if(chosenOption.value === correctAnswer) {
                // score = score + 1
                setGrade(prevGrade => prevGrade + 1)
                // console.log("correct", score, grade);
            }
            else {
                setGrade(prevGrade => prevGrade)
                // console.log("wrong", score, grade);
            }
        }
    }

    
    return (
        <div className='container'>
            {isStart? 
            <>
                <div className='questions--container'>
                    {questionsData}
                </div>
                <button onClick={mark}>Check answers<br/> your score: {grade}</button>
            </>:
            <Starter start={() => setIsStart(true)}/>
        
             }
        </div>

    )
}
