import { Router } from 'express'
import quizzGettersRouter from './getters'
import quizzManageRouter from './manage'

const quizzRouter = Router()

quizzRouter.use(quizzManageRouter)
quizzRouter.use(quizzGettersRouter)

export default quizzRouter