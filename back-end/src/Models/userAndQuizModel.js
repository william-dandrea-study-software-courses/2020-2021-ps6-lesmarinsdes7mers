import BaseModel from "../Database/BaseModel";
import joi from '@hapi/joi'


const userAndQuizModel = new BaseModel('userAndQuiz', joi.object({
    id: joi.number().integer().min(0).required(),
    id_user: joi.number().integer().min(0).required(),
    played_quizzes: joi.array().items(joi.object({
        id_quiz: joi.number().integer().min(0).required(),
        score_user: joi.number().integer().min(0).required(),

        user_answers: joi.array().items(joi.object({
            id_question: joi.number().integer().min(0).required(),
            response_user: joi.number().integer().min(1).max(4).required()
        })).default([])
    })).default([])
}))

export default userAndQuizModel
