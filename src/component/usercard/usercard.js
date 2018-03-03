import React from 'react';
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
export default class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WingBlank>
        {this.props.userlist.map(v=>(
          v.avatar ? (
          <Card
            key={v._id}
            onClick={()=>this.handleClick(v)}
          >
            <Card.Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.jpg`)}
              thumbStyle={{width:'50px',height:'50px'}}
              extra={<span>{v.title}</span>}
            >
            </Card.Header>
            <Card.Body>
              {v.type == 'boss' ? <div>公司:{v.company}</div>:null}
              {v.desc.split('\n').map(d=>(
                <div key={d}>{d}</div>
              ))}
              {v.type == 'boss' ? <div>薪资:{v.money}</div>:null}
            </Card.Body>
          </Card> ) : null
        ))}
      </WingBlank>
    );
  }

  handleClick(v){
    console.log(v)
    this.props.history.push(`/chat/${v._id}`)
  }
}
