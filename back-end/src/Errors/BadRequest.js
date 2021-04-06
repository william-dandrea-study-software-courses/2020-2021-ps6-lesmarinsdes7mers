import HttpMessage from "./HttpMessage";

export default class BadRequest extends HttpMessage {

    constructor() {
        super({})
        this.code = 400
        this.success = false
        this.statusCode = "400"
    }
}