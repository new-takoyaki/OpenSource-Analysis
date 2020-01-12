const DBManager = require("./DBManager");
const { Response } = require("../../struct/api");

class User extends DBManager{
	constructor() {
		super();
		const accountSchema = new this.Schema({
			email: {
				type: String,
				unique: true
			},
			password: String,
			nickname: String,
			profile_link: String,
			ip: String,
			lastLogin: { 
				type: Date, 
				default: Date.now  
			},
			blocked: {
				type: Boolean,
				default: false
			},
			failed_count: {
				type: Number,
				default: 0
			}
		});
		this.Model = this.Connection.model('user', accountSchema);
	}
	
	get Model() {
		if (this.Model !== undefined) {
			return this.Model;
		} else {
			
		}
	}
	
	register(email, password){
		const model = new this.Model({
			email: email,
			password: password,
			nickname: "Default-NickName"
		});
		return new Promise((resolve, reject) => {
			model.save((err, account) => {
				if(err){
					reject(err);
				}else{
					resolve(account);
				}
			});
		});
	}
	
	login(email, password, ip){
		return new Promise(async (resolve, reject) => {
			const exists = await this.Model.exists({email: email, password: password});
			if(!exists){
				reject("no model");
			}else{
				this.Model.findOneAndUpdate(
					{email: email, password: password},
					{
						$set:{
							ip:ip,
							lastLogin: Date.now()
						}
					},
					(err, account) => {
						if(err){
							reject(err);
						}else{
							resolve(account);
						}
					});
			}
		});	
	}
	
	saveTest(){
		const model = new this.Model({
			email: "test@gyungdal.cc",
			password: "helloworld",
			ip: "127.0.0.1"
		});
		model.save(function(err, account){
			if(err) return console.error(err);
			console.dir(account);
		});
	}
	
	
	userList(){
		return new Promise((resolve, reject) => {
			this.Model.find(function(err, account){
				if(err) {
					reject(err);
				}
				resolve(account);
			});
		});
	}
};

module.exports = User;