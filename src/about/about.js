import React, { Component } from 'react'
import { Button , InputItem ,WingBlank, WhiteSpace } from 'antd-mobile';
import Nav from '../header/header';
import ImagePickerExample from '../imagePicker/imagePicker';

class About extends Component{
    submit=()=>{
        this.props.history.push('/plan');
    }
    render() {
    const header = "请完善信息"
    return (
        <div>
            <Nav  {...this.props} header={header}></Nav>
            <ImagePickerExample/>
            <WingBlank  size="md">
                    <InputItem
                        type='text'
                        placeholder="张三"
                        clear
                        // moneyKeyboardAlign="left"
                        // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >姓名
                    </InputItem>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank  size="md">
                <InputItem
                    type='text'
                    placeholder="女"
                    clear
                    // moneyKeyboardAlign="left"
                    // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                >性别
                </InputItem>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank  size="md">
                <InputItem
                    type='text'
                    placeholder="汉"
                    clear
                    // moneyKeyboardAlign="left"
                    // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                >民族
                </InputItem>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank  size="md">
                <InputItem
                    type='text'
                    placeholder="1994年4月10日"
                    clear
                    // moneyKeyboardAlign="left"
                    // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                >出生日期
                </InputItem>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank  size="md">
                <InputItem
                    type='text'
                    placeholder="北京市朝阳区酒仙桥"
                    clear
                    // moneyKeyboardAlign="left"
                    // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                >住址
                </InputItem>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank  size="md">
                <InputItem
                    type='text'
                    placeholder="627123199404101234"
                    clear
                    // moneyKeyboardAlign="left"
                    // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                >身份证号
                </InputItem>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank  size="md">
                <InputItem
                    type='text'
                    placeholder="2017-12-12至长期"
                    clear
                    // moneyKeyboardAlign="left"
                    // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                >证件有效期
                </InputItem>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank  size="md">
                    <Button type="primary" onClick={this.submit}>提交</Button>
                </WingBlank>
        </div>
    )
        
  }
}
export default About;