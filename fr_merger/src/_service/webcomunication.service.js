import axios from 'axios';
import config from '../_config/config';


export const webComunication = {
    get,
    post,
    put,
    deleteDetail
};

function get(apiEndpoint, payload){
    return axios.get(config.baseUrl+apiEndpoint, getOptions(payload)).then((response)=>{
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

function getOptions(payload){
    let options = {}; 
    // if(localStorage.getItem('token')){
        // options.headers = { 'x-access-token': localStorage.getItem('token') };
        options.headers = { 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3lzdGVtIiwidXNlciI6dHJ1ZSwiZXhwIjoxNjAyNTAzNjE5LCJpYXQiOjE2MDI0OTc2MTksImlzcyI6ImdvbGFuZyJ9.4ifSCXqrX8RIp83lGtY8ezJr8-_9uhF2qPTGpNejJYo' };
        
    // }
    options.params = payload ? payload.params : {};
    return options;
}