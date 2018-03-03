const express = require('express')
// md5加密
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filiter = {'pwd':0,'__v':0}
Router.get('/getmsglist',function(req,res){
  const user = req.cookies.userid
  User.find({},function(err,doc){
    let users = {}
    doc.forEach(v=>{
      users[v._id] = {name:v.user, avatar:v.avatar}
    })
    //'$or'查询多个条件 '$or':[{from:user,to:user}]
    Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
      if(!err){
        return res.json({code:0,msgs:doc,users:users})
      }
    })
  })

})
// get 用query获取 post 用body获取
Router.get('/list',function(req,res){
  const { type } = req.query
  // User.remove({},function(err,doc){})
  User.find({type},function(err,doc){
    return res.json({code:0,data:doc})
  })
})
Router.post('/update',function(req,res){
  const userid = req.cookies.userid
  if(!userid) {
    return res.json({code:1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid,body,function(err,doc){
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type
    },body)
    return res.json({code:0,data})
  })
})
Router.post('/login',function(req,res){
  const {user,pwd} =req.body
  User.findOne({user,pwd:md5Pwd(pwd)},_filiter,function(err,doc){
    if(!doc){
      return res.json({code:1,msg:'用户名或者密码错误'})
    }
    //设置cookie
    res.cookie('userid', doc._id)
    return res.json({code:0,data:doc})
  })
})
Router.post('/register',function(req,res){
  console.log(req.body)
  const {user, pwd, type} = req.body
  User.findOne({user:user},function(err,doc){
    if(doc){
      return res.json({code:1,msg:'用户名重复'})
    }
    const userModel = new User({user, pwd:md5Pwd(pwd), type})
    userModel.save(function(err, doc){
      if(err){
        return res.json({code:1,msg:'后端出错了'})
      }
      const {user,type,_id} = doc
      res.cookie('userid',_id)
      return res.json({code:0,data:req.body})
    })
  })
})
Router.get('/info',function(req, res){
  const {userid} = req.cookies
  // 用户有没有cookies
  if(!userid){
    return res.json({code:1})
  }
  User.findOne({_id:userid},_filiter, function(err,doc){
    if(err){
      return res.json({code:1, msg:'后端出错了'})
    }
    if(doc){
      return res.json({code:0,data:doc})
    }
  })
})

//比较严密的加密形式 2层md5和加上一串复杂字符串
function md5Pwd(pwd){
  const salt = 'imooc_is_good_3957x8yza6!@#IUHh~~'
  return utils.md5(utils.md5(pwd+salt))
}
module.exports = Router
