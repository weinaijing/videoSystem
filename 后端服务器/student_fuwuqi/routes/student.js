const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const db = require("../db/node_orm/index")
const handleDB = require("../db/handleDB");



// 获取用户列表
router.get("/getStudents", (req, res) => {///getUsers接口  
    console.log(req.query.page);
    console.log(req.query);
    //需要参数格式：{where:"id>2",number:2,count:2}
    //where 是查询条件 number是页数 count是条数
    let pageObj = {};
    pageObj.number = req.query.page;
    pageObj.count = req.query.limit;
    pageObj.where = " 1=1 ";

    if (req.query.query) pageObj.where += " and stu_name like '%" + req.query.query + "%' ";
    let countObj = " 1=1 ";//selet * from where 1 = 1；真的条件 可以加上where关键字
    if (req.query.query) countObj += " and stu_name='" + req.query.query + "'";
    (async function () {
        //分页查询语句
        let results = await handleDB(res, "t_student", "limit", "数据库发生错误!", pageObj);//分页查询语句
        console.log(results);
        //查询总条数
        let cn = await handleDB(res, "t_student", "find", "数据库发生错误!", countObj);
        console.log(cn.length);
        let obj = {};//前端的数据返回
        obj.code = "0000";
        obj.count = cn.length;//总条数
        obj.msg = "查询成功";
        obj.data = results;
        res.send(obj);

    })();
})

// 获取单个用户
router.get("/getStudent/:id", (req, res) => {///getUsers接口  
    console.log(req.params);
    let { id } = req.params;
    //需要参数格式：{where:"id>2",number:2,count:2}
    //where 是查询条件 number是页数 count是条数
    (async function () {
        //分页查询语句
        let results = await handleDB(res, "t_student", "find", "数据库发生错误!", " id=" + id);//分页查询语句
        res.send(results[0])

    })();
})

// 新增用户
router.post("/addStudent", (req, res) => {
    console.log(req.body);
    let { stu_name, stu_img, stu_phone, stu_sex, stu_content,password } = req.body;
    let Student = db.model('t_student')
    Student.sql("insert into t_student (stu_name,stu_img,stu_phone,stu_sex,stu_content,password)values ('"+stu_name+"','"+stu_img+"','"+stu_phone+"','"+stu_sex+"','"+stu_content+"','"+password+"')",(error,results)=>{
        console.log(123);
        console.log(results);
        res.send({ msg: "插入成功!", code: "0000" });
    })
    // (async function () {
    //     let results = await handleDB(res, "t_student", "insert", "数据库发生错误!", { stu_name: stu_name, stu_img: stu_img, stu_phone: stu_phone, stu_sex: stu_sex, stu_content: stu_content });//分页查询语句
    //     console.log(results);
    //     if (results.affectedRows == 1) {
    //         res.send({ msg: "插入成功!", code: "0000" });
    //     } else {
    //         res.send({ msg: "插入失败!", code: "0007" });
    //     }
    // })();
})

//删除用户
router.delete("/deleteStudent/:id", (req, res) => {
    let { id } = req.params;
    let del = " id=" + id;

    (async function () {

        let results = await handleDB(res, "t_student", "delete", "数据库发生错误!", del);

        if (results.affectedRows == 1) {
            res.send({ msg: "删除成功!", code: "0000" });
        } else {
            res.send({ msg: "删除成功", code: "0000" });
        }
    })();
})

// 修改用户
router.post("/updateStudent", (req, res) => {

    console.log(req.body);

    let { id, stu_name, stu_img, stu_phone, stu_sex, stu_content } = req.body;
    console.log(id, stu_name, stu_img, stu_phone, stu_sex, stu_content);
    (async function () {
        let results = await handleDB(res, "t_student", "update", "数据库发生错误！", "id=" + id, {
            stu_name: stu_name,
            stu_img: stu_img,
            stu_phone: stu_phone,
            stu_sex: stu_sex,
            stu_content: stu_content
        });
        console.log(results);
        if (results.affectedRows == 1) {
            res.send({ msg: "修改成功！", code: "0000" })

        } else {
            res.send({ msg: "修改失败！", code: "0007" })
        }
    })();
})

// 批量删除用户
router.delete("/deleteStudents/:id", (req, res) => {
    let { id } = req.params;
    let del = " id in(" + id + ")";
    console.log(id);
    console.log(del);
    (async function () {

        let results = await handleDB(res, "t_student", "delete", "数据库发生错误!", del);
        console.log(results);
        if (results.affectedRows == 1) {
            res.send({ msg: "删除成功!", code: "0000" });
        } else {
            res.send({ msg: "删除失败!", code: "0007" });
        }
    })();
})

module.exports = router;