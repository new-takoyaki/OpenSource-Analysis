const configs =  require("./setting");
const express = require("express");
const session = require("express-session");
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

const sessionStore = session({
    secret: configs.sessionKey,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 36000 
    },
    store: FileStore()
});

app.set('trust proxy', 1);

//세션 설정
app.use(sessionStore);

//쿠키 및 바디 파서 미들 웨어 추가
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//js랑 css는 정적루트로 라우팅
app.use('/js', express.static("./web/js"));
app.use('/css', express.static("./web/css"));

// /user 로 시작되는 경로는 전부 user.js 안에 있는 핸들러로 라우팅
const userHandler = require("./user");
userHandler.use(sessionStore);
app.use("/user", userHandler);

app.get('/', function (req, res, next) {
	if (req.session.authenticated) {
		res.redirect("/user/main");
	} else {
		res.redirect("/user/login");	
	}
});

//테스트용!
/*
app.get('/', function (req, res, next) {
    console.log(req.session);
    if(req.session.num === undefined){
        req.session.num = 1;
    } else {
        req.session.num =  req.session.num + 1;
    }
    req.session.save(()=>{
        res.send(`Views : ${req.session.num}`);
    });
});
*/

app.listen(configs.port, () => {
    console.log(configs);
	console.log(`[INFO] Port ${configs.port} Start`);		
});