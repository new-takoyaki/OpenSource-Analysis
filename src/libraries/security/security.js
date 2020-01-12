class SecureInjection
{
	constructor(db_type="MongoDB", mysql_connection=undefined)
	{
		this.dbtype = db_type;
		this.mysql_connection = mysql_connection;			// For mysql_connection.escape()
		// console.log(" -> SecureInjection Type has 'MySQL' type");
	}
	
	customPreventMySQL(value)
	{
		let result = value;
		const specialCharacters = ['\'', '\"', '\\', '#', '-'];
		
		for(var i = 0; i < specialCharacters.length; i++)
			result = result.split(specialCharacters[i]).join('');
		return result;
	}
	customPreventMongoDB(value)
	{
		let result = value;
		const specialCharacters = ['\'', '\"', '\\', '#', '-', ':', '$'];
		
		for(var i = 0; i < specialCharacters.length; i++)
			result = result.split(specialCharacters[i]).join('');
		return result;
	}
	
	secureUserValue(...args)
	{
		var resultArray = [];
		if (this.dbtype == "MySQL")
		{
			var cnt = 0;
			while (cnt < arguments.length)
			{
				if (this.mysql_connection !== undefined)
				{
					resultArray[cnt] = this.mysql_connection.escape(args[cnt]);
					cnt++;
					continue;
				}
				resultArray[cnt] = this.customPreventMySQL(args[cnt]);
				cnt++;
			}
		}
		else if (this.dbtype == "MongoDB")
		{
			var cnt = 0;
			while (cnt < arguments.length)
			{
				if (this.sanitizer !== undefined) { } // mongo-sanitizer does not supported yet
				resultArray[cnt] = this.customPreventMongoDB(args[cnt]);
				cnt++;
			}
		}
		else
		{
			// Does not supported yet
		}
		return resultArray;
	}
};

class SecureCrossSiteScript
{
	constructor() { }
	// secure_reflec
	htmlEscape(text) {
		var result = text.replace(/&/g, '&amp;');
		result = result.replace(/</g, '&lt;');
		result = result.replace(/"/g, '&quot;');
		result = result.replace(/'/g, '&#039;');
		result = result.replace(/\\/g, '\\\\');
		
		return result;
	}
};

class VerifyInputForm
{
	// 차후에 넘어온 모든 form의 값에 대해 리스팅하고 점검을 수행해주는 함수를 구현 예정
	constructor(method) { 
	};
	secure(form, type="MySQL") {
		if (this.secureInjection === undefined)
			this.secureInjection = new SecureInjection(type);
		
		return type === "MySQL" ? this.secureInjection.customPreventMySQL(form) : this.secureInjection.customPreventMongoDB(form);
	}
	verify(form, type="MySQL") {
		if (this.secureInjection === undefined)
			this.secureInjection = new SecureInjection(type);
		
		if (type === "MySQL")
		{
			// console.log(form);
			return this.secureInjection.customPreventMySQL(form) == form ? true : false;
		}
		else if (type === "MongoDB")
		{
			console.log(this.secureInjection.customPreventMongoDB(form));
			console.log(form);
			return this.secureInjection.customPreventMongoDB(form) == form ? true : false;
		}
	}
	check_ip(value) {
		var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		return value.match(ipformat) ? true : false;
	}
};

module.exports = {
	VerifyInputForm: VerifyInputForm,
	SecureCrossSiteScript: SecureCrossSiteScript
};