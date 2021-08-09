<template>
  <div>
    <router-link to='/'></router-link>
    <router-link to="/login"></router-link>

    <div class="contain">
      <router-view></router-view>
    </div>
  </div>

</template>
 
<script>
import Login from "./components/login.vue";
import Home from "./views/layout/Home";

export default {
  components: {
     Home,
    Login,
  },
};
</script>

<style>
</style>