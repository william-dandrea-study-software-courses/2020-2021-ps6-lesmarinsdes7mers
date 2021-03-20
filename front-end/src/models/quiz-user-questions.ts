export interface UserAnswer {
    id: number;
    answer_user: number;
    is_correct: boolean;
}

export interface QuizUserQuestions {
    id_quiz: number;
    id_user: number;
    questions: UserAnswer[];
}
