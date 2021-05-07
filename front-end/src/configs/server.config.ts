import { HttpHeaders } from '@angular/common/http';

export const httpOptionsBase = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const serverUrl = 'http://localhost:3000';






/**
 * Quiz main section
 */
export const quizzesSection = serverUrl + '/quizz';

/**
 * Retrieve all quizzes
 */
export const quizzesGETAllQuizzes = quizzesSection + '/all';

/**
 * Retrieve one quiz : quizzesGETOneQuiz + id
 */
export const quizzesGETOneQuiz = quizzesSection + '/';

/**
 * Retrieve all public quizzes
 */
export const quizzesGETAllPublicQuizzes = quizzesSection + '/public';

/**
 * Retrieve all quizzes available for one user : quizzesGETAllQuizzesAvailableForOneUser + idUser
 */
export const quizzesGETAllQuizzesAvailableForOneUser = quizzesSection + '/foroneuser/';



/**
 * Add new quiz
 */
export const quizzesPOSTNewQuiz = quizzesSection + '/';

/**
 * Update one quiz : quizzesPUTUpdateQuiz + idQuiz
 */
export const quizzesPUTUpdateQuiz = quizzesSection + '/';

/**
 * Delete one quiz : quizzesDELETEUpdateQuiz + idQuiz
 */
export const quizzesDELETEDeleteQuiz = quizzesSection + '/';





/**
 * User main section
 */
export const usersSection = serverUrl + '/user';

/**
 * Retrieve all users
 */
export const usersGETAllUsers = usersSection + '/all';

/**
 * Retrieve one user : usersGETOneUser + idUser
 */
export const usersGETOneUser = usersSection + '/';

/**
 * Update one user : usersUPDATEOneUser + idUser
 */
export const usersPUTUpdateOneUser = usersSection + '/';







/**
 * UserAndQuiz main section
 */
export const userAndQuizzesSection = serverUrl + '/userandquiz';

/**
 * Retrieve all userAndQuizzes
 */
export const userAndQuizzesGETAll = userAndQuizzesSection + '/all';

/**
 * Retrieve userAndQuiz for one user : userAndQuizzesGETForOneUser + idUser
 */
export const userAndQuizzesGETForOneUser = userAndQuizzesSection + '/user/';

/**
 * Retrieve userAndQuiz for one quiz : userAndQuizzesGETForOneUser + idQuiz
 */
export const userAndQuizzesGETForOneQuiz = userAndQuizzesSection + '/quiz/';

/**
 * Update one userAndQuiz : userAndQuizzesPUTUpdateOneUserAndQuiz + idUserAndQuiz
 */
export const userAndQuizzesPUTUpdateOneUserAndQuiz = userAndQuizzesSection + '/';

/**
 * Add new UserAndQuiz
 */
export const userAndQuizzesPOSTAddOneUserAndQuiz = userAndQuizzesSection + '/';

