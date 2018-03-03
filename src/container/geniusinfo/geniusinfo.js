import React from 'react';
import {NavBar, InputItem, TextareaItem, WhiteSpace, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state=>state.user,
  {update}
)

export default class GeniusInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar:'',
      title:'',
      desc:''
    }
  }
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect!==path ? <Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar mode="dark">牛人完善信息页</NavBar>
        <AvatarSelector
          selectAvatar={
            (imgname)=>this.setState({
              avatar:imgname
            })}
        ></AvatarSelector>
        <WhiteSpace></WhiteSpace>
        <InputItem
          onChange={v=>this.onChange('title',v)}
        >
          求职岗位
        </InputItem>
        <TextareaItem
          onChange={v=>this.onChange('desc',v)}
          rows={3}
          autoHeight
          title='个人简介'
        >
        </TextareaItem>
        <WhiteSpace></WhiteSpace>
        <Button
          onClick={()=>{
            this.props.update(this.state)
          }}
          type='primary'
          >
            保存
          </Button>
      </div>
    );
  }
  onChange(key,val){
    this.setState({
      [key]:val
    })
  }
}
