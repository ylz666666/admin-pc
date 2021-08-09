import Cookies from 'js-cookie'
export default {
    setCookies(user) {
        for (const key in user) {
            Cookies.set(key,user[key]) ;
        }
    },
    getCookies(){
        return{
            username:Cookies.get('username'),
            appkey:Cookies.get('appkey'),
            role:Cookies.get('role'),
            email:Cookies.get('email'),
        }
    },
    removeCookies(user){
        for (const key in user) {
         Cookies.remove(key,user[key]) ;
        }
    }

}