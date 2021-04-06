import { Router } from 'express'
import HttpMessage from '../../../Errors/HttpMessage'
import questionMiddleware from './question.middleware'

const questionsGettersRouter = Router()

questionsGettersRouter.get('/:question', questionMiddleware,
    /**
     * @param {Request & { params: { id: string }, quizz: import('../../../Models/quizz.model').Quizz, question: import('../../../Models/quizz.model').Question }} req 
     * @param {*} res 
     */
    (req, res) => {
        new HttpMessage(req.question).send(res)
    }
)

export default questionsGettersRouter