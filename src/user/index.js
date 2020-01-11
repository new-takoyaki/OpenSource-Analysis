const { Router } = require("express");
const router = Router();
const multer = require("multer");
const formParser = multer();

/* Custom Library Section */
const secureLibrary = require('../libraries/security');

function requireAuthentication (req, res, next) {
	if (!req.session || !req.session.authenticated) {
		res.render('unauthorised', { status: 403 });
		return;
	}
	next();
}

router.route("/")
    .get((req, res) => {
        console.log(req.session);
        if(req.session.authenticated){
            res.send(`Your ID : ${req.session.email}`);
        }else{
            res.redirect("/user/login");
        }
    });

router.route("/login")
    .get((req, res)=> {
        res.sendFile(`${__dirname}/login.html`);
    })
    .post(formParser.none(), (req, res)=>{
        req.session.email = req.body.email;
        req.session.password = req.body.password;
        req.session.authenticated = true;
        req.session.save(()=>{
            res.redirect("/user");
        })
    });

router.get("/logout", (req, res)=>{
    if(req.session.authenticated){
        req.session.destroy(()=>{
            res.redirect("/user");
        });
    }
});

router.route('/register')
    .get((req, res)=> {
        res.sendFile(`${__dirname}/register.html`);
    })
    .post(formParser.none(), (req, res)=>{
        // res.send(req.body);
		// 회원가입 기능 구현, 고려해야할 부분 : 기능상 구현 및 보안 (@yeon)
		var verifyInput = new secureLibrary.VerifyInputForm("POST");
		if (!verifyInput.verify(req.body.email) || !verifyInput.verify(req.body.password)) {
			res.send("<script>alert('Invalid special characters');location.href='/user/register';</script>");
		}
		else
		{
			// Successful submit
			res.send("Success!");
		}
    });

module.exports = router;