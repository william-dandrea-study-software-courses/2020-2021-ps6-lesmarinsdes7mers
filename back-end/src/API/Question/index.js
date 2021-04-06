import { Router } from 'express'
import questionsGettersRouter from './getters'
import questionManagementRouter from './manage'

const questionRouter = Router()

questionRouter.use(questionManagementRouter)
questionRouter.use(questionsGettersRouter)

export default questionRouter