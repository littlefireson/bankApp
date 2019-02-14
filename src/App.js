import React, { Component } from 'react';
import styles from './App.css';
import Login from './login/login';
import Nav from './header/header';


class App extends Component {
  render() {
    const header = "民生银行补充协议"
    return (
      <div className={styles.App}>
        <Nav  {...this.props} header={header}></Nav>
        <div className={styles['App-intro']}>
          <Login {...this.props}></Login>
        </div>
      </div>
    );
  }
}

export default App;
