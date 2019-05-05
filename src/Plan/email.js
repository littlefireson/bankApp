import React, { Component } from 'react';
import { InputItem, WhiteSpace ,WingBlank, Button,Toast} from 'antd-mobile';
import Nav from '../header/header';
class Email extends Component {

  state = {
    emailValue:"",
    emailError:false,
  };

  onClose = () =>{
    this.setState({
      isOpen: false
    })
  }

  openViewer (index){
    this.setState({
      index,
      isOpen: true
    })
  }

  render() {
    const {
      emailValue,
      emailError,
  } = this.state;
    const header = '填写邮箱'
    return (
      <div className="app">
      <Nav {...this.props} header={header}></Nav>
        <div className="img-list">
          <WingBlank size='lg'>
            <h4>您填写的邮箱将用于收取救助协议书</h4>
            <p>请正确的填写您的邮箱</p>
          </WingBlank>
          <WhiteSpace/>
          <WingBlank size='md'>
          <InputItem
                        type='url'
                        placeholder="请输入邮箱"
                        clear
                        error={this.state.emailError && this.state.emailValue!==""}
                        onChange={(value)=>{
                            if (value !== ' ' && value.replace(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g, '')) {
                                this.setState({
                                    emailError: true,
                                });
                            } else {
                                this.setState({
                                    emailError: false,
                                });
                            }
                            this.setState({
                                emailValue:value
                            })
                        }}
                        onErrorClick={()=>{
                            Toast.info('邮箱格式不正确');
                        }}
                        value = {this.state.emailValue}
                    >电子邮箱
                    </InputItem>
          </WingBlank>
          <WhiteSpace/>
          <WhiteSpace/>
          <WingBlank size='md'>
          <Button type='primary' onClick={()=>{
            if(emailValue ==='' ||emailError){
                Toast.fail('未填写邮箱或格式不正确')
                return;
            }
            window.localStorage.setItem('email',emailValue)
            this.props.history.push('/signIn')
          }}>查看并签署救助协议</Button>
          </WingBlank>
        </div>
        
      </div>
    )
  }
}

export default Email;