const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const handleDB = require("../db/handleDB");
const db = require("../db/node_orm/index");
const { send } = require("process");

// 获取视频列表
router.get("/getVideos", (req, res) => {///getUsers接口  
    console.log(req.query.page);
    console.log(req.query);
    //需要参数格式：{where:"id>2",number:2,count:2}
    //where 是查询条件 number是页数 count是条数
    let pageObj = {};
    pageObj.number = req.query.page;
    pageObj.count = req.query.limit;
    pageObj.where = " 1=1 ";

    if (req.query.query) pageObj.where += " and video_name like '%" + req.query.query + "%' ";
    let countObj = " 1=1 ";//selet * from where 1 = 1；真的条件 可以加上where关键字
    if (req.query.query) countObj += " and video_name='" + req.query.query + "'";
    (async function () {
        //分页查询语句
        let results = await handleDB(res, "video", "limit", "数据库发生错误!", pageObj);//分页查询语句
        console.log(results);
        //查询总条数
        let cn = await handleDB(res, "video", "find", "数据库发生错误!", countObj);
        console.log(cn.length);
        let obj = {};//前端的数据返回
        obj.code = "0";
        obj.count = cn.length;//总条数
        obj.msg = "查询成功";
        obj.data = results;
        res.send(obj);

    })();
})
// 获取过审视频列表
router.get("/getPassVideos", (req, res) => {///getUsers接口  
    console.log(req.query.page);
    console.log(req.query);
    //需要参数格式：{where:"id>2",number:2,count:2}
    //where 是查询条件 number是页数 count是条数
    let pageObj = {};
    pageObj.number = req.query.page;
    pageObj.count = req.query.limit;
    pageObj.where = " 1=1 ";

    if (req.query.query) pageObj.where += " and video_name like '%" + req.query.query + "%' ";
    let countObj = " 1=1 ";//selet * from where 1 = 1；真的条件 可以加上where关键字
    if (req.query.query) countObj += " and video_name='" + req.query.query + "'";
    (async function () {
        //分页查询语句
        let results = await handleDB(res, "passvideo", "limit", "数据库发生错误!", pageObj);//分页查询语句
        console.log(results);
        //查询总条数
        let cn = await handleDB(res, "passvideo", "find", "数据库发生错误!", countObj);
        console.log(cn.length);
        let obj = {};//前端的数据返回
        obj.code = "0";
        obj.count = cn.length;//总条数
        obj.msg = "查询成功";
        obj.data = results;
        res.send(obj);

    })();
})
//删除视频
router.delete("/deleteVideo/:id", (req, res) => {
    let { id } = req.params;
    let del = " id=" + id;
    (async function () {
        let results = await handleDB(res, "video", "delete", "数据库发生错误!", del);

        if (results.affectedRows == 1) {
            res.send({ msg: "删除成功!", code: "0000" });
        } else {
            res.send({ msg: "删除失败!", code: "0007" });
        }
    })();
})
// 批量删除视频
router.delete("/deleteVideos/:id", (req, res) => {
    let { id } = req.params;
    let del = " id in(" + id + ")";
    console.log(id);
    (async function () {

        let results = await handleDB(res, "video", "delete", "数据库发生错误!", del);
        console.log(results);
        if (results.affectedRows == 1) {
            res.send({ msg: "删除成功!", code: "0000" });
        } else {
            res.send({ msg: "删除失败!", code: "0007" });
        }
    })();
})

//删除已过审视频
router.delete("/deletePassVideo/:id", (req, res) => {
    let { id } = req.params;
    let del = " id=" + id;
    (async function () {
        let results = await handleDB(res, "passvideo", "delete", "数据库发生错误!", del);
        if (results.affectedRows == 1) {
            res.send({ msg: "删除成功!", code: "0000" });
        } else {
            res.send({ msg: "删除失败!", code: "0007" });
        }
    })();
})

// 批量删除已过审视频
router.delete("/deletePassVideos/:id", (req, res) => {
    let { id } = req.params;
    let del = " id in(" + id + ")";
    console.log(id);
    (async function () {

        let results = await handleDB(res, "passvideo", "delete", "数据库发生错误!", del);
        console.log(results);
        if (results.affectedRows == 1) {
            res.send({ msg: "删除成功!", code: "0000" });
        } else {
            res.send({ msg: "删除失败!", code: "0007" });
        }
    })();
})
// 视频通过审核
router.post("/PassAudit", (req, res) => {
    console.log(req.body);
    let { id, video_name, video_content, video_time, up_name, up_img } = req.body;
    let del = " id=" + id;
    console.log(del);
    (async function () {
        let results = await handleDB(res, "passvideo", "insert", "数据库发生错误!", {
            video_name: video_name,
            video_content: video_content,
            video_time: video_time,
            up_name: up_name,
            up_img: up_img
        });//分页查询语句
        // 通过审核后将视频放入passvideo表  删除原表中对应数据
        let results2 = await handleDB(res, "video", "delete", "数据库发生错误!", del);
        console.log(results);
        console.log(results2);
        if (results.affectedRows == 1) {
            res.send({ msg: "插入成功!", code: "0000" });
        } else {
            res.send({ msg: "插入失败!", code: "0007" });
        }
    })();
})

// 获取热门视频
router.get("/getHotVideo", (req, res) => {///getUsers接口  
    console.log(req.query.page);
    console.log(req.query);
    //需要参数格式：{where:"id>2",number:2,count:2}
    //where 是查询条件 number是页数 count是条数
    let pageObj = {};
    pageObj.number = req.query.page;
    pageObj.count = req.query.limit;
    pageObj.where = " 1=1 ";

    if (req.query.query) pageObj.where += " and video_name like '%" + req.query.query + "%' ";
    let countObj = " 1=1 ";//selet * from where 1 = 1；真的条件 可以加上where关键字
    if (req.query.query) countObj += " and video_name='" + req.query.query + "'";
    (async function () {
        //分页查询语句
        let results = await handleDB(res, "hotvideo", "limit", "数据库发生错误!", pageObj);//分页查询语句
        console.log(results);
        //查询总条数
        let cn = await handleDB(res, "hotvideo", "find", "数据库发生错误!", countObj);
        console.log(cn.length);
        let obj = {};//前端的数据返回
        obj.code = "0";
        obj.count = cn.length;//总条数
        obj.msg = "查询成功";
        obj.data = results;
        res.send(obj);

    })();
})

// 获取过审视频
router.get("/getPassVideo", (req, res) => {///getUsers接口  
    (async function () {
        //分页查询语句
        let results = await handleDB(res, "passvideo", "find", "数据库发生错误!");//分页查询语句
        console.log(results);
        res.send({ msg: "查询成功", code: "0000", data: results })

    })();
})

// 获取被举报视频
router.get("/getReportVideo", (req, res) => {///getUsers接口  
    console.log(req.query.page);
    console.log(req.query);
    //需要参数格式：{where:"id>2",number:2,count:2}
    //where 是查询条件 number是页数 count是条数
    let pageObj = {};
    pageObj.number = req.query.page;
    pageObj.count = req.query.limit;
    pageObj.where = " 1=1 ";

    if (req.query.query) pageObj.where += " and video_name like '%" + req.query.query + "%' ";
    let countObj = " 1=1 ";//selet * from where 1 = 1；真的条件 可以加上where关键字
    if (req.query.query) countObj += " and video_name='" + req.query.query + "'";
    (async function () {
        //分页查询语句
        let results = await handleDB(res, "reportvideo", "limit", "数据库发生错误!", pageObj);//分页查询语句
        console.log(results);
        //查询总条数
        let cn = await handleDB(res, "reportvideo", "find", "数据库发生错误!", countObj);
        console.log(cn.length);
        let obj = {};//前端的数据返回
        obj.code = "0";
        obj.count = cn.length;//总条数
        obj.msg = "查询成功";
        obj.data = results;
        res.send(obj);

    })();
})

//删除被举报视频
router.delete("/deleteReportVideo/:id", (req, res) => {
    let { id } = req.params;
    let del = " id=" + id;
    (async function () {
        let results = await handleDB(res, "reportvideo", "delete", "数据库发生错误!", del);
        let results1 = await handleDB(res, "passvideo", "delete", "数据库发生错误!", del);
        if (results.affectedRows == 1 && results1.affectedRows == 1) {
            res.send({ msg: "删除成功!", code: "0000" });
        } else {
            res.send({ msg: "删除失败!", code: "0007" });
        }
    })();
})

// 审核通过被举报视频
router.delete("/PassReportVideo/:id", (req, res) => {
    let { id } = req.params;
    let del = " id=" + id;
    (async function () {
        let results = await handleDB(res, "reportvideo", "delete", "数据库发生错误!", del);
        if (results.affectedRows == 1) {
            res.send({ msg: "删除成功!", code: "0000" });
        } else {
            res.send({ msg: "删除失败!", code: "0007" });
        }
    })();
})

// 批量删除被举报视频  
router.delete("/PassReportVideo/:id", (req, res) => {
    let { id } = req.params;
    let del = " id in(" + id + ")";
    console.log(id);
    (async function () {

        let results = await handleDB(res, "reportvideo", "delete", "数据库发生错误!", del);
        console.log(results);
        if (results.affectedRows == 1) {
            res.send({ msg: "删除成功!", code: "0000" });
        } else {
            res.send({ msg: "删除失败!", code: "0007" });
        }
    })();
})

// 视频详情页,通过ID获取对应视频
router.get("/getVideoById/:id", (req, res) => {///getUsers接口  
    let { id } = req.params;
    console.log("id:" + id);
    (async function () {
        //查询总条数
        let results = await handleDB(res, "passvideo", "find", "数据库发生错误!", " id = " + id);
        console.log(results);
        if (results != undefined) {
            res.send({ msg: "查询成功!", code: "0000", data: results[0] });
        } else {
            res.send({ msg: "查询失败!", code: "0007" });
        }

    })();
})

// 上传视频
router.post("/addVideo", (req, res) => {
    console.log(req.body);
    let { up_name, up_img, video_name, video_content, video_time } = req.body;
    (async function () {
        let results = await handleDB(res, "video", "insert", "数据库发生错误!", {
            up_name: up_name,
            up_img: up_img,
            video_name: video_name,
            video_content: video_content,
            video_time: video_time,
        });
        console.log(results);
        if (results.affectedRows == 1) {
            res.send({ msg: "插入成功!", code: "0000" });
        } else {
            res.send({ msg: "插入失败!", code: "0007" });
        }
    })();
})

// 举报视频
router.post("/ReportVideo", (req, res) => {
    console.log(req.body);
    let { id, video_name, video_content, up_name, video_time, up_img, reason } = req.body;
    // console.log(video_name, video_content, up_name, video_time, up_img);
    (async function () {
        let results1 = await handleDB(res, "reportvideo", "find", "数据库发生错误!", " id = " + id);
        if (results1.length > 0) {
            let count = results1[0].count
            console.log("count:" + count);
            // res.send("更新举报视频表中的count+=1")
            (async function () {
                let results = await handleDB(res, "reportvideo", "update", "数据库发生错误！", "id=" + id, {
                    count: count + 1,
                });
                console.log(results);
                if (results.affectedRows == 1) {
                    res.send({ msg: "举报成功！", code: "0000" })
                } else {
                    res.send({ msg: "举报失败！", code: "0007" })
                }
            })();
        } else {
            // res.send("插入举报视频表")
            let results = await handleDB(res, "reportvideo", "insert", "数据库发生错误！", {
                id: id,
                video_name: video_name,
                video_content: video_content,
                video_time: video_time,
                up_name: up_name,
                up_img: up_img,
                reason: reason,
                count: 1
            });
            console.log(results);
            if (results.affectedRows == 1) {
                res.send({ msg: "举报成功！", code: "0000" })
            } else {
                res.send({ msg: "举报异常！", code: "0007" })
            }
        }

    })();
})

module.exports = router;