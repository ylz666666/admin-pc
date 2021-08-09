import axios from '../assets/utils/axios'
export function getProduct(param) {
    return axios.get('/category/all', { params:{param} })
}

 export function addProduct(params){
     return axios.post('/products/add',params) ;
 }
export function editProduct(params){
    return axios.put('/products/edit',params) ;
}