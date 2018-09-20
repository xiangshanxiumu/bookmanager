/*业务逻辑模块*/
const data = require("./data.json");
const fs = require("fs");
const path = require("path");

//定义把数据写入文件函数方法
let writeDataToFile = (res)=>{
    fs.writeFile(path.join(__dirname,"data.json"),JSON.stringify(data),(err)=>{
    	if(err){
    		res.end("服务器内部错误！");
    	}
    	//重定向重新跳转到主页
    	res.redirect("/");
    });
}

//渲染主页面
exports.showIndex = (req,res)=>{
    res.render("index",{list:data});
}

//跳转到图书编辑页面
exports.toEditBook = (req,res)=>{
	let id = req.query.id;
    let book ={};
    data.forEach((item)=>{
        if(id==item.id){
        	book = item;
        	return;
        }
    });
	res.render("editBook",book);
}

//编辑图书更新数据
exports.editBook = (req,res)=>{
	let info = req.body;
	data.forEach((item)=>{
		if(item.id==info.id){
			for(let key in info){
				item[key] = info[key];
			}
			return;
		}
	})
    //把编辑过的缓存数据写入文件
    writeDataToFile(res);
}

//删除图书
exports.deleteBook = (req,res)=>{
	let id = req.query.id;
	data.forEach((item,index)=>{
		if(item.id==id){
			data.splice(index,1);
		}
		return;
	});
	//把删除过的缓存数据写入文件
    writeDataToFile(res);
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
	newBook.id = maxBookId()+1;//maxBookId函数调用后面要加()
	data.push(newBook);
   //数据写入文件
    writeDataToFile(res);
}

//定义求BookId的最大数的函数
let maxBookId = ()=>{
	let arr = [];
	data.forEach((item)=>{
		arr.push(item.id);
	});
	return Math.max.apply(null,arr);
}
