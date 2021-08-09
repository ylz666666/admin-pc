import axios from 'axios'
import Store from '../../store/index'
const intance = axios.create({
    baseURL: 'https://mallapi.duyiedu.com'
})

intance.interceptors.request.use(config => {
   
    if (config.url.includes('/passport')) {
        return config;
    } else {
        return {
            ...config,
            params: {
                ...config.params,
                appkey: Store.state.user.appkey,
            }

        }
    }

}, error => Promise.reject())
intance.interceptors.response.use(response => {
    if (response.data.status === 'fail') {
        return Promise.reject(response.data.msg);
    }

    return response.data.data;
}, error => Promise.reject());

export default intance;