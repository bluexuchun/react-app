import React from 'react';
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
@withRouter
@connect(
  state=>state.chat
)
export default class NavLinkBar extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render() {

    //先遍历数组 过滤隐藏是true的组件
    const navList = this.props.data.filter(v=>!v.hide)
    const {pathname} = this.props.location
    return (
      <div style={{position:'fixed',bottom:0,width:'100%'}}>
        <TabBar>
          {navList.map(v=>(
            <TabBar.Item
              badge={v.path == '/msg' ? this.props.unread : null}
              key={v.path}
              title={v.text}
              icon={{uri: require(`./img/${v.icon}.png`)}}
              selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
              selected={pathname === v.path}
              onPress={()=>{
                this.props.history.push(v.path)
              }}
            >

            </TabBar.Item>
          ))}
        </TabBar>
      </div>
    );
  }
}
