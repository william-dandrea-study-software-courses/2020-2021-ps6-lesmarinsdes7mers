import { Router } from 'express'
import { Execute } from '../../Errors/ErrorSchield'
import FileNotFound from '../../Errors/FileNotFound'
import HttpMessage from '../../Errors/HttpMessage'
import questionModel from '../../Models/question.model'

const questionsGettersRouter = Router()

questionsGettersRouter.get('/:id', 
    /**
     * @param {Request & { params: { id: string }}} req 
     * @param {*} res 
     */
    async (req, res) => {
        Execute(res, () => {
            if(!req.params.id) throw new IdParameterNotFound()
            const result = questionModel.getOne(q => q.id === req.params.id)

            if(!result) throw new FileNotFound()

            new HttpMessage(result).send(res)
        })
    }
)

export default questionsGettersRouter