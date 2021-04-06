import HttpMessage from "./HttpMessage";

export default class BadRequest extends HttpMessage {

    constructor() {
        super({})
        this.code = 400
        this.httpContent = {
            success: false,
            statusCode: 400
        }
    }
}