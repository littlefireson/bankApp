import React, { Component } from 'react'
import { Button , List, Icon ,Pagination} from 'antd-mobile';
import Nav from '../header/header';
import style from '../App.css';
import WxImageViewer from 'react-wx-images-viewer';
import Imagesviewer from '../imageViewer/imageViewer';
import ZhangCheng from './zhangcheng';

import PDF from 'react-pdf-js';

const Item = List.Item;

class Plan extends Component{
    submit=()=>{
        this.props.history.push('/email');
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
          isOpen: false ,
          page:1,
          pages:27 
        }
    }
    onDocumentComplete(pages)  {
        this.setState({ page: 1, pages:pages });
    }
    onChange (page) {
        this.setState({
            page: page,
        });
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
    const benjin = 154185.16,lixi =14644.62,weiyuejin = 37581.15,fuli = 307.57;
    const zongji = benjin +lixi+weiyuejin+fuli;
    const zhehou = (zongji * 0.74).toFixed(2)
    return (
        <div className={style.App}>
            <Nav  {...this.props} header={header}></Nav>
            <div className={style['Top-div']}>
                <p className={style['Top-div-p']}>您的信用卡卡号为：6226 2100 1125 7934</p>
                <h3>减免后剩余应还（元）</h3>
                <b>154185.16</b>
                {/* <b>{zhehou}</b> */}
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
                        <p>本金<span>{benjin}</span></p>
                        <p>利息<span>{lixi}</span></p>
                        <p>违约金<span>{weiyuejin}</span></p>
                        <p>复利<span>{fuli}</span></p>
                    </div>
                    <p className={style['Top-div-content-list-total']}>
                        <span>共计：{zongji}</span>
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
                            <div>
                                <div style={{overflow:'scroll',height:600}}>
                                    <PDF file={require('../images/zhangzheng.pdf')} 
                                    onDocumentComplete={this.onDocumentComplete.bind(this)}
                                    page={this.state.page}
                                    className={style['pdf-view']}
                                    />
                                </div>
                                <Pagination  onChange={this.onChange.bind(this)} total={this.state.pages} current={this.state.page}/>
                            </div>
                            :''}
                            {this.state.config === 2?
                                 <div>
                                   <div style={{overflow:'scroll',height:600}}>
                                    <PDF file={require('../images/mingxi.pdf')} 
                                    onDocumentComplete={this.onDocumentComplete.bind(this)}
                                    page={this.state.page}
                                    className={style['pdf-view']}
                                    />
                                    </div>
                                 <Pagination  onChange={this.onChange.bind(this)} total={this.state.pages} current={this.state.page}/>
                                </div>
                            :''}
                            
                        </div>
                    </div>
                 
                </div>}
            <Button type="primary" onClick={this.submit}>下一步</Button>
        </div>
    )
        
  }
}
export default Plan;
