import axios from 'axios';
import qs from 'qs';

let http = {
    get:'',
    post:''
}

http.post = (api,data)=>{
    let params = qs.stringify(data);
    return new Promise((resolve,rejects)=>{
        axios.post(api,params).then((res)=>{
            resolve(res)
        })
    })
}

http.get = (api,data)=>{
    let params = qs.stringify(data);
    return new Promise((resolve,rejects)=>{
        axios.post(api,params).then((res)=>{
            resolve(res)
        })
    })
}

export default http;