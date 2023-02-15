const express = require("express");
const router = express.Router();

const handleDB = require("../db/handleDB");

// 登录
router.all("/login", (req, res) => {
    //获取请求参数post方法
    let { username, password, captcha, getcaptcha } = req.body;
    console.log(username, password, captcha, getcaptcha);
    if (captcha == getcaptcha) {
        (async function () {
            let results = await handleDB(res, "t_user", "find", "数据库发生错误!", "username='" + username + "'and password = '" + password + "'");
            console.log(results);
            //把查询结果进行处理 if（results）
            if (results.length > 0) {
                console.log(results);
                //服务器session保存登录信息
                let startTime = new Date().getTime();
                let token = { code: results[0].username + results[0].password, 
                    startTime: startTime, 
                    state: results[0].state, 
                    role: results[0].role,
                    username:results[0].username
                }
                req.session["token"] = token;
                res.send({ msg: "查询成功！", code: "0000", token: token });
            } else {
                res.send({ msg: "查询失败！账号密码不存在", code: "0002" });
            }
        })();
    } else {
        res.send({ msg: "查询失败！验证码不正确", code: "0007" });
    }

})

// 注册
router.post("/registered", (req, res) => {

    let { username, password } = req.body;
    console.log(username, password);
    (async function () {
        let results1 = await handleDB(res, "t_user", "find", "数据库发生错误!", "username='" + username + "'");
        if (results1.length > 0) {
            res.send({ msg: "账号已存在", code: "0008" })
        } else {
            let results2 = await handleDB(res, "t_user", "insert", "数据库发生错误!", { username: username, password: password });//分页查询语句
            console.log(results2);
            if (results2.affectedRows == 1) {
                res.send({ msg: "注册成功!", code: "0000" });
            } else {
                res.send({ msg: "注册失败!", code: "0007" });
            }
        }

    })();
})

// 客户端登录
router.all("/clientlogin", (req, res) => {
    //获取请求参数post方法
    let { stu_name, password, captcha, getcaptcha } = req.body;
    console.log(stu_name, password, captcha, getcaptcha);
    if (captcha == getcaptcha) {
        (async function () {
            let results = await handleDB(res, "t_student", "find", "数据库发生错误!", "stu_name='" + stu_name + "'and password = '" + password + "'");
            console.log(results);
            //把查询结果进行处理 if（results）
            if (results.length > 0) {
                console.log(results);
                //服务器session保存登录信息
                let startTime = new Date().getTime();
                let token = {
                    id: results[0].id,
                    username: results[0].stu_name,
                    img: results[0].stu_img,
                    phone: results[0].stu_phone,
                    sex: results[0].stu_sex,
                    content: results[0].stu_content,
                    startTime: startTime
                }
                req.session["clientToken"] = token;
                res.send({ msg: "查询成功！", code: "0000", token: token });
            } else {
                res.send({ msg: "查询失败！账号密码不存在", code: "0002" });
            }
        })();
    } else {
        res.send({ msg: "查询失败！验证码不正确", code: "0007" });
    }

})

// 客户端注册
router.post("/clientregistered", (req, res) => {

    let { stu_name, password, captcha, getcaptcha } = req.body;
    console.log(stu_name, password, captcha, getcaptcha);
    (async function () {
        let results1 = await handleDB(res, "t_student", "find", "数据库发生错误!", "username='" + username + "'");
        if (results1.length > 0) {
            res.send({ msg: "账号已存在", code: "0008" })
        } else {
            let results2 = await handleDB(res, "t_student", "insert", "数据库发生错误!", { username: username, password: password });//分页查询语句
            console.log(results2);
            if (results2.affectedRows == 1) {
                res.send({ msg: "注册成功!", code: "0000" });
            } else {
                res.send({ msg: "注册失败!", code: "0007" });
            }
        }

    })();
})

module.exports = router;