import { Difficulty, Quiz } from '../models/quiz.model';
import {Answer, Question} from '../models/question.model';

export const QUESTION_ACTOR: Question = {
    id: '1',
    question_name: 'C\'est la question',
    type: 0,
    answers: []
};

export const QUIZ_LIST: Quiz[] = [
    {
        id: 1,
        name: 'Les Acteurs', // What's happening if I change this value..?
        difficulty: Difficulty.EASY,
        questions: [],
    },
    {
        id: 2,
        name: 'Les technos WEB',
        difficulty: Difficulty.EXPERT,
        questions: [],
    }
];
