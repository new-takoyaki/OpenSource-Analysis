const DBManager = require("./DBManager");
const { Schema } = require("mongoose");
const accountSchema = new Schema({
	email: String,
	password: String,
	nickname: String,
	profile_link: String,
	ip: String,
    lastLogin: { 
		type: Date, 
		default: Date.now  
	},
});

class Account extends DBManager{
	constructor() {
		super("Account");
	}
	
	saveTest(){
		const Model = this.Connection.model('account', accountSchema);
		const model = new Model({
			email: "test@gyungdal.cc",
			password: "helloworld",
			nickname: "GD?",
			profile_link: "test",
			ip: "127.0.0.1"
		});
		
		model.save(function(err, account){
			if(err) return console.error(err);
			console.dir(account);
		});
	}
	
	findTest(){
		const Model = this.Connection.model('account', accountSchema);
		Model.find(function(err, account){
			if(err) return res.status(500).send({error: 'database failure'});
			console.log(account);
		});
	}
};

module.exports = Account;