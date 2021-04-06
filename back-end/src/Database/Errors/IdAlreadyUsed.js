import BadRequest from "../../Errors/BadRequest";

export default class IdAlreadyUsed extends BadRequest {
    
    constructor() {
        super()
        this.httpContent = {
            success: false,
            statusCode: 400.2,
            message: "The id provided for this object already used for another one"
        }
    }
}