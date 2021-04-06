import IdMustBeANumber from "../../BasicErrors/IdMustBeANumber";

export class QuizzIdParameterMustBeInt extends IdMustBeANumber {
    constructor() {
        super();
        this.message = "The quizz id is a number but the provided wasn't"
        this.statusCode = "400.4.1"
    }
}