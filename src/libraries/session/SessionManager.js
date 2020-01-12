class SessionManager {
	constructor(object) { }
	
	static saveSessions(req, fields_arr, value) {
		if (req === undefined || value === undefined) return;
		for(var key in fields_arr) {
			if (typeof fields_arr[key] !== "string") {
				req.session[key] = fields_arr[key];
				continue;
			}
			req.session[key] = value[fields_arr[key]];
		}
	}
	
	static destroySessions(req) {
		if (req.session.authenticated)
			req.session.destroy();
	}
};

module.exports = SessionManager;