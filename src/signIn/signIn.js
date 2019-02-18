import React, { Component } from 'react';
import { Button  ,WingBlank, Toast ,Modal,InputItem} from 'antd-mobile';
import Nav from '../header/header';
import style from '../App.css';
import Input from 'antd-mobile/lib/input-item/Input';

const prompt = Modal.prompt;
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
        return el;
        }
        el = el.parentElement;
    }
    return null;
}
class SignIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            codeMsg:"获取验证码",
            maxtime:59,
            codeClick:true,
            modal1: false,
            inputValue:''
        }

    }
    countDown(){    
        console.log('count')
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
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
        if(this.state.codeClick){
            this.countDown();
        };
    }
    onClose = key => () => {
    this.setState({
        [key]: false,
    });
    }
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    render() {
        const header = '签署补充协议'
        console.log(this.state.codeMsg)
        const {inputValue}  = this.state;
        // const { getFieldProps } = this.props.form;
        return (
            <div>
            <div className={style['fenqi-fixed']}>
                <Nav {...this.props} header={header}></Nav>
            </div>
            <div className={style['signIn-content']}>
                <h3 style={{textAlign:'center'}}>补充协议书</h3>
                <p>
                    甲方（银行）： 中国民生银行股份有限公司信用卡中心 ，住所：                    , 社会统一信用代码：                     ，负责人：            ，职务：               ，身份证号：                   ，联系电话：                ，电子邮箱：          。
                </p>
                <p>
                    乙方（持卡人）：           ，性别：        ，民族：        ，出生日期：                 ，身份证号：                    ，住所：                      ，联系电话：                ，电子邮箱：               。
                </p>
                <p>
                    乙方于 2013  年 7 月 15 日，提交申请了中国民生银行“民生理财白金信用卡”。经审核中国民生银行股份有限公司信用卡中心予以发卡，卡号                      。乙方在    年  月  日进行了卡片的激活，确认并同意了《中国民生银行民生信用卡章程》以及《民生信用卡（个人卡）领用合约》。
                </p>
                <p>一、欠款金额</p>
                <p>自    年  月  日起，乙方使用信用卡消费后，对信用卡欠款不予清偿，经中国民生银行多次催收，乙方仍然拒不还款。截止至     年    月    日止，乙方尚欠付信用卡账单本金        元，利息        元，复利        元，违约金        元，手续费        元，共计        元。</p>
                <p>二、还款计划</p>
                <p>经甲乙双方协商，乙方依然有强烈的还款意愿，甲方同意对乙方未按时还款后产生的利息及相关费用进行减免，以促使乙方尽快还款。具体约定如下：</p>
                <p>1、乙方尚欠信用卡逾期本金        元。</p>
                <p>2、乙方尚欠信用卡逾期利息        元。</p>
                <p>3、对乙方其余尚欠的复利、违约金、手续费等相关费用进行免除收取。</p>
                <p>三、还款方式及还款日期的约定</p>
                <p>1、还款方式：分期还款；</p>
                <p>2、分期还款期数：36期；</p>
                <p>3、还款期限：自2019年1月17日至2021年12月17日止；首次还款日期为2019年1月17日，末次还款日期为2021年12月17日；</p>
                <p>4、每期还款金额        元（计算方法：以本协议第二条第1、2款逾期本金及利息总额/分期期数）。</p>
                <p>四、逾期还款的约定</p>
                <p>1、乙方若未按照《补充协议》第二条约定每期按时、足额进行还款，则乙方应根据本协议第二条第1、2款本金和利息总额        元，作为信用卡欠款本金，以24%/年的标准收取逾期还款利息，并且需要支付至乙方实际还款之日至；</p>
                <p>2、乙方的逾期还款将首先用于偿还本协议约定的应由乙方承担的各项费用及实现债权的费用（以下统称为“费用”，如有），包括但不限于仲裁费、仲裁服务费、律师代理费、催收费用等，剩余款项按照逾期利息、借款利息、借款本金的先后顺序支付，且甲方有权对前述顺序作出合理调整。</p>
                <p>五、协议的解除</p>
                <p>1、如乙方任意一期本金和利息出现逾期，包括不完全履行的情形，甲方即有权单方解除该协议；</p>
                <p>2、甲方与乙方之间关于争议解决、协议解除或终止的约定，可通过电子邮件、手机短信等方式进行修改或增减、变更，自甲方发出之日起，对于争议解决、协议解除或终止方可生效；</p>
                <p>3、乙方在逾期还款后的追讨过程中有逃避、拒绝沟通或者拒绝承认欠款事实等恶意行为的；</p>
                <p>4、乙方违约后，甲方有权要求乙方一次性偿还本协议中的全部本金、利息及逾期利息。</p>
                <p>六、争议解决及法律适用</p>
                <p>1、甲乙双方同意，因本合同引起的或与本合同有关的任何争议均提交海南仲裁委员会按照该会现行的仲裁规则进行网络仲裁，采用电子送达方式送达仲裁文书，并以本合同载明的双方电子邮箱及电话号码为电子送达地址，合同载明的双方地址为线下仲裁文书及司法文书的送达地址；</p>
                <p>2、如果由于各种原因导致不能电子送达法律文书，则可以采用邮政快递的方式邮寄本协议首部当事人填写的地址送达法律文书。如果未填写地址，以身份证记载地址为准送达法律文书。邮寄的快递公司不限，一经发送视为送达；</p>
                <p>3、若因乙方原因（包括但不限于任意提出异议、违约等）使纠纷进入仲裁程序，由此产生的所有费用（包括但不限于仲裁费、律师费、差旅费、公证费、评估费、拍卖费、执行费、公告费、网络仲裁技术服务费等），均由乙方承担；</p>
                <p>4、甲乙双方确认并同意：仲裁机构对合同争议做出裁决后，仲裁当事人任何一方可以将裁决书、调解书在第三方平台向全社会公开，并向征信机构报告违约事项。</p>
                <p>七、其他</p>
                <p>1、本协议是对原《中国民生银行民生信用卡章程》以及《民生信用卡（个人卡）领用合约》的补充，如果本协议与原章程、合约不一致，以本协议为准；</p>
                <p>2、在本《补充协议》后附上乙方《民生理财白金信用卡》、《中国民生银行民生信用卡章程》、《民生信用卡（个人卡）领用合约》、《交易明细》、《账单明细》、《分期活动细则》、《分期合同》等；</p>
                <p>3、本协议为电子文本合同，以自动签章认证的形式生成，2005年4月1日实施的《中华人民共和国电子签名法》以法律的形式确定了“电子签名”的有效性，在此各乙方承诺对自动签章认证所生成的电子协议予以认可，并自愿承担相应的法律责任；</p>
                <p>4、本合同一式贰份，双方各持壹份，签署后立即生效。（以下无正文）</p>
                <p>甲方：                                         乙方：</p>
                <p> 2018年12月17日                               2018年12月17日</p>
            </div>
                <div className={style['fixed-bottom']}>
                    <WingBlank>
                    <Button type="primary" onClick={this.showModal('modal1')}>确认签署补充协议</Button>
        {/* <WhiteSpace /> */}
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="请输入验证码"
          footer={[{ text: 'Ok', onPress: () => { 
            setTimeout(() => {
                        if(inputValue !== ''){
                            if(inputValue === '8888'){
                            this.onClose('modal1')();
                            this.props.history.push('/success')
                            }else{
                            Toast.info('验证码错误', 1);
                        }
                    }else{
                        Toast.info('请输入验证码', 1);
                    }
                    }, 1000);  
             } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          afterClose={() => { alert('afterClose'); }}
        >
          <div style={{ height: 100, overflow: 'scroll' }}>
            {this.state.codeMsg}
            <div>
                <div className="sign-input">
                    <label>
                        <InputItem 
                        onChange={(value)=>{
                            this.setState({
                                inputValue:value
                            })
                        }} 
                        value={inputValue}
                        maxLength={4}
                        ></InputItem>
                    </label>
                </div>
            </div>
          </div>
        </Modal>
                        {/* <Button type="primary" onClick={()=>{this.showModal('modal1')}}>
                            确认签署补充协议
                        </Button>
                        <Modal
                            visible={this.state.modal1}
                            // transparent
                            // maskClosable={false}
                            // onClose={this.onClose('modal1')}
                            title='请输入验证码'
                        //     footer={[{ text: 'Ok', onPress: () => {setTimeout(() => {
                        //         if(inputValue !== ''){
                        //             if(inputValue === '8888'){
                        //             this.props.history.push('/success')
                        //             }else{
                        //             Toast.info('验证码错误', 1);
                        //         }
                        //     }else{
                        //         Toast.info('请输入验证码', 1);
                        //     }
                        //     }, 1000);
                        // } }]}
                            // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                            // afterClose={() => { alert('afterClose'); }}
                            >
                            <div style={{ height: 100, overflow: 'scroll' }}>
                                scoll content...<br />
                                scoll content...<br />
                                scoll content...<br />
                                scoll content...<br />
                                `${this.state.codeMsg}`
                                <Input value={inputValue} />
                            </div>
                        </Modal> */}
                        {/* <Button type="primary" onClick={() => {
                            if(this.state.codeClick){
                                this.countDown();
                            };
                            prompt(
                        '请输入验证码',
                        React.createElement('h1', {id: 'recipe', 'data-type': 'title'}, `${this.state.codeMsg}`),
                        
                        [
                            { text: '取消' },
                            {
                                text: '提交',
                                
                                onPress: value => new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        if(value !== ''){
                                            if(value === '8888'){
                                            resolve();
                                            this.props.history.push('/success')
                                            }else{
                                            reject();
                                            Toast.info('验证码错误', 1);
                                        }
                                    }else{
                                        reject();
                                        Toast.info('请输入验证码', 1);
                                    }
                                    }, 1000);
                                }),
                              },

                        ],
                        'default', null,
                        )}}>确认签署补充协议</Button> */}
                    </WingBlank>
                </div>
            </div>
        );
    }
}

export default SignIn;