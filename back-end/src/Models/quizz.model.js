import BaseModel from "../Database/BaseModel";
import joi from '@hapi/joi'


/**
 * @typedef {{
 * id: string,
 * question_name: string
 * type: number,
 * answer: {
 *      is_correct: boolean,
 *      data: string 
 * }[]
 * }} Question
 */

/**
 * @typedef {{
 * id: number,
 * name: string,
 * difficulty: number,
 * questions: Question[]
 * }} Quizz
 */

/** @type { BaseModel<Quizz> } */
const quizzModel = new BaseModel('quizz', joi.object({
    id: joi.number().integer().min(0).required(),
    name: joi.string().required(),
    difficulty: joi.number().integer().min(0).max(3).default(0),
    privacy: joi.object({
        is_public: joi.boolean().default(true),
        users_access: joi.array().items(joi.number())
    }),

    questions: joi.array().items(joi.object({
        id: joi.string().required(),
        question_name: joi.string().required(),
        type: joi.number().integer().min(0).max(1).default(0),  // 0 pour txt, 1 pour image
        answer: joi.array().items(joi.object({
            id_answer:  joi.number().integer().min(1).max(4).required(),
            is_correct: joi.boolean().default(false),
            data: joi.string().required()
        })).max(4).required()
    })).default([])
}))

export default quizzModel
