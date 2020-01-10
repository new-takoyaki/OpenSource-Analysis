const configs =  require("./setting");
const express = require("express");
const session = require("express-session");
const app = express();


console.log(configs);

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: configs.sessionKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use('/js', express.static("./web/js"));
app.use('/css', express.static("./web/css"));

// /user 로 시작되는 경로는 전부 user.js 안에 있는 핸들러로 라우팅
const userHandler = require("./user");
app.use("/user", userHandler);

//테스트용 Hello!
app.get("/", (req, res)=>{
    res.send("Hello!");
});

app.listen(configs.port, () => {
	console.log(`[INFO] ${configs.port} Start`);		
});