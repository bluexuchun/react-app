import React from 'react';
import {List, InputItem, NavBar, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import io from 'socket.io-client'
import './chat.css'
import {getMegList,sendMsg,recvMsg} from '../../redux/chat.redux.js'
import {getChatId} from '../../util'
// ws => websocket
const socket = io('ws://localhost:9093')

@connect(
  state=>state,
  {getMegList,sendMsg,recvMsg}
)
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg:[]
    }
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length){
      this.props.getMegList()
      this.props.recvMsg()
    }
  }
  render() {
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if(!users[userid]){
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid == chatid)
    return (
      <div id='chat-page'>
        <NavBar
          mode='dark'
          icon={<Icon type="left" />}
          onLeftClick={()=>{
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        {chatmsgs.map(v=>{
          const avatar = require(`../img/${users[v.from].avatar}.jpg`)
          return v.from == userid?(
            <List key={v._id}>
              <Item
                thumb={avatar}
              >{v.content}</Item>
            </List>
          ):(
            <List key={v._id}>
              <Item
                extra={<img src={avatar} />}
                className='chat-me'
              >{v.content}</Item>
            </List>
          )
          // return <p key={v._id}>{v.content}</p>
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    );
  }
  handleSubmit(){
    //向后端发送请求事件
    // socket.emit('sendmsg',{text:this.state.text})
    // this.setState({text:''})

    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from,to,msg})
    this.setState({text:''})
  }
}
