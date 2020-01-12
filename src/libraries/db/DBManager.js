const { dbName } = require("../../setting");
const utils = require("../utils");

class DBManager {
	constructor(name=dbName, dbconn=undefined) {
		this.dbname = name;
		if (dbconn !== undefined) this.db = dbconn;
		else {
			this.mongoose = require('mongoose');
			
			this.db = this.mongoose.connection;
			
			this.db.on('error', () => {
				utils.log.critical(" - MongoDB Connection error (DBManager)");
				process.exit(1);
			});
			this.db.once('open', () => {
				utils.log.success(" - MongoDB Connection Completes");
			});
			
			this.mongoose.connect(`mongodb://localhost/${this.dbname}`, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: true
			});
		}
		
	}
	get Schema() {
		if (this.mongoose.Schema !== undefined)
			return this.mongoose.Schema;
	}
	get Connection() {
		return this.db === undefined ? this.mongoose.connection : this.db;
	}
	
	set Connection(other_connection) {
		if(this.db !== undefined){
			this.db.close();
		}
		this.db = other_connection;
	}
	
	close() {
		if (this.db !== undefined)
			this.db.close();
	}
};

module.exports = DBManager;