import BaseModel from "../Database/BaseModel";
import joi from '@hapi/joi'
import { number } from "joi";
import Joi from "@hapi/joi";


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

const questionImage = joi.object({
    id: joi.number().integer().min(0).required(),
        question_name: joi.string().max(70).required(),
        type: 1,  // 0 pour txt, 1 pour image
        answer: joi.array().items(joi.object({
            id_answer:  joi.number().integer().min(1).max(4).required(),
            is_correct: joi.boolean().default(false),
            data: joi.string().required()
        })).max(4).required()
})

const questionText = joi.object({
    id: joi.number().integer().min(0).required(),
        question_name: joi.string().max(70).required(),
        type: 0,  // 0 pour txt, 1 pour image
        answer: joi.array().items(joi.object({
            id_answer:  joi.number().integer().min(1).max(4).required(),
            is_correct: joi.boolean().default(false),
            data: joi.string().max(45).required()
        })).max(4).required()
})


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
        id: joi.number().integer().min(0).required(),
        question_name: joi.string().max(70).required(),
        type: joi.number().integer().min(0).max(1).default(0),  // 0 pour txt, 1 pour image
        answer: joi.array().items(joi.object({
            id_answer:  joi.number().integer().min(1).max(4).required(),
            is_correct: joi.boolean().default(false),
            data: joi.alternatives().conditional('..type', 
                { is: 0, then: joi.string().max(45).required(), otherwise: joi.string().required() })
        })).max(4).required()
    })).max(30).required()
}))

export default quizzModel
