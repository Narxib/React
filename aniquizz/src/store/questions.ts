import { create } from "zustand";
import { Question } from "./types";
import confetti from "canvas-confetti"



interface State {
    questions:Question[]
    currentQuestion:number
    fetchQuestions:()=>Promise<void>
    selectAnswer:(questionId:number,answerIndex:number,currentQuestion:number)=>void,
    userSelectedAnswer:boolean,
    goNextQuestion:()=>void,
    goPreviusQuestion:()=>void
}


export const useQuestionsStore = create<State>((set,get)=>{
    return{
        questions:[],
        currentQuestion:0,
        userSelectedAnswer:null,
        
        fetchQuestions: async ()=>{
            const res = await fetch("http://localhost:5173/data.json")
            const json = await res.json()
            const questions = json.sort(()=>Math.random()-0.5).slice(0,10)
            set({questions})
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get()
            // usar el structuredClone para clonar el objeto
            const newQuestions = structuredClone(questions)
            // encontramos el índice de la pregunta
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            // obtenemos la información de la pregunta
            const questionInfo = newQuestions[questionIndex]
            // averiguamos si el usuario ha seleccionado la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
            questionInfo.hasbeenAnswered=true
            if (isCorrectUserAnswer) confetti()
            
            // cambiar esta información en la copia de la pregunta
            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex
            }
            // actualizamos el estado
            set({ questions: newQuestions })
          },
        goNextQuestion:()=>{
            const {currentQuestion,questions,userSelectedAnswer} =get()
            set({userSelectedAnswer:false})
            console.log(userSelectedAnswer)
            const nextQuestion = currentQuestion +1
            console.log(currentQuestion)
            if(nextQuestion < questions.length){
                set({currentQuestion:nextQuestion})      
            }
        },
        goPreviusQuestion: ()=>{
            const {currentQuestion} =get()
            const previusQuestion = currentQuestion -1
            set({userSelectedAnswer:true})
            if(previusQuestion >= 0){
                set({currentQuestion:previusQuestion})

            }
        },
        reset:()=>{
            set({currentQuestion:0,questions:[]})
        }

    }
})
