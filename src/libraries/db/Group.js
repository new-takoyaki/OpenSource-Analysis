const DBManager = require("./DBManager");
const { Schema } = require("mongoose");

const groupSchema = new Schema({
	name: {
		type: String,
		unique: true
	},
	profile_link: String,
	admin: [String],
	user: [String]
});


class Group extends DBManager{
	
	saveTest(){
		const Model = this.Connection.model('group', groupSchema);
		const model = new Model({
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
		const Model = this.Connection.model('group', accountSchema);
		Model.find(function(err, account){
			if(err) return res.status(500).send({error: 'database failure'});
			console.log(account);
		});
	}
};

module.exports = Group;