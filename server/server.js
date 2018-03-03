const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const model = require('./model')
const Chat = model.getModel('chat')

// socket work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection',function(socket){
  console.log('user login')
  socket.on('sendmsg',function(data){
    const {from, to, msg} = data
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg},function(err,doc){
      io.emit('recvmsg',Object.assign({},doc._doc))
    })
    // console.log(data)
    //发送给全局
    // io.emit('recvmsg',data)
  })
})

const userRouter = require('./user')


app.use(cookieParser())
//解析post过来的数据
app.use(bodyParser.json())
app.use('/user',userRouter)
server.listen(9093,function(){
  console.log('Node app start at port 9093')
})
