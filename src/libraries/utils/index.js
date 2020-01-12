const log_util = require('./log');

/*
module.exports = {
	success: success,
	warning: warning,
	critical: critical,
	clean: clean_terminal
};
*/

module.exports = {
	log : {
		info: log_util.info,
		success: log_util.success,
		warning: log_util.warning,
		critical: log_util.critical,
		clean: log_util.clean
	}
}