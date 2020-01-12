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
		success: log_util.success,
		warning: log_util.warning,
		critical: log_util.critical,
		clean: log_util.clean
	}
}