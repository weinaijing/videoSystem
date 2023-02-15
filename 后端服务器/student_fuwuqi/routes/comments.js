const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const handleDB = require("../db/handleDB");
const db = require("../db/node_orm/index");


// 根据视频id获取视频评论信息
router.get("/getComments", (req, res) => {///getUsers接口  
    console.log(req.query.id);
    let id = req.query.id;
    console.log(req.query);
    (async function () {
        let results = await handleDB(res, "comments", "find", "数据库发生错误!", "vid="+id);
        res.send(results);
    })();
})

// 新增评论
router.post("/addComment", (req, res) => {
    console.log(req.body);
    let { uid, vid, name, headImg, comment,time,like } = req.body;
    (async function () {
        let results = await handleDB(res, "comments", "insert", "数据库发生错误!", {
            uid: uid,
            vid: vid,
            name: name,
            headImg: headImg,
            comment: comment,
            time: time,
            // like: like,
        });
        console.log(results);
        if (results.affectedRows == 1) {
            res.send({ msg: "插入成功!", code: "0000" });
        } else {
            res.send({ msg: "插入失败!", code: "0007" });
        }
    })();
})

module.exports = router;