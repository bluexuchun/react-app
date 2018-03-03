import React from 'react';
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'
export default class AvatarSelector extends React.Component {
  //这是类型检测 就是必须返回的是方法类型 或者 string array bool等规定的类型
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired //代表必传的
  }
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render() {
    console.log(this.props)
    const avatarList = 'dog1,dog2,dog3,dog4,dog5'
                        .split(',')
                        .map(v=>({
                          icon:require(`../img/${v}.jpg`),
                          text:v
                        }))
    const gridHeader = this.state.text ? (<div>
                                            <span>已选择头像</span>
                                            <img style={{width:'20px',marginLeft:'5px'}} src={this.state.icon} alt=""/>
                                          </div>)
                                        : '请选择头像'
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid
            data={avatarList}
            columnNum={3}
            onClick={elm=>{
              this.setState(elm)
              this.props.selectAvatar(elm.text)
            }}
          />
        </List>
      </div>
    );
  }
}
