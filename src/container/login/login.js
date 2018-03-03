import React from 'react';
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import {login} from '../../redux/user.redux'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import imoocForm from '../../component/imooc-form/imooc-form'

// funciton hello(){
//   console.log('hello imooc')
// }
//
// function WrapperHello(fn){
//   return function(){
//     console.log('before say hello')
//     fn()
//     console.log('after say hello')
//   }
// }
//
// //高级组件
// hello = WrapperHello(hello)
// hello()

// 属性代理
// function WrapperHello(Comp){
//   class WrapComp extends Comp{
//     componentDidMount() {
//       console.log('高阶组件新增的生命周期，加载完成')
//     }
//     render(){
//       return <Comp></Comp>
//     }
//   }
  // class WrapComp extends React.Component{
  //
  //   render(){
  //     return (
  //       <div>
  //         <p>这是HOC高阶组件特有的元素</p>
  //         <Comp name='text' {...this.props}></Comp>
  //       </div>
  //     )
  //   }
  // }
//   return WrapComp
// }



// @WrapperHello
// class Hello extends React.Component{
//   render(){
//     return <h2>hello imooc i love React</h2>
//   }
// }



@connect(
  state=>state.user,
  {login}
)
@imoocForm
class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {(this.props.redirectTo && this.props.redirectTo != '/login') ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem
              onChange={v=>this.props.handleChange('user',v)}
              >用户</InputItem>
            <InputItem
              onChange={v=>this.props.handleChange('pwd',v)} type="password"
              >密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p>:null}
          <Button onClick={()=>this.handleLogin()} type='primary'>登录</Button>
          <WhiteSpace></WhiteSpace>
          <Button onClick={()=>this.register()} type='primary'>注册</Button>
        </WingBlank>
      </div>
    );
  }
  register(){
    this.props.history.push('/register')
  }
  handleLogin(){
    this.props.login(this.props.state)
  }
}

export default Login
