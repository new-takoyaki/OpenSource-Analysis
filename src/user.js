const { Router } = require("express");
const router = Router();

router.get('/', (req, res) => {
    if(req.session.who)
    res.send(`your ID : ${req.session.id}`);
});

router.get('/login', (req, res)=> {
    res.sendFile("./web/html/login.html");
});

router.get('/register', (req, res)=> {
    res.redirect("/login.html");
});

module.export = router;