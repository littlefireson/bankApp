import React, { Component } from 'react'
import { Button , List, Icon} from 'antd-mobile';
import Nav from '../header/header';
import style from '../App.css';
import WxImageViewer from 'react-wx-images-viewer';
import Imagesviewer from '../imageViewer/imageViewer';
import ZhangCheng from './zhangcheng';
const Item = List.Item;

class Plan extends Component{
    submit=()=>{
        this.props.history.push('/signIn');
    }
    originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;
    constructor(props) {
        super(props);
        this.state = {
        show: false,
        config:0,
        imags: [
            require("../images/heyue.jpg"),
          ],
          index: 0,
          isOpen: false 
        };
    }
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
    const header = "还款计划";
    const {
        index,
        isOpen
      } = this.state;
    return (
        <div className={style.App}>
            <Nav  {...this.props} header={header}></Nav>
            <div className={style['Top-div']}>
                <p className={style['Top-div-p']}>您的信用卡卡号为：6217000012345678945</p>
                <h3>减免后剩余应还（元）</h3>
                <b>4561.23</b>
                <List className="my-list">
                    <Item arrow="horizontal" multipleLine onClick={() => {
                       this.props.history.push('/planDetails')
                    }}>
                        查看分期计划表 
                    </Item>
                </List>
                <div className={style['Top-div-content']}>
                    <p className={style['Top-div-content-title']}>减免前应还款金额</p>
                    <div className={style['Top-div-content-list']}>
                        <p>本金<span>42354.00</span></p>
                        <p>利息<span>42354.00</span></p>
                        <p>违约金<span>42354.00</span></p>
                        <p>复利<span>42354.00</span></p>
                    </div>
                    <p className={style['Top-div-content-list-total']}>
                        <span>共计：5643.89 元</span>
                    </p>
                </div>
            </div>
            <div className={style['Bottom-div']}>

            
            <p style={{textAlign:'left',marginLeft:'20px'}}>其他材料</p>
            <List className="my-list">
                    <Item arrow="horizontal" multipleLine onClick={() => {
                        this.setState({
                            show: true,
                            config:0
                          });
                    }}>
                    《信用卡领用合约》 
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {
                        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
                        this.setState({
                          show: true,
                          config:1
                        });
                    }}>
                    《信用卡章程》 
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {
                        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
                        this.setState({
                          show: true,
                          config:2
                        });
                    }}>
                    信用卡交易记录 
                    </Item>
                </List>
                </div>
                {this.state.show&&<div className={style['fenqi-modal']}>
                    <div className={style['header']}>
                        <Icon className={style['close-modal']} type='cross' onClick={()=>{
                            this.setState({
                                show:false
                            })
                        }}></Icon>
                        <p>{this.state.config === 0?"《信用卡领用合约》":""}
                        {this.state.config === 1?"《信用卡章程》":""}
                        {this.state.config === 2?"信用卡交易记录":""}
                        </p>
                    </div>
                    <div className={style['wrapper']}>
                        <div>
                            {this.state.config === 0?
                                <div className="app">
                                <div className="img-list">
                                    {
                                    this.state.imags.map((item, index) => {
                                        return <div className="img" key={item}>
                                        <img src={item} alt="" onClick={this.openViewer.bind(this, index)} width="100%" height="auto" className=""/> 
                                        </div>
                                    })
                                    }
                                </div>
                                {
                                    isOpen ? <WxImageViewer zIndex={1000} onClose={this.onClose} urls={this.state.imags} index={index}/> : ""
                                }
                                </div>
                                :''}
                            {this.state.config === 1?
                            <ZhangCheng />
                            :''}
                            {this.state.config === 2?
                                <Imagesviewer urls={[require('../images/jiaoyi1.png'),require('../images/jiaoyi2.png')]} />
                            :''}
                            
                        </div>
                    </div>
                
                </div>}
            <Button type="primary" onClick={this.submit}>查看并签署补充协议</Button>
        </div>
    )
        
  }
}
export default Plan;
