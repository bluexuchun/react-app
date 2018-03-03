import React from 'react'
import logoImg from './logo.png'
import './logo.css'

export default class Logo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="logo-container">
        <img src={logoImg} alt=""/>
      </div>
    );
  }
}
