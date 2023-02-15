const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");// 邮箱插件

router.post("/sendEmail", (req, res) => {
    console.log(req.body.sendToEmail);
    let { sendToEmail } = req.body;
    console.log(sendToEmail);
    const config = {
        // smtp 是服务器地址，smtp.qq.com  QQ邮箱网址
        host: "smtp.qq.com",
        port: 465,
        secure: true,// 如果true不行，就用false
        auth: {
            user: '867706388@qq.com',
            pass: 'rjksqufkmuhubfjb' // 写授权码或密码
        }
    }

    const server = nodemailer.createTransport(config);

    let mail = {
        from: config.auth.user,
        to: "",
        html: "",
        subject: "我发送邮件" // 右键标题
    }

    // 发送邮件函数封装
    const sendEmail = (subject, sendContent, sendToEmail) => {
        return new Promise((resolve, reject) => {
            mail['html'] = sendContent; //'<h1>君不见，黄河之水天上来，奔流到海不复回。';
            mail['to'] = sendToEmail;
            mail['subject'] = subject
            server.sendMail(mail, function (err, msg) {
                if (err) {
                    console.log("发送失败！网络异常");
                    res.send({ msg: "发送失败！网络异常", code: "0010" });
                    reject(err);
                } else {
                    console.log("发送成功");
                    res.send({ msg: "发送成功!", Captcha: Captcha, code: "0000" });

                }
            })
        })
    }
    //生成随机数作为验证码
    var vertify = 'abcdefghijklmnopqrstuvwxyz0123456789'
    var Captcha = '';
    for (var i = 0; i < 6; i++) {
        //向下取整 
        var random = Math.floor(Math.random() * (vertify.length));
        //1：初始化验证码 空字符  res长度为6

        Captcha += vertify[random];
    }
    console.log(Captcha);
    // 邮箱测试
    (async () => {
        // await sendEmail("大家好！","我是练习时长两年半的个人练习生","2680080659@qq.com")
        let results = await sendEmail("验证码", Captcha, sendToEmail)
        console.log(results);
        // if(results){
        //     res.send({ msg: "success!", Captcha: Captcha });
        // }else{
        //     res.send("异常")
        // }
    })()
})

module.exports = router;