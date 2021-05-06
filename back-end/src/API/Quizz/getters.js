import { Router } from 'express'
import HttpMessage from '../../Errors/HttpMessage'
import quizzMiddleware from './quizz.middleware'
import userAndQuizModel from "../../Models/userAndQuizModel";
import FileNotFound from "../../Errors/FileNotFound";
import quizzModel from "../../Models/quizz.model";
import IdMustBeANumber from "../BasicErrors/IdMustBeANumber";

const quizzGettersRouter = Router()

quizzGettersRouter.get('/public', (req, res) => {
    try {
        const result = quizzModel.getAll(quiz => quiz.privacy.is_public === true);
        if(!result) throw new FileNotFound()
        new HttpMessage(result).send(res)
    } catch(err) {
        res.status(500).json(err);
    }
});

quizzGettersRouter.get('/foroneuser/:id', (req, res) => {

    if(!req.params.id) throw new IdParameterNotFound()
    req.params.id = parseInt(req.params.id)
    if(isNaN(req.params.id)) throw new IdMustBeANumber()


    const result = quizzModel.getAll(quiz =>
        quiz.privacy.is_public === false && quiz.privacy.users_access.find(element => element === req.params.id)
        ||
        quiz.privacy.is_public === true
    );

    if(!result) throw new FileNotFound()

    new HttpMessage(result).send(res)
})


quizzGettersRouter.get('/:quizz', quizzMiddleware, (req, res) => {
    new HttpMessage(req.quizz).send(res)
});




export default quizzGettersRouter
