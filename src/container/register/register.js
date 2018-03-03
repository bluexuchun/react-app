import React from 'react';
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import './register.css'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
  state=>state.user,
  {register}
)

@imoocForm
class Register extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.handleChange('type','genius')
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo></Logo>
        <WingBlank>
          <List>

            <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
            <InputItem onChange={v=>this.props.handleChange('pwd',v)} type="password">密码</InputItem>
            <InputItem onChange={v=>this.props.handleChange('repeatpwd',v)} type="password">确认密码</InputItem>
            <RadioItem checked={this.props.state.type == 'genius'} onChange={()=>this.props.handleChange('type','genius')}>
              牛人
            </RadioItem>
            <RadioItem checked={this.props.state.type == 'boss'} onChange={()=>this.props.handleChange('type','boss')}>
              Boss
            </RadioItem>
          </List>
          <WhiteSpace></WhiteSpace>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p>:null}
          <Button type='primary' onClick={this.handleRegister.bind(this)}>
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
  handleRegister(){
    this.props.register(this.props.state)
  }

}

export default Register
