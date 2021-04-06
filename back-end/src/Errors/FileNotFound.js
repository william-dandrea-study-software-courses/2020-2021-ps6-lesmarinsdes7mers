import HttpMessage from "./HttpMessage";

export default class FileNotFound extends HttpMessage {
    constructor() {
        super("File not found")
        this.code = 404;
        this.success = false
        this.statusCode = "404"
        this.message = "The element you search for were not found."
    }
}