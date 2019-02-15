import React, { Component } from 'react';
import { Button , InputItem ,List ,WingBlank, WhiteSpace } from 'antd-mobile';
import Nav from '../header/header';
import style from '../App.css';

const Item = List.Item;
const Brief = Item.Brief;

class PlanDetails extends Component{
    constructor(props){
        super(props)
    }
    submit=()=>{
        // console.log(this.props)
        this.props.history.push('/about');
    }
    render() {
        const header = '还款计划表'
        // const { getFieldProps } = this.props.form;
        return (
            <div className={style.App}>
            <div className={style['fenqi-fixed']}>
                <Nav {...this.props} header={header}></Nav>
                <div className={style.fenqiContent}>
                    <p>分期金额：<b>45678.56元</b></p>
                    <p>分期期数：12期</p>
                    <p>账单日：每月7日</p>
                </div>
            </div>
            <div className={style['fenqi-list']}>
                <List>
                    <Item>
                        <p>第一期：2019-1-25<span>4000.00元</span></p>
                        <div className={style['fenqi-list-content']}>
                            <p>本金：4000.00元</p>
                        </div>
                    </Item>
                    <Item>
                        <p>第二期：2019-1-25<span>4000.00元</span></p>
                        <div className={style['fenqi-list-content']}>
                            <p>本金：4000.00元</p>
                        </div>
                    </Item>
                    <Item>
                        <p>第三期：2019-1-25<span>4000.00元</span></p>
                        <div className={style['fenqi-list-content']}>
                            <p>本金：4000.00元</p>
                        </div>
                    </Item>
                    <Item>
                        <p>第四期：2019-1-25<span>4000.00元</span></p>
                        <div className={style['fenqi-list-content']}>
                            <p>本金：4000.00元</p>
                        </div>
                    </Item>
                    <Item>
                        <p>第五期：2019-1-25<span>4000.00元</span></p>
                        <div className={style['fenqi-list-content']}>
                            <p>本金：4000.00元</p>
                        </div>
                    </Item>
                    <Item>
                        <p>第六期：2019-1-25<span>4000.00元</span></p>
                        <div className={style['fenqi-list-content']}>
                            <p>本金：4000.00元</p>
                        </div>
                    </Item>
                    <Item>
                        <p>第七期：2019-1-25<span>4000.00元</span></p>
                        <div className={style['fenqi-list-content']}>
                            <p>本金：4000.00元</p>
                        </div>
                    </Item>
                    <Item>
                        <p>第八期：2019-1-25<span>4000.00元</span></p>
                        <div className={style['fenqi-list-content']}>
                            <p>本金：4000.00元</p>
                        </div>
                    </Item>
                    <Item>
                        <p>第九期：2019-1-25<span>4000.00元</span></p>
                        <div className={style['fenqi-list-content']}>
                            <p>本金：4000.00元</p>
                        </div>
                    </Item>
                    <Item>
                        <p>第十期：2019-1-25<span>4000.00元</span></p>
                        <div className={style['fenqi-list-content']}>
                            <p>本金：4000.00元</p>
                        </div>
                    </Item>
                    <Item>
                        <p>第十一期：2019-1-25<span>4000.00元</span></p>
                        <div className={style['fenqi-list-content']}>
                            <p>本金：4000.00元</p>
                        </div>
                    </Item>
                    <Item>
                        <p>第十二期：2019-1-25<span>4000.00元</span></p>
                        <div className={style['fenqi-list-content']}>
                            <p>本金：4000.00元</p>
                        </div>
                    </Item>
                </List>
            </div>
            </div>
        );
    }
}

export default PlanDetails;