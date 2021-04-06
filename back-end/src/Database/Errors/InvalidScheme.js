import BadRequest from "../../Errors/BadRequest";

export default class InvalidSchemeError extends BadRequest {
    
    constructor(error) {
        super()
        this.httpContent = {
            success: false,
            statusCode: 400.1,
            error,
            message: "The provided object is invalid"
        }
    }
}