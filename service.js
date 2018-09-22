/*业务逻辑模块*/
const fs = require("fs");
const path = require("path");
const db = require("./db.js");

//登录页面登录验证后跳转到主页面
exports.toMainIndex = (req,res)=>{
	let info = req.body;
	let sql = "select count(*) as total from user where username=? and password=?";
	let data = [info.username,info.password];
	db.base(sql,data,(results)=>{
        if(results[0].total==1){
        	res.redirect("/");
        }else{
        	res.send("用户名或密码错误!");
        }
	});
}

//渲染主页面
exports.showIndex = (req,res)=>{
	let sql = "select * from book";
	data = null;
    db.base(sql,data,(results)=>{
    	//console.log(results);
    	//console.log(typeof(results));
        res.render("index",{list:results});
    });
}

//跳转到图书编辑页面
exports.toEditBook = (req,res)=>{
	let id = req.query.id;
	let sql = "select * from book where id=?";
	let data = [id];
	db.base(sql,data,(results)=>{
        res.render("editBook",results[0]);
	});
}

//编辑图书更新数据
exports.editBook = (req,res)=>{
	let info = req.body;
    let sql = "update book set name=?,author=?,category=?,description=? where id=?";
    let data = [info.name,info.author,info.category,info.description,info.id];
    db.base(sql,data,(results)=>{
        if(results.affectedRows==1) {
            res.redirect("/");
        } 
    });
}

//删除图书
exports.deleteBook = (req,res)=>{
	let id = req.query.id;
	let sql = "delete from book where id=?";
	let data = [id];
	db.base(sql,data,(results)=>{
        if(results.affectedRows==1) {
            res.redirect("/");
        } 
	});
}

//跳转到添加图书的页面
exports.toAddBook = (req,res)=>{
	res.render("addBook",{});
}

//添加图书提交保存数据
exports.addBook = (req,res)=>{
	let book = req.body;
	let newBook = {};
	for(let key in book){
		newBook[key] = book[key];
	}
	let sql = "insert into book set?";
	let data = newBook;
    db.base(sql,data,(results)=>{
        if(results.affectedRows==1) {
            res.redirect("/");
        }
    });
}
