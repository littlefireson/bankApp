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
            emailFlag:false,
            phoneFlag:false,
            codeFlag:false
        }
    }
    submit=()=>{
        const {
            emailFlag,
            phoneFlag,
            codeFlag
        } = this.state;
        // console.log(this.props)
        if(emailFlag&&phoneFlag&&codeFlag){
            this.props.history.push('/about');
        }
        else{
            Toast.fail('信息错误')
        }
    }
    render() {
        console.log(this.props)
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
                        error={true}
                        onChange={(value)=>{
                            if (value.replace(/\s/g, '').length < 11) {
                                this.setState({
                                    emailFlag: true,
                                });
                                } else {
                                this.setState({
                                    emailFlag: false,
                                });
                                }
                            console.log(value)
                        }}
                        onErrorClick={()=>{
                            if (!this.state.emailFlag) {
                                Toast.info('邮箱格式不正确');
                            }
                        }}
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
                    extra="发送验证码"
                    onExtraClick={()=>{
                        console.log('1111')
                    }}
                    clear
                    // moneyKeyboardAlign="left"
                    // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                >手机号
                </InputItem>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank  size="md">
                <InputItem
                    type='number'
                    placeholder="请输入验证码"
                    clear
                    // moneyKeyboardAlign="left"
                    // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                >验证码
                </InputItem>
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