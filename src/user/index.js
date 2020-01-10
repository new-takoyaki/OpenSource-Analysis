const { Router } = require("express");
const router = Router();

router.get('/', (req, res) => {
    res.send(`your ID : ${req.session.id}`);
});

router.get('/login', (req, res)=> {
    console.log(`${__dirname}/login.html`);
    res.sendFile(`${__dirname}/login.html`);
});

router.get('/register', (req, res)=> {
    console.log(`${__dirname}/login.html`);
    res.redirect(`${__dirname}/login.html`);
});

module.exports = router;