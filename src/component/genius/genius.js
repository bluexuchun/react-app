import React from 'react';
import axios from 'axios'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
  state=>state.chatuser,
  {getUserList}
)
export default class Genius extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      data:[]
    }
  }
  componentDidMount() {
    this.props.getUserList('boss')
  }
  render() {
    console.log(this.props)
    return <UserCard userlist={this.props.userlist}></UserCard>;
  }
}
