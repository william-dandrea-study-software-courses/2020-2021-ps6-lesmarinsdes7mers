import { Router } from 'express'
import quizzGettersRouter from './getters'
import quizzManageRouter from './manage'
import questionRouter from './Question'
import quizzMiddleware from './quizz.middleware'

const quizzRouter = Router()

quizzRouter.use(quizzManageRouter)
quizzRouter.use(quizzGettersRouter)

quizzRouter.use('/:quizz/question', quizzMiddleware, questionRouter)

export default quizzRouter