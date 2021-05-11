import { Router } from 'express'
import userAndQuizModel from "../../Models/userAndQuizModel";
import HttpMessage from "../../Errors/HttpMessage";
import IdParameterNotFound from "../BasicErrors/IdParameterNotFound";
import userModel from "../../Models/user.model";
import IdMustBeANumber from "../BasicErrors/IdMustBeANumber";
import FileNotFound from "../../Errors/FileNotFound";



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


manageUserAndQuizRouter.delete('/user/:id', (req, res) => {


    if(!req.params.id) throw new IdParameterNotFound()
    req.params.id = parseInt(req.params.id)
    if(isNaN(req.params.id)) throw new IdMustBeANumber()

    const result = userAndQuizModel.getOne(u => u.id_user === req.params.id)
    if(!result) throw new FileNotFound()

    userAndQuizModel.delete(result.id);

    new HttpMessage("userAndQuiz deleted successfully").send(res)
});


manageUserAndQuizRouter.delete('/quiz/:id', (req, res) => {


    if(!req.params.id) throw new IdParameterNotFound()
    req.params.id = parseInt(req.params.id)
    if(isNaN(req.params.id)) throw new IdMustBeANumber()


    const alls = userAndQuizModel.getAll(uaq => uaq != null);

    alls.forEach(oneUaQ => {

        const playedQuizForThis = oneUaQ.played_quizzes;

        playedQuizForThis.forEach(function(item, index, object) {
            if (item.id_quiz === req.params.id) {
                object.splice(index, 1);
            }
        })
    });

    alls.forEach(oneUaQ => {

        userAndQuizModel.update(oneUaQ);

    })



    // if(!result) throw new FileNotFound()
    new HttpMessage("User And Quizz deleted successfully").send(res)
});


export default manageUserAndQuizRouter;
