import BadRequest from "../../Errors/BadRequest";

export default class IdParameterNotFound extends BadRequest {

    constructor() {
        super();
        this.httpContent = {
            success: false,
            message: "The parameter id is required but was not found",
            statusCode: 400.3
        }
    }
}