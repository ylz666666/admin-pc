import Vue from 'vue'
import Vuex from 'vuex'
import userMain from '../assets/utils/userCookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collapsed: false,
    user:userMain.getCookies(),
    list:[],
    keytime:new Date().getTime(),
    reduce:null,
   
  },
  getters:{
    userName(state){
      return state.user.username;
    },
    keytime(state){
      return state.keytime ;
    },
    reduce(state){  
      return state.reduce;
    }
  },
  mutations: {
    setReduce(state,datas){
      state.reduce = datas;
    },
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setKeytime(state,time){
      state.keytime = time ;
    },
    setUserInfo(state,userInfo){
      state.user = userInfo ;
    },
     removeLogin(state){
       userMain.removeCookies(state.user) ;
       state.user.username ='';
     },
     addList(state,addList){
      state.list =  addList ;
     }
  },
  actions: {
    setReduce({commit},datas){
      commit("setReduce",datas);
    },
    toggleCollapsed({commit}){
      commit('toggleCollapsed') ;
    },
    setUserInfo({commit},userInfo){
      commit('setUserInfo',userInfo);
        userMain.setCookies(userInfo);
        
    },
     removeLogin({commit}){
       commit('removeLogin') ;
     },
     addList({commit},addList){
       commit('addList',addList) ;
     },
     setKeytime({commit},time){
        commit('setKeytime',time) ;
     }
  },
  modules: {
  }
})
