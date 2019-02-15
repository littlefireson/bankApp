import React, { Component } from 'react';
import {Icon,NavBar} from 'antd-mobile';

class Nav extends Component {
    render() {
      return (
        <NavBar
          mode="dark"
          icon={this.props.header !== '民生银行补充协议' ? <Icon type="left" />:""}
          onLeftClick={()=>{
            console.log(this.props)
            this.props.history.goBack();
          }}
        >{this.props.header}</NavBar>
      );
    }
  }
  
  export default Nav;