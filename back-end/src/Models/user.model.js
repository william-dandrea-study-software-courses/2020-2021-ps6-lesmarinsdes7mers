import BaseModel from "../Database/BaseModel";
import joi from '@hapi/joi'


/** 
 * @typedef {{ 
 * id: number, 
 * surname: string, 
 * name: string, 
 * handicap: number, 
 * font_size: number,
 * birthday: Date, 
 * size_font_config: { 
 *      name: string, 
 *      size: number, 
 *      default: boolean }[] 
 * }} User 
 * */


/** @type { BaseModel<User> } */
const userModel = new BaseModel('users', joi.object({
    id: joi.number().integer().min(0).required(),
    surname: joi.string().required(),
    name: joi.string().required(),
    handicap: joi.number().integer().min(0).max(5).default(5),
    font_size: joi.number().default(40),
    birthday: joi.date().default("1962-12-19"),
    image_url: joi.string().default("https://unsplash.com/photos/75xPHEQBmvA/download?force=true&w=1920"),
    note: joi.string().default("Aucune"),
    size_font_configs: joi.array().items(joi.object({
        name: joi.string().required(),
        size: joi.number().required(),
        default: joi.boolean().default(false)
    }))
}))

export default userModel
