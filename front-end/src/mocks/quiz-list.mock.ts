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
        name: 'Culture générale', // What's happening if I change this value..?
        difficulty: Difficulty.EASY,
        questions: [
            {
                id: '1',
                question_name: 'Où se trouvent les glandes sudoripares d\'un chien ?',
                type: 0,
                answers: [{is_correct: true, data: 'Sous ses pattes'}, {is_correct: false, data: 'Sur la tête'}, {is_correct: false, data: 'Sur le ventre'}, {is_correct: false, data: 'Sur les fesses'}]
            },
            {
                id: '2',
                question_name: 'Qui raconte les aventures de Sherlock Holmes ?',
                type: 0,
                answers: [{is_correct: false, data: 'George Darmois'}, {is_correct: true, data: 'Watson'}, {is_correct: false, data: 'Le president'}, {is_correct: false, data: 'JK Rowling'}]
            },
            {
                id: '3',
                question_name: 'Quel insecte produit le miel ?',
                type: 0,
                answers: [{is_correct: true, data: ' L\'abeille'}, {is_correct: false, data: 'Le scarabée'}, {is_correct: false, data: 'Le puceron'}]
            },
            {
                id: '4',
                question_name: 'Égypte ancienne. Quel fleuve traverse l\'Égypte ?',
                type: 0,
                answers: [{is_correct: true, data: 'Le Nil'}, {is_correct: false, data: 'Le Kibo'}, {is_correct: false, data: 'Le Danube'}]
            },
            {
                id: '5',
                question_name: 'Quel est le nom de l\'agence spatiale américaine ?',
                type: 0,
                answers: [{is_correct: true, data: 'Le Nil'}, {is_correct: false, data: 'La Lufthansa'}, {is_correct: false, data: 'La NASA'}]
            },
            {
                id: '6',
                question_name: 'La Vespa créé en 1946, est un célèbre...',
                type: 0,
                answers: [{is_correct: true, data: 'Scooter'}, {is_correct: false, data: 'Vélo'}, {is_correct: false, data: 'Camion'}]
            },
        ],
    },
    {
        id: 2,
        name: 'Les technos WEB',
        difficulty: Difficulty.MEDIUM,
        questions: [
            {
                id: '1',
                question_name: 'La Vespa créé en 1946, est un célèbre...',
                type: 0,
                answers: [{is_correct: true, data: 'Scooter'}, {is_correct: false, data: 'Vélo'}, {is_correct: false, data: 'Camion'}]
            },
        ],
    },
    {
        id: 3,
        name: 'Les principales villes Françaises',
        difficulty: Difficulty.EASY,
        questions: [
            {
                id: '1',
                question_name: 'Quel est le nom de l\'agence spatiale américaine ?',
                type: 0,
                answers: [{is_correct: true, data: 'Le Nil'}, {is_correct: false, data: 'La Lufthansa'}, {is_correct: false, data: 'La NASA'}]
            },
        ],
    },
    {
        id: 4,
        name: 'Les mers du monde',
        difficulty: Difficulty.HARD,
        questions: [
            {
                id: '1',
                question_name: 'Quel est le nom de l\'agence spatiale américaine ?',
                type: 0,
                answers: [{is_correct: true, data: 'Le Nil'}, {is_correct: false, data: 'La Lufthansa'}, {is_correct: false, data: 'La NASA'}]
            },
            {
                id: '2',
                question_name: 'La Vespa créé en 1946, est un célèbre...',
                type: 0,
                answers: [{is_correct: true, data: 'Scooter'}, {is_correct: false, data: 'Vélo'}, {is_correct: false, data: 'Camion'}]
            },
        ],
    },
    {
        id: 5,
        name: 'La vie, en image',
        difficulty: Difficulty.HARD,
        questions: [
            {
                id: '1',
                question_name: 'Quel insecte produit le miel ?',
                type: 0,
                answers: [{is_correct: true, data: ' L\'abeille'}, {is_correct: false, data: 'Le scarabée'}, {is_correct: false, data: 'Le puceron'}]
            },
            {
                id: '2',
                question_name: 'Égypte ancienne. Quel fleuve traverse l\'Égypte ?',
                type: 0,
                answers: [{is_correct: true, data: 'Le Nil'}, {is_correct: false, data: 'Le Kibo'}, {is_correct: false, data: 'Le Danube'}]
            },
            {
                id: '3',
                question_name: 'Quel est le nom de l\'agence spatiale américaine ?',
                type: 0,
                answers: [{is_correct: true, data: 'Le Nil'}, {is_correct: false, data: 'La Lufthansa'}, {is_correct: false, data: 'La NASA'}]
            },
        ],
    }
];
