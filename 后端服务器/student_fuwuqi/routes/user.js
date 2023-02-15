const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

const handleDB = require("../db/handleDB");

// 获取用户列表
router.get("/getUserList", (req, res) => {///getUsers接口  
    console.log(req.query.page);
    console.log(req.query);
    //需要参数格式：{where:"id>2",number:2,count:2}
    //where 是查询条件 number是页数 count是条数
    let pageObj = {};
    pageObj.number = req.query.page;
    pageObj.count = req.query.limit;
    pageObj.where = " 1=1 ";

    if (req.query.query) pageObj.where += " and username like '%" + req.query.query + "%' ";
    let countObj = " 1=1 ";//selet * from where 1 = 1；真的条件 可以加上where关键字
    if (req.query.query) countObj += " and username='" + req.query.query + "'";
    (async function () {
        //分页查询语句
        let results = await handleDB(res, "t_user", "limit", "数据库发生错误!", pageObj);//分页查询语句
        console.log(results);
        //查询总条数
        let cn = await handleDB(res, "t_user", "find", "数据库发生错误!", countObj);
        console.log(cn.length);
        let obj = {};//前端的数据返回
        obj.code = "0";
        obj.count = cn.length;//总条数
        obj.msg = "查询成功";
        obj.data = results;
        res.send(obj);

    })();
})

// 用户授权
router.post("/userStateChanged", (req, res) => {

    // console.log(req.body);

    let { id, state, } = req.body;
    console.log(id, state);
    (async function () {
        let results = await handleDB(res, "t_user", "update", "数据库发生错误！", "id=" + id, {
            state: state,
        });
        console.log(results);
        if (results.affectedRows == 1) {
            res.send({ msg: "修改成功！", code: "0000" })

        } else {
            res.send({ msg: "修改失败！", code: "0007" })
        }
    })();
})

//删除用户
router.delete("/deleteUser/:id", (req, res) => {
    let { id } = req.params;
    let del = " id=" + id;

    (async function () {

        let results = await handleDB(res, "t_user", "delete", "数据库发生错误!", del);

        if (results.affectedRows == 1) {
            res.send({ msg: "删除成功!", code: "0000" });
        } else {
            res.send({ msg: "删除失败!", code: "0007" });
        }
    })();
})
// 新增用户
router.post("/addUser", (req, res) => {
    console.log(req.body);
    let { username, password, state} = req.body;
    (async function () {
        let results = await handleDB(res, "t_user", "insert", "数据库发生错误!", { username: username, password: password, state: state });
        console.log(results);
        if (results.affectedRows == 1) {
            res.send({ msg: "插入成功!", code: "0000" });
        } else {
            res.send({ msg: "插入失败!", code: "0007" });
        }
    })();
})

// 修改用户
router.post("/updateUser", (req, res) => {

    console.log(req.body);

    let { id, username, password, role, state } = req.body;
    console.log(id, username, password, role, state);
    (async function () {
        let results = await handleDB(res, "t_user", "update", "数据库发生错误！", "id=" + id, {
            username: username,
            password: password,
            role: role,
        });
        console.log(results);
        if (results.affectedRows == 1) {
            res.send({ msg: "修改成功！", code: "0000" })

        } else {
            res.send({ msg: "修改失败！", code: "0007" })
        }
    })();
})
module.exports = router;