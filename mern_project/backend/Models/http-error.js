class Http_Error extends Error {
    constructor(message, statusCode) {
        super(this.message);
        this.status = statusCode;
    }
}

module.exports = Http_Error;