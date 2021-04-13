

export interface UserAndQuizModel {
    id: number;
    id_user: number;
    played_quizzes: MadedQuizzesModel[];
}

export interface MadedQuizzesModel {
    id_quiz: number;
    score_user: number;
    user_answers: UserAnswer[];
}

export interface UserAnswer {
    id_question: number;
    response_user: number;
}
