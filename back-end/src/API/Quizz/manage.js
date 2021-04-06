import { Router } from 'express'
import { Execute } from '../../Errors/ErrorSchield'
import HttpMessage from '../../Errors/HttpMessage'
import quizzModel from '../../Models/quizz.model'
import IdParameterNotFound from '../BasicErrors/IdParameterNotFound'


const quizzManageRouter = Router()

quizzManageRouter.post('/', (req, res) => {
    Execute(res, () => {
        quizzModel.add(req.body)
        new HttpMessage("Quizz added successfully !").send(res)
    })
})

quizzManageRouter.put('/:id', (req, res) => {
    Execute(res, () => {
        if(!req.params.id) throw new IdParameterNotFound()

        req.body.id = req.params.id
        quizzModel.update(req.body)

        new HttpMessage("Quizz updated successfully !").send(res)
    })
})

quizzManageRouter.delete('/:id', (req, res) => {
    Execute(res, () => {
        if(!req.params.id) throw new IdParameterNotFound()

        quizzModel.delete(req.params.id)

        new HttpMessage("Quizz deleted successfully !").send(res)
    })
})

export default quizzManageRouter