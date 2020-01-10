const { configs } = require("./setting");
const express = require("express");
const app = express();
const router = express.Router();

app.use(
    session({ 
        secret: configs.sessionKey, 
        cookie: { maxAge: 60000 }
    })
);

app.use('/js', express.static("./web/js"));
app.use('/css', express.static("./web/css"));
app.use('/html', express.static("./web/html"));

// /user 로 시작되는 경로는 전부 user.js 안에 있는 핸들러로 라우팅
app.use("/user", require("./user"));

//테스트용 Hello!
app.get("/", (req, res)=>{
    res.send("Hello!");
});

app.listen(configs.port, () => {
	console.log('connected');		
});