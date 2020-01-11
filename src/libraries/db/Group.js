const DBManager = require("./DBManager");



//TODO : 그룹에서만 유저 정보를 가지고 있으면, 
//로그인시 가입된 그룹을 찾을때 모든 그룹을 다 뒤져서 유저 정보를 찾아야되서 비효율 적임
//유저에도 그룹 정보를 넣을지 다른 방안 모색 필요

class Group extends DBManager{
	constructor() {
		super();
		const groupSchema = new this.Schema({
			name: {
				type: String,
				unique: true
			},
			profile_link: String,
			user: [
				{
					id: this.Schema.Types.ObjectId,
					permission:{
						type: String,
						enum: ["ADMIN", "USER"]
					}
				}
			]
		});
		this.Model = this.Connection.model('group', groupSchema);
	}
	
	addGroup(name, profile_link=""){
		const model = new this.Model({
			name:name,
			profile_link:profile_link
		});
		return new Promise((resolve, reject)=>{
			model.save(function(err, group){
				if(err){ 
					reject(err);
			   	}else{
					resolve(group);
				}
			});
		});
	}
	
	changeGroupProperties(groupId, changeData){
		return new Promise(async(resolve, reject)=>{
			const result = await this.Model.update(
				{ _id: new this.Schema.Types.ObjectId(groupId)}
			);
			//삭제된 객체가 0개가 아니면 성공
			if(result.deletedCount != 0){
				resolve("success");
			}else{
				reject("fail");
			}
		});
	}
	
	removeGroup(groupId){
		return new Promise(async(resolve, reject)=>{
			const result = await this.Model.remove(
				{ _id: new this.Schema.Types.ObjectId(groupId)}
			);
			//삭제된 객체가 0개가 아니면 성공
			if(result.deletedCount != 0){
				resolve("success");
			}else{
				reject("fail");
			}
		});
	}
	
	/*
	
	//유저 리스트 수정 로직 추가 필요
	removeUserFromGroup(userId, groupId){
		return new Promise(async(resolve, reject)=>{
			const result = await this.Model.findOne(
					{ _id : new this.Schema.Types.ObjectId(groupId) },
			);
			//삭제된 객체가 0개가 아니면 성공
			if(result.nModified != 0){
				resolve("success");
			}else{
				reject("fail");
			}
		});
	} 
		
	changeUserPermissionFromGroup(userId, groupId, permission){
		
	}
	
	addUserToGroup(userId, groupId){
		
	}
	*/
	
	saveTest(){
		const model = new this.Model({
			name: "Test",
			profile_link: "test",
			admin: ["test", "asefs"],
			user: ["test", "asefs"]
		});
		
		model.save(function(err, account){
			if(err) return console.error(err);
			console.dir(account);
		});
	}
	
	findTest(){
		this.Model.find(function(err, account){
			if(err)
			console.log(account);
		});
	}
};

module.exports = Group;