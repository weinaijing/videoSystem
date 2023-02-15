const express = require("express");
//引入config配置模块
const config  =require("./appConfig");

const util = require("./utils/index");
//创建应用程序
const app = express();
//执行配置文件
config(app);

//注册路由
const toPage = require("./routes/toPage")
const Video = require("./routes/video")
const index = require("./routes/index")
const upload = require("./routes/upload")
const login = require("./routes/login")
const student = require("./routes/student")
const user = require("./routes/user")
const sendEmail = require("./routes/sendEmail")
const comments = require("./routes/comments")


//使用路由
app.use(sendEmail);
app.use(Video);
app.use(index);
app.use(login)
app.use(student);
app.use(user);
app.use(comments);


app.use(util.checkLogin,upload);
app.use(util.checkLogin,toPage);




app.listen(9999,()=>{
    console.log("服务器启动》》》》: 端口号是9999");
})