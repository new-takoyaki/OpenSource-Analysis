const DBManager = require("./DBManager");

class Account extends DBManager{
	constructor() {
		super("Accounts");
		/*
		var accountSchema = new this.Schema({
			
		});
		*/
	}
};

module.exports = Account;