import { Execute } from "../../../Errors/ErrorSchield"
import QuestionIdParameterNotFound from "./Errors/QuestionIdParameterNotFound"


/**
 * @param {Request & { quizz: import('../../../Models/quizz.model').Quizz }} req 
 * @param {*} res 
 * @param {*} next 
 */
export default function(req, res, next) {
    Execute(res, () => {
        if(!req.params.question) throw new QuestionIdParameterNotFound()
        const result = req.quizz.questions.find(q => q.id === req.params.question)
    
        if(!result) throw new FileNotFound()
    
        req.question = result
        next()
    })
}