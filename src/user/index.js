const { Router } = require("express");
const router = Router();
const multer = require("multer");
const formParser = multer();

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
        res.send(req.body);
    });

module.exports = router;