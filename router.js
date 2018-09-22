/*路由模块*/
//渲染主页index.art
const express = require('express');
const router = express.Router();
const service = require("./service.js");

//登录页面
router.post('/login',service.toMainIndex);

//渲染主页
router.get('/',service.showIndex);

//跳转到图书编辑页面
router.get('/toEditBook',service.toEditBook);

//编辑图书提交表单
router.post('/editBook',service.editBook);

//删除图书信息
router.get('/deleteBook',service.deleteBook);

//跳转到添加图书页面
router.get('/toAddBook',service.toAddBook);

//添加图书信息提交
router.post('/addBook',service.addBook);

module.exports = router;
