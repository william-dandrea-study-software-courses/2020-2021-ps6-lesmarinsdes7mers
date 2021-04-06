export default class HttpMessage {

    constructor(data) {
        this.success = true
        this.message = "Success"
        this.statusCode = "200"
        this.data = data
        this.code = 200
    }

    send(res) {
        res.status(this.code).json({
            success: this.success, 
            statusCode: this.statusCode,
            message: this.message,
            data: this.data
        })
    }
}