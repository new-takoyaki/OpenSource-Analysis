const security_module = require('./security');

module.exports = {
	Security: {
		VerifyInputForm: security_module.VerifyInputForm,
		SecureCrossSiteScript: security_module.SecureCrossSiteScript
	}
};