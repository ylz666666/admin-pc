import axios from '@/assets/utils/axios'
export default{
    user(params){
        return axios.post('/passport/login',params);
     }
}
