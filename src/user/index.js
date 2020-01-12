const { Router } = require("express");
const router = Router();
const multer = require("multer");
const formParser = multer();
const { User } = require("../libraries/db");
const { SessionManager } = require("../libraries/session");
const user = new User();

/* Custom Library Section */
const secureLibrary = require('../libraries/security/security');
const utils = require('../libraries/utils');

function requireAuthentication (req, res, next) {
	if (!req.session || !req.session.authenticated) {
		res.render('unauthorised', { status: 403 });
		return;
	}
	next();
}

router.route("/")
    .get((req, res) => {
        utils.log.info(req.session);
        if(req.session.authenticated){
            res.send(`Your ID : ${req.session.email}`);
        }else{
            res.redirect("/user/login");
        }
    });

router.route("/main")
	.get((req, res)=> {
		res.sendFile(`${__dirname}/main.html`);
	})
	.post(formParser.none(), (req, res)=>{
		res.sendFile(`${__dirname}/main.html`);
	});

//TODO : login, register 페이지 post 로직들 ajax로 교체
router.route("/login")
    .get((req, res)=> {
        res.sendFile(`${__dirname}/login.html`);
    })
    .post(formParser.none(), (req, res)=>{
		var verifyInput = new secureLibrary.VerifyInputForm("POST");
		if (!verifyInput.check_ip(req.ip)) {
			// log writting
			// 추가로 로그 작성이나 에러 포맷 출력하기 위한 유틸 라이브러리 개발 필요 (@nene)
		}
		else {
			utils.log.success("here");
			if (verifyInput.verify(req.body.email, "MongoDB") && verifyInput.verify(req.body.password, "MongoDB")) {
				user
					.login(req.body.email, req.body.password, req.ip)
					.then((account)=>{
						utils.log.success("here");
						utils.log.success(SessionManager);
						// console.log(account);
						SessionManager.saveSessions(
							req,
							{"uid": "_id", "email": "email", 
							 "nickname": "nickname", "profile_link": "profile_link",
							 "authenticated": true},
							account);
						console.log(req.session);
					
						req.session.save();
						utils.log.success(req.session);
						res.redirect("/user/main");
					}, (err)=>{
						utils.log.warning(err);
            			res.redirect("/user");
					}).catch((err) => {
						throw err;
						res.send(err);
					});
			} else {
				// log writting (login failed)
				res.send("<script>alert('Invalid account information');location.href='/user/login';</script>");
			}
		}
    });

//계정이 뭐 들어있는지 임시로 보기 위해서 추가
router.get("/list", (req, res)=>{
	user.userList()
	.then((account)=>{
		utils.log.info(account);
		res.send(account);
	}, (err)=>{
		res.send(err);
	});
})

router.get("/logout", (req, res)=>{
    SessionManager.destroySessions();
	res.redirect("/user");
});

router.route('/register')
    .get((req, res)=> {
        res.sendFile(`${__dirname}/register.html`);
    })
    .post(formParser.none(), (req, res)=>{
        // res.send(req.body);
		// 회원가입 기능 구현, 고려해야할 부분 : 기능상 구현 및 보안 (@nene)
		var verifyInput = new secureLibrary.VerifyInputForm("POST");
		if (!verifyInput.verify(req.body.email) || !verifyInput.verify(req.body.password)) {
			res.send("<script>alert('Invalid special characters');location.href='/user/register';</script>");
		}
		else
		{
			// Successful submit
			user
				.register(req.body.email, req.body.password)
				.then((success)=>{
					res.send("<script>alert('Success');location.href='/user/';</script>");
				}, (err)=>{
					res.send("<script>alert('register fail...');location.href='/user/';</script>");
				});
			
		}
    });

module.exports = router;