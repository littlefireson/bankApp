import React, { Component } from 'react';
import Nav from '../header/header';
import style from '../App.css';
import { Result, Icon } from 'antd-mobile';


class Success extends Component{
    submit=()=>{
        this.props.history.push('/about');
    }
    render() {
        const header = '签署成功'
        // const { getFieldProps } = this.props.form;
        return (
            <div className={style.App}>
                <Nav {...this.props} header={header}></Nav>
            <div className={style["result-example"]}>

                <Result
                    img={<Icon type="check-circle" className={style["spe"]} style={{ fill: '#1F90E6' }} />}
                    title="签署成功"
                    message={`《补充协议书》已发送至您${localStorage.email}的邮箱中，请注意查收！`}
                />        
                
            </div>
            </div>
        );
    }
}

export default Success;