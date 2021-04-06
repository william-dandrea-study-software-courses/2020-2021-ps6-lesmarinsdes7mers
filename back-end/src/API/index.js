import { Router } from 'express'
import questionRouter from './Question'
import quizzRouter from './Quizz'
import userRouter from './User'

const apiRouter = Router()

apiRouter.use('/questions', questionRouter)
apiRouter.use('/quizz', quizzRouter)
apiRouter.use('/user', userRouter)

export default apiRouter