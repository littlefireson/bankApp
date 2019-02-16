import React, { Component } from 'react';
import { Button , InputItem ,WingBlank, WhiteSpace ,Toast} from 'antd-mobile';
// import {creatForm} from 'rc-form';
// // 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// // https://github.com/ant-design/ant-design-mobile/issues/307
// // https://github.com/ant-design/ant-design-mobile/issues/163
// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
// let moneyKeyboardWrapProps;
// if (isIPhone) {
//     moneyKeyboardWrapProps = {
//         onTouchStart: e => e.preventDefault(),
//     };
// }
class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            emailValue:"",
            phoneValue:"",
            codeValue:"",
            emailError:false,
            phoneError:false,
            codeShow:false,
            codeMsg:"获取验证码",
            maxtime:3,
        }

    }
    submit=()=>{
        const {
            emailValue,
            phoneValue,
            codeValue,
            emailError,
            phoneError,
        } = this.state;
        // console.log(this.props)
        if(emailValue ==='' ||emailError){
            Toast.fail('未填写邮箱或格式不正确')
            return;
        }
        if(phoneValue ==='' ||phoneError){
            Toast.fail('未填写手机号或格式不正确')
            return;
        }
        if(codeValue ===''){
            Toast.fail('请填写验证码')
            return;
        }
        if(codeValue !=='8888'){
            Toast.fail('验证码错误')
            return;
        }
        this.props.history.push('/about');
    }
    countDown(){
        var msg = ""
        this.timer = setInterval(()=>{
            const {maxtime}=this.state;
            if(maxtime >=1){
                var seconds = Math.floor(maxtime % 60);
                msg = seconds + "秒";
                this.setState({ maxtime: maxtime - 1 ,codeMsg:msg});
            }else{
                msg = "重新获取验证码";
                this.setState({ codeMsg:msg});
                clearInterval(this.timer);
            }
        },1000)
    }
    render() {
        // const { getFieldProps } = this.props.form;
        return (
            <div >

            <p>
                请使用手机号完成登录验证
            </p>
                <WingBlank  size="md">
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
                        // moneyKeyboardAlign="left"
                        // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >电子邮箱
                    </InputItem>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank  size="md">
                <InputItem
                    type='phone'
                    placeholder="请输入手机号"
                    clear
                    extra={!this.state.phoneError && this.state.phoneValue!==""?this.state.codeMsg:''}
                    onExtraClick={()=>{
                        
                        this.setState({
                            codeShow:true
                        })
                        if(this.state.maxtime<=1){
                            console.log(this.state.maxtime)
                            this.setState({
                                maxtime:59
                            }, ()=> {
                                this.countDown();
                            })
                        }else{
                            this.countDown();
                        }
                    }}
                    error={this.state.phoneError && this.state.phoneValue!==""}
                    onChange={(value)=>{
                        if (value.replace(/\s/g, '').length<11) {
                            this.setState({
                                phoneError: true,
                            });
                        } else {
                            this.setState({
                                phoneError: false,
                            });
                        }
                        this.setState({
                            phoneValue:value
                        })
                    }}
                    onErrorClick={()=>{
                        Toast.info('邮箱格式不正确');
                    }}
                    value = {this.state.phoneValue}
                    // moneyKeyboardAlign="left"
                    // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                >手机号
                </InputItem>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank  size="md">
                {this.state.codeShow&&<InputItem
                    type='number'
                    placeholder="请输入验证码"
                    clear
                    onChange={(value)=>{
                        this.setState({
                            codeValue:value
                        })
                    }}
                    maxLength={4}
                    value = {this.state.codeValue}
                >验证码
                </InputItem>}
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank  size="md">
                    <Button type="primary" onClick={this.submit}>提交</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Login;