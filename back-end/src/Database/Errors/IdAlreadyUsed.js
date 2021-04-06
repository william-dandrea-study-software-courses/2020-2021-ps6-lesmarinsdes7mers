import BadRequest from "../../Errors/BadRequest";

export default class IdAlreadyUsed extends BadRequest {
    
    constructor() {
        super()
        this.statusCode = "400.2"
        this.message = "The id provided for this object already used for another one"
    }
}