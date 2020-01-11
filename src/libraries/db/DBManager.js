class DBManager {
	constructor(name, dbconn=undefined) {
		this.dbname = name;
		if (dbconn !== undefined) this.db = dbconn;
		else {
			this.mongoose = require('mongoose');
			this.db = this.mongoose.connection;
			
			this.db.on('error', () => {
				console.error(" - MongoDB Connection error (DBManager)");
				process.exit(1);
			});
			this.db.once('open', () => {
				console.log(" - MongoDB Connection complete");
			});
			this.mongoose.connect(`mongodb://localhost/${this.dbname}`);
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
		this.db = other_connection;
	}
};

module.exports = {
	DBManager: DBManager
};