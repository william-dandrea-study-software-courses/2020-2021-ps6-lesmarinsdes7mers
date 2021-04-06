import { Router } from 'express'
import { Execute } from '../../Errors/ErrorSchield'
import HttpMessage from '../../Errors/HttpMessage'
import questionModel from '../../Models/question.model'
import IdParameterNotFound from '../BasicErrors/IdParameterNotFound'


const questionManagementRouter = Router()

questionManagementRouter.post('/', 
    async (req, res) => {
        Execute(res, () => {
            questionModel.add(req.body)
            new HttpMessage("Question successfully added !").send(res)
        })
    }
)

questionManagementRouter.delete('/:id', 
    /**
     * 
     * @param {Request & { params: { id: string }}} req 
     * @param {*} res 
     */
    async (req, res) => {
        Execute(res, () => {
            if(!req.params.id) throw new IdParameterNotFound()
            questionModel.delete(req.params.id)
            new HttpMessage("Quizz deleted successfully !").send(res)
        })
    }
)

questionManagementRouter.put('/:id', 
    /**
     * 
     * @param {Request & { params: { id: string }}} req 
     * @param {*} res 
     */
    async (req, res) => {
        Execute(res, () => {
            if(!req.params.id) throw new IdParameterNotFound()
            req.body.id = req.params.id
            questionModel.update(req.body)
            new HttpMessage("Quizz updated successfully !").send(res)
        })
    }
)

export default questionManagementRouter