import BadRequest from "../../Errors/BadRequest";

export default class InvalidSchemeError extends BadRequest {
    
    constructor(error) {
        super()
        this.statusCode = "400.1"
        this.data = error
        this.message = "The provided object is invalid"
    }
}