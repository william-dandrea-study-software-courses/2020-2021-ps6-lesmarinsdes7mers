import { Router } from 'express'
import quizzRouter from './Quizz'
import userRouter from './User'
import userAndQuizRouter from './UserAndQuiz'

const apiRouter = Router()


apiRouter.use('/quizz', quizzRouter)
apiRouter.use('/user', userRouter)
apiRouter.use('/userandquiz', userAndQuizRouter)

export default apiRouter
