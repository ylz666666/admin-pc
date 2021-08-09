<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[ this.$route.matched[1]?this.$route.matched[1].name:'']" 
      :default-open-keys="[$route.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
      
    >
    <template v-for="menu in $store.state.list" >
      <a-sub-menu v-if="!menu.meta.hidden" :key="menu.name" >
        <span slot="title"
          ><a-icon  :type="menu.icon" /><span>{{menu.meta.title}}</span></span
        >
        <template v-for="child in menu.children">
        <a-menu-item v-if="!child.meta.hidden"  :key="child.name"><router-link :to="{name:child.name}"><a-icon  :type="child.icon" />{{child.meta.title}}</router-link></a-menu-item> 
        </template>
      </a-sub-menu>
      </template>
     
    </a-menu>
  </div>
</template>

<script>
export default {
  // computed:{
  //   state(){
  //     return
  //   }
  // }
};
</script>

<style>
</style>