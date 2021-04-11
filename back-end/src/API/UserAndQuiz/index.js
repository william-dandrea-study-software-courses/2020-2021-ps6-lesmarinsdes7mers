import { Router } from 'express'
import gettersUserAndQuizRouter from "./getters";


const userAndQuizRouter = Router()


userAndQuizRouter.use(gettersUserAndQuizRouter);


export default userAndQuizRouter
