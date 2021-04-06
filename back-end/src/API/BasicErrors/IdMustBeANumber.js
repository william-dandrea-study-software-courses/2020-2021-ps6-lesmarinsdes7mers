import BadRequest from "../../Errors/BadRequest";

export default class IdMustBeANumber extends BadRequest {

    constructor() {
        super();
        this.httpContent = {
            success: false,
            message: "The parameter id is a number but the provided wasn't",
            statusCode: 400.3
        }
    }
}