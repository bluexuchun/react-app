import React from 'react';
import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../../component/navlink/navlink'
import './dashboard.css'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import {getMegList,sendMsg,recvMsg} from '../../redux/chat.redux.js'

function Msg(){
  return <div>Msg</div>
}

@connect(
  state=>state,
  {getMegList,sendMsg,recvMsg}
)
export default class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length){
      this.props.getMegList()
      this.props.recvMsg()
    }
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        path:'/boss',
        text:'牛人',
        icon:'genius',
        title:'牛人列表',
        component:Boss,
        hide:user.type == 'genius'
      },
      {
        path:'/genius',
        text:'boss',
        icon:'boss',
        title:'Boss列表',
        component:Genius,
        hide:user.type == 'boss'
      },
      {
        path:'/msg',
        text:'消息',
        icon:'msg',
        title:'消息列表',
        component:Msg
      },
      {
        path:'/user',
        text:'我',
        icon:'user',
        title:'个人中心',
        component:User
      }
    ]
    return (
      <div className="container">
        {/* header */}
        <NavBar className='fixd-header' mode='dard'>
          {pathname !== '/' ? navList.find(v=>v.path==pathname).title : null}
        </NavBar>
        <div>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        {/* footer */}
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    );
  }
}
