import { Router } from 'express'
import FileNotFound from '../../../Errors/FileNotFound'
import quizzModel from '../../../Models/quizz.model'
import { Execute } from '../../../Errors/ErrorSchield'
import HttpMessage from '../../../Errors/HttpMessage'
import questionMiddleware from './question.middleware'


const questionManagementRouter = Router()

questionManagementRouter.post('/', 
    /**
     * 
     * @param {Request & { params: { id: string }, quizz: import('../../../Models/quizz.model').Quizz, question: import('../../../Models/quizz.model').Question }} req 
     * @param {*} res 
     */
    (req, res) => {
        Execute(res, () => {
            const updatedQuizz = Object.assign({}, req.quizz)
            
            const id = req.quizz.questions.map(q => q.id).reduce((pv, cv) => pv > cv ? pv : cv, 0) + 1
            req.body.id = id

            updatedQuizz.questions.push(req.body)
            quizzModel.update(updatedQuizz)
            new HttpMessage("Question successfully added !").send(res)
        })
    }
)

questionManagementRouter.delete('/:question', questionMiddleware,
    /**
     * @param {Request & { params: { id: string }, quizz: import('../../../Models/quizz.model').Quizz, question: import('../../../Models/quizz.model').Question }} req 
     * @param {*} res 
     */
    (req, res) => {
        Execute(res, () => {
            const updatedQuizz = Object.assign({}, req.quizz)
            updatedQuizz.questions = updatedQuizz.questions.filter(q => q.id !== req.question.id)

            if(updatedQuizz.questions.length === req.quizz.questions.length) throw new FileNotFound()

            quizzModel.update(updatedQuizz)
            new HttpMessage("Question successfully deleted !").send(res)
        })
    }
)

questionManagementRouter.put('/:question', questionMiddleware,
    /**
     * @param {Request & { params: { id: string }, quizz: import('../../../Models/quizz.model').Quizz, question: import('../../../Models/quizz.model').Question }} req 
     * @param {*} res 
     */
    (req, res) => {
        Execute(res, () => {
            const objToChange = req.body
            delete objToChange.id
            const result = Object.assign(req.question, objToChange)
            
            const index = req.quizz.questions.findIndex(q => q.id === result.id)
            const updatedQuizz = Object.assign({}, req.quizz)
            updatedQuizz.questions[index] = result

            quizzModel.update(updatedQuizz)
            new HttpMessage("Question successfully updated !").send(res)
        })
    }
)

export default questionManagementRouter