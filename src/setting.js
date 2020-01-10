const { config } = require("dotenv");

//.env가 있으면 설정 파일을 가져온다
config();

export const configs = {
    port: process.env.PORT || 9400,
    sessionKey: process.env.SESSION_KEY || "P@SSWord?"
};