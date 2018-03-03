import React from 'react';
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, WingBlank, Button, Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
  state=>state.user,
  {logoutSubmit}
)

export default class User extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    console.log(this.props)
    console.log(this.props.redirectTo)
    return props.user ? (
      <div>
        <Result
          img={<img style={{width:"60px",height:"60px",borderRadius:"50%"}} src={require(`../img/${props.avatar}.jpg`)} alt=""/>}
          title={props.user}
          message={props.type == 'boss' ? props.company : null}
        />
        <List renderHeader={()=>'简介'}>
          <Item
            multipleLine
          >
            {props.title}
            {props.desc.split('\n').map(v=>(
              <Brief key={v}>{v}</Brief>
            ))}
            {props.money ? <Brief>薪资:{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button type="primary" onClick={()=>this.logout()}>退出登录</Button>
        </WingBlank>
      </div>
    ):<Redirect to={props.redirectTo} />
  }
  logout(){
    const alert = Modal.alert

    alert('注销','确认退出登录吗？', [
      {text: '取消', onPress: ()=>console.log('cancel')},
      {text: '确认', onPress: ()=>{
        browserCookie.erase('userid')
        this.props.logoutSubmit()
        // window.location.href = window.location.href
      }}
    ])
    // browserCookie.erase('userid')
    // window.location.href = window.location.href
  }

}
