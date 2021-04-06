import IdParameterNotFound from "../../BasicErrors/IdParameterNotFound";

export default class QuizzIdParameterNotFound extends IdParameterNotFound {
    constructor() {
        super();
        this.message = "The quizz id parameter is required but was not found"
        this.statusCode = "400.3.1"
    }
}