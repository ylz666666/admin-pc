<template>
  <div class="home">
    <menu-v :key="key" />
    <div  >
       <slider-nav  />
    </div>
  
  </div>
</template>

<script>
import "@/assets/css/home.less";
import MenuV from "../../components/menu.vue";
import SliderNav from "../../components/sliderNav.vue";
export default {
  components: {
    MenuV,
    SliderNav,
  },

  data() {
    return {
     key:0,
    };
  },
  methods: {

  },

  
  watch:{
    $route(){
      this.key = new Date().getTime();  
    }
  // computed:{
  //     keytime(){//
  //        console.log('bbbbb',this.$store.state.keytime,this.$route.matched );
  //       const time = this.$store.state.keytime;
        
  //       return time;
  //     }
  // }
  }
};
</script>
