const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

const handleDB = require("../db/handleDB");


router.post("/getBody",(req,res)=>{
    console.log(req.body);
})

// // 模板使用
router.get("/getMoban",(req,res)=>{
    let aa = 123456;
    console.log(aa);
    res.render("index",{aa});
})


module.exports=router;