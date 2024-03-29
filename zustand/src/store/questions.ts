import {create} from "zustand"
import { Question } from "./types"
import confetti from "canvas-confetti"
import {persist} from "zustand/middleware"

interface State{
    questions:Question[]
    currentQuestion:number
    fetchQuestions:(limit:number)=>Promise<void>
    selectAnswer: (questionId:number,answerIndex:number)=>void,
    goNextQuestion:()=>void,
    goPreviusQuestion:()=>void
}

export const useQuestionsStore = create<State>()(persist((set,get)=>{
    return{
        questions:[],
        currentQuestion:0,
        
        fetchQuestions: async (limit:number)=>{
            const res = await fetch("http://localhost:5173/data.json")
            const json = await res.json()

            const questions = json.sort(()=>Math.random()-0.5).slice(0,limit)
            set({questions})
        },
        selectAnswer: (questionId:number,answerIndex:number)=>{
            const {questions } = get()
            const newQuestions= structuredClone(questions)
            const questionIndex = newQuestions.findIndex(q=> q.id === questionId)
            const questionIfo = newQuestions[questionIndex]
            const isCorrectUserAnswer = questionIfo.correctAnswer === answerIndex
            if(isCorrectUserAnswer) confetti()
           
            newQuestions[questionIndex] = {...questionIfo,isCorrectUserAnswer,userSelectedAnswer:answerIndex}
            set({questions:newQuestions})
        },
        goNextQuestion:()=>{
            const {currentQuestion,questions} =get()
            const nextQuestion = currentQuestion +1

            if(nextQuestion < questions.length){
                set({currentQuestion:nextQuestion})

            }
        },
        goPreviusQuestion: ()=>{
            const {currentQuestion} =get()
            const previusQuestion = currentQuestion -1

            if(previusQuestion >= 0){
                set({currentQuestion:previusQuestion})

            }
        },
        reset:()=>{
            set({currentQuestion:0,questions:[]})
        }

    }
},{name: 'questions'}))

