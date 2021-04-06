export default class HttpMessage {

    constructor(data) {
        this.httpContent = {
            success: true, 
            statusCode: 0,
            data
        }
        this.code = 200
    }

    send(res) {
        res.status(this.code).json(this.httpContent)
    }
}