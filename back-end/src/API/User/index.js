import { Router } from 'express'
import gettersUsersRouter from './getters'
import manageUser from './manage'

const userRouter = Router()


userRouter.use(gettersUsersRouter)
userRouter.use(manageUser)


export default userRouter
