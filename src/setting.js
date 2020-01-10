const { config } = require("dotenv");

// .env 파일이 있으면 설정값 가져옴
config();

module.exports = {
    port: process.env.PORT || 9940,
    sessionKey: process.env.SESSION_KEY || "P@SSWord?"
};