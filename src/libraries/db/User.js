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
			},
			groups: [
				{
					type: String,
					default: undefined
				}
			]
		});
		this.Model = this.Connection.model('user', accountSchema);
	}
	
	get model() {
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
	
	login_failed(email)
	{
		return new Promise(async (resolve, reject) => {
			const exists = await this.Model.exists({email: email});
			if (!exists) {
				reject("no matched accounts");
			} else {
				this.Model.updateOne(
					{email: email},
					{
						$inc: {failed_count: 1}
					}, (err) => {
						if (err) reject(err);
					}
				);
				resolve(true);
			}
		});
	}
	
	account_block(email)
	{
		return new Promise(async (resolve, reject) => {
			this.Model.findOne( {email: email}, 'failed_count',
				(err, result) => {
					if (err) reject(err);
					if (result['failed_count'] >= 5) {
						this.Model.updateOne( {email: email},
							{
								$set: {blocked: true}
							}, (err) => {
								if (err) reject(err);
							}
						);
						resolve(true);
					} else {
						resolve(false);
					}
				}
			);
		});
	}
	
	login_and_block_test() {
		try {
			this.userList();
		} catch (e) {
			throw e;
		}
	}
	
	login(email, password, ip){
		return new Promise(async (resolve, reject) => {
			const exists = await this.Model.exists({email: email, password: password});
			const blocked = await this.Model.exists({email: email, blocked: true});
			
			if(!exists){
				reject("no model");
			} else if (blocked) {
				reject("account blocked");
			} else{
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