//该路由专门跳转页面
const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

 //跳转主页页面
router.get("/toIndex",(req,res)=>{
    const regPage = fs.readFileSync(path.join(__dirname,"../views","index.html"),"utf-8")
    res.send(regPage);
})

router.get("/getSession",(req,res)=>{
    let token = req.session["token"]='abcd';
    res.send("Session数据:"+token);
})


// router.get("/getMoban",(req,res)=>{
//     const regPage = fs.readFileSync(path.join(__dirname,"../views","index.html"),"utf-8")
//     res.send(regPage);
// })

module.exports=router;