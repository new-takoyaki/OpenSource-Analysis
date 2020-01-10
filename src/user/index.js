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

router.get("/login", (req, res)=> {
        console.log(`${__dirname}/login.html`);
        res.sendFile(`${__dirname}/login.html`);
    });
router.post("/login", formParser.none(), (req, res)=>{
        console.log(req.body);
        req.session.email = req.body.email;
        req.session.password = req.body.password;
        req.session.authenticated = true;
        console.log(req.session);
        res.redirect("/user");
    });

router.get("/logout", (req, res)=>{
    req.session.destroy();
});

router.get('/register', (req, res)=> {

});

module.exports = router;