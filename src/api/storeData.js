import axios from "../assets/utils/axios"

export default {
    getStore(param){
        return axios.get('/products/all',{params:{param}}) 
    },
    removeStore(params){
        return axios.delete('/products/'+ params.id);
    },
    lookStore(params){
        return axios.get('/products/' + params.id);
    }
}
