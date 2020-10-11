import axios from 'axios';
import config from '../_config/config';


export const webComunication = {
    get,
    post,
    put,
    deleteDetail
};

function get(apiEndpoint, payload){
    return axios.get(config.baseUrl+apiEndpoint, payload, getOptions()).then((response)=>{
        return response;
    }).catch((err)=>{
        console.log("Error in response");
        console.log(err);
    })
}

function post(apiEndpoint, payload){
    return axios.post(config.baseUrl+apiEndpoint, payload, getOptions()).then((response)=>{
        return response;
    }).catch((err)=>{
        console.log(err);
    })
}

function put(apiEndpoint, payload){
    return axios.put(config.baseUrl+apiEndpoint, payload, getOptions()).then((response)=>{
        return response;
    }).catch((err)=>{
        console.log(err);
    })
}

function deleteDetail(apiEndpoint){
    return axios.delete(config.baseUrl+apiEndpoint, getOptions()).then((response)=>{
        return response;
    }).catch((err)=>{
        console.log(err);
    })
}

function getOptions(){
    let options = {}; 
    if(localStorage.getItem('token')){
        options.headers = { 'x-access-token': localStorage.getItem('token') };
    }
    return options;
}