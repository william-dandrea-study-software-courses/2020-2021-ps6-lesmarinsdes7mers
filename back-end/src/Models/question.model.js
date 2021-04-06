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
 * @type { BaseModel<Question> }
 */
const questionModel = new BaseModel('questions', joi.object({
    id: joi.string().required(),
    question_name: joi.string().required(),
    type: joi.number().integer().min(0).max(1).default(0),
    answer: joi.array().items(joi.object({
        is_correct: joi.boolean().default(false),
        data: joi.string().required()
    }))
}))

export default questionModel