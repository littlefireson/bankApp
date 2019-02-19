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
            phoneValue:"",
            codeValue:"",
            phoneError:false,
            codeShow:false,
            codeMsg:"获取验证码",
            maxtime:59,
            codeClick:true
        }

    }
    submit=()=>{
        const {
            phoneValue,
            codeValue,
            phoneError,
            codeClick
        } = this.state;
        // console.log(this.props)
        if(phoneValue ==='' ||phoneError){
            Toast.fail('未填写手机号或格式不正确')
            return;
        }
        if(codeValue ===''){
            Toast.fail('请填写验证码')
            return;
        }
        console.log(codeClick)
        if((codeValue !=='8888')){
            Toast.fail('验证码错误')
            return;
        }
        window.localStorage.setItem('phone', phoneValue);
        this.props.history.push('/about');
    }
    countDown(){    
        
            var msg = ""
            this.timer = setInterval(()=>{
                const {maxtime}=this.state;
                if(maxtime >=1){
                    var seconds = Math.floor(maxtime % 60);
                    msg = "重新发送"+seconds ;
                    this.setState({ maxtime: maxtime - 1 ,codeMsg:msg});
                }else{
                    msg = "重新获取验证码";
                    this.setState({ codeMsg:msg, codeClick:true});
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
                <WhiteSpace size="lg" />
                <WingBlank  size="md">
                <InputItem
                    type='phone'
                    placeholder="请输入手机号"
                    clear
                    extra={!this.state.phoneError && this.state.phoneValue!==""?this.state.codeMsg:''}
                    onExtraClick={()=>{
                        if(this.state.codeClick){
                            this.setState({
                                codeShow:true,
                                codeClick:false
                            },()=>{
                                if(this.state.maxtime<1){
                                    console.log(this.state.maxtime)
                                    this.setState({
                                        maxtime:59,
                                    }, ()=> {
                                        this.countDown();
                                    })
                                }else{
                                    console.log(this.state.maxtime)
                                    this.countDown();
                                }
                            })
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
                        Toast.info('手机格式不正确');
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