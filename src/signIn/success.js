import React, { Component } from 'react';
import Nav from '../header/header';
import style from '../App.css';
import dsa from '../images/12312.gif'


class Success extends Component{
    submit=()=>{
        // console.log(this.props)
        this.props.history.push('/about');
    }
    render() {
        const header = '签署成功'
        // const { getFieldProps } = this.props.form;
        return (
            <div className={style.App}>
                <Nav {...this.props} header={header}></Nav>
            <div style={{marginTop:'40px'}}>
                <img src={dsa} alt='' />
                <div style={{width:'80%',margin:'20px auto'}}>
                    <p>签署成功!</p>
                    <p style={{textAlign:'left'}}>《补充协议书》已发送至您1301234578@163.com的邮箱中，请注意查收！</p>
                </div>
                
            </div>
            </div>
        );
    }
}

export default Success;