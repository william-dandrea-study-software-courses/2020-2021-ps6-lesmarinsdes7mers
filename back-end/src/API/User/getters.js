import { Router } from 'express'
import { Execute } from '../../Errors/ErrorSchield'
import FileNotFound from '../../Errors/FileNotFound'
import HttpMessage from '../../Errors/HttpMessage'
import userModel from '../../Models/user.model'
import IdMustBeANumber from '../BasicErrors/IdMustBeANumber'

const gettersUsersRouter = Router()

gettersUsersRouter.get('/all', ((req, res) => {

    const result = userModel.getAll(u => u != null)
    if(!result) throw new FileNotFound()
    new HttpMessage(result).send(res)

}));


gettersUsersRouter.get('/:id', (req, res, next) => {
    Execute(res, () => {
        if(!req.params.id) throw new IdParameterNotFound()
        req.params.id = parseInt(req.params.id)
        if(isNaN(req.params.id)) throw new IdMustBeANumber()

        const result = userModel.getOne(u => u.id === req.params.id)

        if(!result) throw new FileNotFound()

        new HttpMessage(result).send(res)


    });
    next();
})





export default gettersUsersRouter
