import { Router } from 'express'
import quizzRouter from './Quizz'
import userRouter from './User'

const apiRouter = Router()

apiRouter.use('/quizz', quizzRouter)
apiRouter.use('/user', userRouter)

export default apiRouter