import HttpMessage from "./HttpMessage";

export default class FileNotFound extends HttpMessage {
    constructor() {
        super("File not found")
        this.code = 404;
        this.httpContent = {
            success: false,
            statusCode: 404,
            message: "The element you search for were not found."
        }
    }
}