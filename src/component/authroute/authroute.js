import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
import {getRedirectPath} from '../../util.js'
@withRouter
@connect(
  null,
  {loadData}
)
export default class AuthRoute extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const publicList = ['/login','/register']
    const pathname = this.props.location.pathname
    if(publicList.indexOf(pathname)>-1){
      return null
    }
    // 获取用户信息
    axios.get('/user/info').
      then(res => {
        if(res.status == 200) {
          console.log(res)
          if(res.data.code == 0){
            // 有登陆信息
            this.props.loadData(res.data.data)
            // console.log(this.props)
            // this.props.history.push('/user')
          }else{
            // console.log(this.props)

            this.props.history.push('/login')
          }
        }
      });
    // 是否登录 现在的url地址 login是不需要跳转的
    // 用户的type 身份是boss 还是 牛人
    // 用户是否完善信息 (选择头像 个人简介)
  }
  render() {
    return  null
  }
}
