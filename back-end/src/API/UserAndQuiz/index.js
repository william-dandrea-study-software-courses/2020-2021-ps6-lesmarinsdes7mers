import { Router } from 'express'
import gettersUserAndQuizRouter from "./getters";
import manageUserAndQuizRouter from './manage'


const userAndQuizRouter = Router()


userAndQuizRouter.use(gettersUserAndQuizRouter);
userAndQuizRouter.use(manageUserAndQuizRouter);


export default userAndQuizRouter
