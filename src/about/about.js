import React, { Component } from 'react'
import { Button , Flex,InputItem ,WingBlank, WhiteSpace ,List,Picker, DatePicker,Toast,ActivityIndicator,Checkbox} from 'antd-mobile';
import Nav from '../header/header';
import style from '../App.css';
import ImageCrop from '../imageCrop/imageCrop'
import http from '../sever'
const AgreeItem = Checkbox.AgreeItem;
const sexs = [
    {
        label:
        (<div>
        <span>男</span>
        </div>),
        value: 0,
    },
    {
        label:
        (<div>
        <span>女</span>
        </div>),
        value: 1,
    },
];
var nations = ["汉","蒙古","回","藏","维吾尔","苗","彝","壮","布依","朝鲜","满","侗","瑶","白","土家",  
    "哈尼","哈萨克","傣","黎","傈僳","佤","畲","高山","拉祜","水","东乡","纳西","景颇","柯尔克孜",  
    "土","达斡尔","仫佬","羌","布朗","撒拉","毛南","仡佬","锡伯","阿昌","普米","塔吉克","怒", "乌孜别克",  
    "俄罗斯","鄂温克","德昂","保安","裕固","京","塔塔尔","独龙","鄂伦春","赫哲","门巴","珞巴","基诺"]; 

    // const nowTimeStamp = Date.now();
    // const now = new Date(nowTimeStamp);
    // GMT is not currently observed in the UK. So use UTC now.
    // const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    
    // // Make sure that in `time` mode, the maxDate and minDate are within one day.
    // let minDate = new Date(-2208977672);
    // const maxDate = new Date(nowTimeStamp + 1e7);
    // const defaultDate = new Date (631167071);
    // function formatDate(date) {
    //   /* eslint no-confusing-arrow: 0 */
    //   const pad = n => n < 10 ? `0${n}` : n;
    //   const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    //   const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    //   return `${dateStr} ${timeStr}`;
    // }
    
    // // If not using `List.Item` as children
    // // The `onClick / extra` props need to be processed within the component
    // const CustomChildren = ({ extra, onClick, children }) => (
    //   <div
    //     onClick={onClick}
    //     style={{ backgroundColor: '#fff', height: '45px', lineHeight: '45px', padding: '0 15px' }}
    //   >
    //     {children}
    //     <span style={{ float: 'right', color: '#888' }}>{extra}</span>
    //   </div>
    // );
class About extends Component{
    constructor(props){
        super(props)
        this.state = {
            animating: false,
            cols: 1,
            show: false,
            config:{},
            phoneValue:window.localStorage.phone?window.localStorage.phone:"",
            codeValue:"",
            phoneError:false,
            codeShow:false,
            codeMsg:"获取验证码",
            maxtime:59,
            codeClick:true,
            imgUrl1:'',
            imgUrl2:'',
            nameValue:'',
            sexValue:[],
            nationValue:[],
            adressValue:'',
            cardIdValue:'',
            birthdayValue:"",
            startDate:'',
            endDate:'',
            bankCardValue:'',
            imgFlag1:false,
            imgFlag2:false,
            changqi:false,
            birthday:''
        }
    }
    submit=()=>{

        let {nameValue,sexValue,nationValue,birthdayValue,adressValue,
            cardIdValue,startDate,endDate,bankCardValue,phoneValue,codeValue,changqi,imgFlag1,imgFlag2} = this.state
        debugger;
        if(!imgFlag1){
            Toast.fail('请上传或拍摄身份证正面照片');
            return false;
        }   
        if(!imgFlag2){
            Toast.fail('请上传或拍摄身份证反面照片');
            return false;
        }   
        if(nameValue === ''){
            Toast.fail('请输入姓名');
            return false;
        }   
        if(sexValue === ''){
            Toast.fail('请选择性别');
            return false;
        }   
        if(nationValue === ''){
            Toast.fail('请选择民族');
            return false;
        }   
        if(birthdayValue === ''){
            Toast.fail('请选择出生日期');
            return false;
        }   
        if(adressValue === ''){
            Toast.fail('请输入地址');
            return false;
        }   
        if(cardIdValue === ''){
            Toast.fail('请输入身份证号');
            return false;
        }   
        if(startDate === ''){
            Toast.fail('请输入有效期开始时间');
            return false;
        }   
        if(endDate === ''&& !changqi){
            Toast.fail('请输入有效期结束时间');
            return false;
        }  
        
        if(bankCardValue === ''){
            Toast.fail('请输入银行卡号');
            return false;
        }  
        if(codeValue ===""){
            Toast.fail('请输入验证码');
            return false;
        }
        if(codeValue !== '8888'){
            Toast.fail('验证码错误');
            return false;
        }
        window.localStorage.setItem('yuPhone',phoneValue)
        const year = birthdayValue.getFullYear();
        const month = birthdayValue.getMonth()+1;
        const day = birthdayValue.getDate();
        var obj = {
            name:nameValue,
            sex:sexValue===0?'男':'女',
            nation:nations[nationValue],
            birthday:year+'-'+month+'-'+day,
            address:adressValue,
            cardId:cardIdValue,
        }
        obj = JSON.stringify(obj);
        window.localStorage.setItem('xinxi',obj);

        this.props.history.push('/plan');
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
    onChange = (value) => {
        this.setState({
            value,
            });
        };

    handleImg=(val,type)=>{
        if(val){
            this.setState({ animating: !this.state.animating });
            http.post('https://api-cn.faceplusplus.com/cardpp/v1/ocridcard', {
                api_key: 'PSAzPu3GmUPiWe54pqsZ_f5t-03QNLbw',
                api_secret: 'T-Nt7ZtDsinbcbWvy_1TAcl4NXh5HSYe',
                image_base64: val?val:''
              })
              .then((response)=>{
                  if(response.data.cards[0].side==='front'){
                    var index = nations.indexOf(response.data.cards[0].race);

                    this.setState({
                        imgFlag1:true,
                        nameValue:response.data.cards[0].name,
                        sexValue:response.data.cards[0].gender==='男'?[0]:[1],
                        adressValue:response.data.cards[0].address,
                        cardIdValue:response.data.cards[0].id_card_number,
                        nationValue:index!==-1?[index]:[],
                        birthdayValue:new Date(response.data.cards[0].birthday),
                        animating: !this.state.animating
                        })
                    }else{
                    var startDate = new Date(response.data.cards[0].valid_date.split('-')[0].replace(/\./g, "/")),endDate
                    if(response.data.cards[0].valid_date.split('-')[1] === '长期'){
                        endDate = "长期"
                        this.setState({
                            imgFlag2:true,
                            startDate:startDate,
                            endDate:endDate,
                            changqi:true,
                            animating: !this.state.animating
                        })

                    }else{
                        endDate = new Date(response.data.cards[0].valid_date.split('-')[1].replace(/\./g, "/"))
                        this.setState({
                            imgFlag2:true,
                            startDate:startDate,
                            endDate:endDate,
                            animating: !this.state.animating
                        })
                    }
                  }
                 
              })
              .catch(()=>{
                this.setState({
                    animating: !this.state.animating
                })
                Toast.fail('请上传正确的身份证照片');
              });
        }else{
            if(type===0){
                this.setState({
                    nameValue:"",
                    sexValue:"",
                    adressValue:"",
                    cardIdValue:"",
                    nationValue:"",
                    birthdayValue:""
                })
            }else{
                this.setState({
                    startDate:'',
                    endDate:'',
                    changqi:false
                })
            }
           
        }
        
    }
    render() {
        let {nameValue,adressValue,cardIdValue,bankCardValue} = this.state;
    const header = "请完善信息"
    const nationsCol = nations.map((item,i)=>{
        return {
            label:
            (<div>
                <span>{item}</span>
                </div>),
                value: i,
            }
            
        }) ;
    
    return (
        
        <div>
            <Nav  {...this.props} header={header}></Nav>
            {(!this.state.imgFlag1 ||!this.state.imgFlag2)&&<p className={style['cardIdTitle']}>请拍摄实体身份证或上传身份证照片，并录入信息</p>}
            <Flex>
                <Flex.Item className={style['cardId']}>
                    <ImageCrop side='front' changeImg = {this.handleImg.bind(this)}/>
                    {!this.state.imgFlag1 && <span>请上传身份证正面</span>}
                </Flex.Item>
                <Flex.Item className={style['backCardId']}>
                    <ImageCrop side='back' changeImg = {this.handleImg.bind(this)}/>
                    {!this.state.imgFlag2 && <span>请上传身份证反面</span>}
                </Flex.Item>
            </Flex>
            <WhiteSpace/>
            <WingBlank  size="md">
                    <InputItem
                        type='text'
                        placeholder="请输入您的姓名"
                        clear
                        onChange={value => this.setState({ nameValue:value })}
                        value={nameValue}
                    >姓名
                    </InputItem>
                </WingBlank>
                
                
                <WingBlank  size="md">
                    <Picker
                    data={sexs}
                    value={this.state.sexValue}
                    cols={1}
                    onChange={(value)=>{
                        this.setState({
                        sexValue: value,
                      });}}
                    >
                    <List.Item arrow="horizontal">性别</List.Item>
                    </Picker>
                </WingBlank>
                
                <WingBlank  size="md">
                    <Picker
                    data={nationsCol}
                    value={this.state.nationValue}
                    cols={1}
                    onChange={(nations)=>{
                        this.setState({
                            nationValue: nations,
                      });}}
                    >
                    <List.Item arrow="horizontal">民族</List.Item>
                    </Picker>
                </WingBlank>
                
                <WingBlank  size="md">
                <DatePicker
                    mode="date"
                    title="出生日期"
                    extra="请选择日期"
                    value={this.state.birthdayValue}
                    onChange={ (date)=>{
                        this.setState({ birthdayValue:date })} }
                    minDate = {new Date(1970, 1, 1, 0, 0, 0)}
                    >
                    <List.Item arrow="horizontal">出生日期</List.Item>
                </DatePicker>
                </WingBlank>

                
                <WingBlank  size="md">
                <InputItem
                    type='text'
                    placeholder="请输入您的地址"
                    clear
                    onChange={value => this.setState({ adressValue:value })}
                    value={adressValue}
                >住址
                </InputItem>
                </WingBlank>
                
                <WingBlank  size="md">
                <InputItem
                    type='number'
                    placeholder="请输入您的身份证号"
                    maxLength={18}
                    clear
                    onChange={value => this.setState({ cardIdValue:value })}
                    value = {cardIdValue}
                >身份证号
                </InputItem>
                </WingBlank>
                
                <WingBlank  size="md">
               
                <Flex className={style['my-radio-box']} style={{ padding: '15px' }}>
                    <Flex.Item >证件有效期</Flex.Item>
                    <Flex.Item>
                    <AgreeItem data-seed="logId"
                    checked={this.state.changqi}
                    onChange={() =>{
                        this.setState({changqi:!this.state.changqi,endDate:""})}}>
                         <a >长期</a>
                    </AgreeItem>
                    </Flex.Item>
                </Flex>
                <Flex className={style['qixian']}>
                    <Flex.Item>
                        <DatePicker
                            mode="date"
                            title="开始日期"
                            extra="请选择开始日期"
                            value={this.state.startDate}
                            onChange={date => this.setState({ startDate:date })}
                            minDate = {new Date(1970, 1, 1, 0, 0, 0)}
                            >
                            <List.Item arrow="horizontal"></List.Item>
                        </DatePicker>
                    </Flex.Item>
                    <Flex.Item>
                        {!this.state.changqi?<DatePicker
                            mode="date"
                            title="结束日期"
                            extra="请选择结束日期"
                            value={this.state.endDate}
                            onChange={date => this.setState({ endDate:date })}
                            minDate = {new Date(1970, 1, 1, 0, 0, 0)}
                            >
                            <List.Item arrow="horizontal">    </List.Item>
                        </DatePicker>:
                        <InputItem disable={true}>长期</InputItem>
                    }
                    </Flex.Item>
                </Flex>
                
                
                </WingBlank>

                <WhiteSpace size="lg" />
                <WingBlank  size="md">
                <InputItem
                    type='bankCard'
                    placeholder="请输入您名下的银行卡号"
                    clear
                    onChange={value => this.setState({ bankCardValue:value })}
                    value={bankCardValue}
                >银行卡号
                </InputItem>
                </WingBlank>
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
                                    this.setState({
                                        maxtime:59,
                                    }, ()=> {
                                        this.countDown();
                                    })
                                }else{
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
                <WingBlank  size="md">
                <InputItem
                    type='number'
                    placeholder="请输入您收到的验证码"
                    clear
                    maxLength={4}
                    onChange={value => this.setState({ codeValue:value })}
                    value={this.state.codeValue}
                    // moneyKeyboardAlign="left"
                    // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                >验证码
                </InputItem>
                </WingBlank>

                <WhiteSpace size="lg" />
                <WingBlank  size="md">
                    <Button type="primary" onClick={this.submit}>提交</Button>
                </WingBlank>
                <ActivityIndicator
                toast
                text="加载中..."
                animating={this.state.animating}
              />
        </div>
    )
        
  }
}
export default About;