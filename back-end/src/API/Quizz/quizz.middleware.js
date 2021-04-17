import { Execute } from "../../Errors/ErrorSchield"
import quizzModel from "../../Models/quizz.model"
import FileNotFound from '../../Errors/FileNotFound'
import { QuizzIdParameterMustBeInt } from "./Errors/QuizzIdParameterMustBeInt"
import QuizzIdParameterNotFound from "./Errors/QuizzIdParameterNotFound"

export default (req, res, next) => {
    Execute(res, () => {
        if(!req.params.quizz) throw new QuizzIdParameterNotFound()
        req.params.quizz = parseInt(req.params.quizz)
        if(isNaN(req.params.quizz)) throw new QuizzIdParameterMustBeInt()
    
        const result = quizzModel.getOne(q => q.id === req.params.quizz)
        if(!result) throw new FileNotFound()

        req.quizz = result
        next()
    })
}