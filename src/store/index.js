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
   
  },
  getters:{
    userName(state){
      return state.user.username;
    },
    keytime(state){
      return state.keytime ;
    }
  },
  mutations: {
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
