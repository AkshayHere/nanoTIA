import axios from 'axios';
import {merge,isEmpty} from 'lodash'
// import NotificationPayLoad from 'components/NotificationPayload'
import {
    ADD_NOTIFICATION
} from 'redux/constants'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // Do something with response error
    // console.log(error.message);
    return Promise.reject(error);
});


const serverRequest = {


    /**
     * Send API request
     * @param  {url} url    url of endpoint excluding domain
     * @param  {object} payload   payload
     * @param  {object} config
     * 
     
     */
    api(url,payload,config,token,method) {

        let postData = payload
        let aConfig = merge({
            'Accept' : 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            withCredentials: true
        },config);

        if(!isEmpty(token) ){
            //use withCredentials for security
            //aConfig.headers = {'Authorization': 'Bearer ' + token}
        }
        
        if(method && method.toUpperCase() === 'GET'){
        
            return axios.get(url, aConfig)
            .then(response => {
                //console.log(response);
                return response;
            })
            .catch(error => {

            });
        }

        return axios.post(url, postData, aConfig)
            .then(response => {
                //console.log(response);
                return response;
            })
            .catch(error => {
            });
    },
}

export default serverRequest