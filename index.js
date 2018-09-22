/*图书管理入口文件*/
const express = require("express");
const template = require("art-template");
const path = require("path");
const router = require("./router.js");
const bodyParser = require("body-parser");//post请求要用到的中间件
const app = express();
//启动静态资源服务
app.use('/www/',express.static("public"));

//设置模板引擎路径
app.set("views",path.join(__dirname,"views"));

//设置渲染模板引擎
app.set("view engine","art");

//express兼容art-template模块
app.engine("art",require("express-art-template"));

//配置body-parser中间件,必须放置“配置路由”之前
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//配置路由 写后面
app.use(router);

app.listen(3000,()=>{
	console.log("app is running...");
});