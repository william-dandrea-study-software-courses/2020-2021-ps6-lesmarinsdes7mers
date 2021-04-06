import { Router } from 'express'
import { Execute } from '../../Errors/ErrorSchield'
import FileNotFound from '../../Errors/FileNotFound'
import HttpMessage from '../../Errors/HttpMessage'
import quizzModel from '../../Models/quizz.model'
import IdMustBeANumber from '../BasicErrors/IdMustBeANumber'
import IdParameterNotFound from '../BasicErrors/IdParameterNotFound'

const quizzGettersRouter = Router()

quizzGettersRouter.get('/:id', (req, res) => {
    Execute(res, () => {
        if(!req.params.id) throw new IdParameterNotFound()
        req.params.id = parseInt(req.params.id)
        if(isNaN(req.params.id)) throw new IdMustBeANumber()

        const result = quizzModel.getOne(q => q.id === req.params.id)

        if(!result) throw new FileNotFound()

        new HttpMessage(result).send(res)
    })
})

export default quizzGettersRouter