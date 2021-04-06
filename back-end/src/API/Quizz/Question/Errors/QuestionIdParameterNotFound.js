import IdParameterNotFound from "../../../BasicErrors/IdParameterNotFound";

export default class QuestionIdParameterNotFound extends IdParameterNotFound {

    constructor() {
        super()
        this.statusCode = "400.3.2"
        this.message = "The question id parameter is required but was not found"
    }
}