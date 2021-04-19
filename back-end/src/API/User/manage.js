import { Router } from 'express'
import { Execute } from '../../Errors/ErrorSchield'
import HttpMessage from '../../Errors/HttpMessage'
import userModel from '../../Models/user.model'
import IdParameterNotFound from '../BasicErrors/IdParameterNotFound'

const manageUser = Router()

manageUser.post('/', (req, res) => {
    Execute(res, () => {
        userModel.add(req.body)
        new HttpMessage("User added successfully !").send(res)
    })
})

manageUser.put('/:id', (req, res) => {
    Execute(res, () => {
        if(!req.params.id) throw new IdParameterNotFound()

        req.body.id = parseInt(req.params.id);
        userModel.update(req.body)

        new HttpMessage("User updated successfully").send(res)
    })
})

manageUser.delete('/:id', (req, res) => {
    Execute(res, () => {
        if(!req.params.id) throw new IdParameterNotFound()
        userModel.delete(req.params.id)
        new HttpMessage("User deleted successfully").send(res)
    })
})

export default manageUser
