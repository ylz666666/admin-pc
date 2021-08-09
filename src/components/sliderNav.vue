<template>

  <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
       <a-button
       class="button"
        type="primary"
        style="margin-bottom: 16px"
        @click="$store.dispatch('toggleCollapsed')"
      >
        <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
       <a-breadcrumb>
        <a-breadcrumb-item v-for="match in $route.matched" :key='match.meta.title'><a href="">{{match.meta.title}}</a></a-breadcrumb-item>
      </a-breadcrumb>
      <ul class="login">
        <li>欢迎{{$store.getters.userName}}<a-icon type="down" /></li>
        <li @click="change">退出</li>
      </ul>
   <div>
      <router-view />
   </div>
  </div>
 
 
</template>

<script>

export default {
methods:{
  change(){
    this.$store.dispatch('removeLogin');
    this.$router.push('/login');
  },
 
},

}
</script>

<style scoped>
.login{
  position: fixed;
  right: 0;
  top: 0;
}
</style>