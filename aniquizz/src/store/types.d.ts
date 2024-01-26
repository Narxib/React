export interface Question{
    id:number
    question:string
    answers:string[]
    hasbeenAnswered:boolean,
    correctAnswer:number
    userSelectedAnswer?:boolean
    isCorrectUserAnswer?:boolean
}