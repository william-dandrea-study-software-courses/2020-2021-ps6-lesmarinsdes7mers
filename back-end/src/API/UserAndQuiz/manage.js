import { Router } from 'express'
import userAndQuizModel from "../../Models/userAndQuizModel";
import HttpMessage from "../../Errors/HttpMessage";
import IdParameterNotFound from "../BasicErrors/IdParameterNotFound";



const manageUserAndQuizRouter = Router();


manageUserAndQuizRouter.post('/', (req, res) => {

    userAndQuizModel.add(req.body);
    new HttpMessage("UserAndQuiz added successfully !").send(res)
});

manageUserAndQuizRouter.put('/:id', (req, res) => {

    if(!req.params.id) throw new IdParameterNotFound()

    req.body.id = parseInt(req.params.id);
    //userAndQuizModel.update_second(req.params.id, req.body)
    userAndQuizModel.update(req.body)

    new HttpMessage("UserAndQuiz udpated successfully").send(res)

});

manageUserAndQuizRouter.delete('/:id', (req, res) => {
    if(!req.params.id) throw new IdParameterNotFound()
    userAndQuizModel.delete(req.params.id)
    new HttpMessage("UserAndQuiz deleted successfully").send(res)
});


export default manageUserAndQuizRouter;
