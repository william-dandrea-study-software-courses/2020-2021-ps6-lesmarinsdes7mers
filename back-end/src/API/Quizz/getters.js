import { Router } from 'express'
import HttpMessage from '../../Errors/HttpMessage'
import quizzMiddleware from './quizz.middleware'

const quizzGettersRouter = Router()



quizzGettersRouter.get('/:quizz', quizzMiddleware, (req, res) => {
    new HttpMessage(req.quizz).send(res)
})

export default quizzGettersRouter
