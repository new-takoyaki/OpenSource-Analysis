//api관련 구조체 선언

class Response {
	//HttpCode, ResponseMessage
	constructor(code, message){
		this.code = code;
		this.message = message;
	}
}

module.exports = {
	Response: Response
}