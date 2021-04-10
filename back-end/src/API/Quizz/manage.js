import { Router } from 'express'
import { Execute } from '../../Errors/ErrorSchield'
import HttpMessage from '../../Errors/HttpMessage'
import quizzModel from '../../Models/quizz.model'
import quizzMiddleware from './quizz.middleware'
import userModel from "../../Models/user.model";
import FileNotFound from "../../Errors/FileNotFound";


const quizzManageRouter = Router()


quizzManageRouter.get('/all', (req, res) => {

    const result = quizzModel.getAll(u => u != null)
    if(!result) throw new FileNotFound()
    new HttpMessage(result).send(res)
})


quizzManageRouter.post('/', (req, res) => {
    Execute(res, () => {
        quizzModel.add(req.body)
        new HttpMessage("Quizz added successfully !").send(res)
    })
})

quizzManageRouter.put('/:quizz', quizzMiddleware, 
    /**
     * 
     * @param { import('express').Request & { quizz: import('../../Models/quizz.model').Quizz }} req 
     * @param {*} res 
     */
    (req, res) => {
        Execute(res, () => {
            req.body.id = req.quizz.id
            quizzModel.update(req.body)

            new HttpMessage("Quizz updated successfully !").send(res)
        })
    }
)

quizzManageRouter.delete('/:quizz', quizzMiddleware, 
    (req, res) => {
        Execute(res, () => {
            quizzModel.delete(req.params.quizz)

            new HttpMessage("Quizz deleted successfully !").send(res)
        })
    }
)



export default quizzManageRouter
