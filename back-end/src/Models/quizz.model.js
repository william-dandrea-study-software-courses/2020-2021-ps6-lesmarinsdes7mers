import BaseModel from "../Database/BaseModel";
import joi from '@hapi/joi'
import questionModel from "./question.model";


/**
 * @typedef {{
 * id: number,
 * name: string,
 * difficulty: number,
 * question: import('./question.model').Question
 * }} Quizz
 */

/** @type { BaseModel<Quizz> } */
const quizzModel = new BaseModel('quizz', joi.object({
    id: joi.number().integer().min(0).required(),
    name: joi.string().required(),
    difficulty: joi.number().integer().min(0).max(3).default(0),
    questions: questionModel.model
}))

export default quizzModel