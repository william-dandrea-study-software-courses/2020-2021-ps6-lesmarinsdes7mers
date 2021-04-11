import {Router} from "express";
import userAndQuizModel from "../../Models/userAndQuizModel";
import FileNotFound from "../../Errors/FileNotFound";
import HttpMessage from "../../Errors/HttpMessage";
import IdMustBeANumber from "../BasicErrors/IdMustBeANumber";
import userModel from "../../Models/user.model";

const gettersUserAndQuizRouter = Router();


gettersUserAndQuizRouter.get('/all', ((req, res, next) => {
    const result = userAndQuizModel.getAll(u => u != null);
    if(!result) throw new FileNotFound()
    new HttpMessage(result).send(res)

    next();
}));

gettersUserAndQuizRouter.get('/user/:id', ((req, res, next) => {

    if(!req.params.id) throw new IdParameterNotFound()
    req.params.id = parseInt(req.params.id)
    if(isNaN(req.params.id)) throw new IdMustBeANumber()

    const result = userAndQuizModel.getOne(u => u.id_user === req.params.id)

    if(!result) throw new FileNotFound()

    new HttpMessage(result).send(res)

    next();
}));


gettersUserAndQuizRouter.get('/quiz/:id', ((req, res, next) => {

    if(!req.params.id) throw new IdParameterNotFound()
    req.params.id = parseInt(req.params.id)
    if(isNaN(req.params.id)) throw new IdMustBeANumber()

    const result = userAndQuizModel.getAll(u => u.answers.some(quiz => quiz.id_question === id));

    if(!result) throw new FileNotFound()

    new HttpMessage(result).send(res)

    next();
}));



export default gettersUserAndQuizRouter;

