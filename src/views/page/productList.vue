<template>
  <div class="list">
    <serch @submit="getkind" :data="data" :list="list"/>
    <div ><a-button class="btn-add"><router-link  class="sb" :to="{name:'ProductAdd'}">新增商品</router-link></a-button></div>
    <froms :data="data" @edit="turns" @remove='dele' />
  </div>
</template>

<script>
import Froms from "../../components/froms.vue";
import serch from "../../components/serch.vue";
import Stores from "@/api/storeData";
import { getProduct } from "@/api/product.js";

export default {
  components: {
    serch,
    Froms,
  },
 
  data() {
    return {
      info: {},
      data: [],
      mapKind: {},
      list:[],
    };
  },
  methods: {
    // attack(){//点击事件 改变值
    //   this.$store.dispatch('setKeytime',new Date().getTime());
    //   // this.$store.state.keytime = new Date().getTime();
    //   // console.log('ssssssssss',this.$store.state.keytime,this.$route.matched)
      
    // },
  
    turns(recond){
       this.$router.push({
        name:'Productedit',
        params:{
            id:recond.id,
        }
        
      });
     },
    dele(recond){
     this.$confirm({
        title: '是否要删除 '+recond.title+' 该内容',
        content: '一个列表',
        okText: '确认',
        okType: '返回',
        cancelText: '返回',
        onOk:()=>{
          Stores.removeStore(recond).then(res =>{
  
            this.getDatas();
          })
            
           console.log('已经删除',this);
           
        },
        onCancel() {
          console.log('已经返回');
        },
      });
    },
    getkind(info) {
      this.info = info;
      this.getDatas();
    },
    getDatas() {
      Stores.getStore({
        ...this.info,
      }).then((res) => {
        
        this.data = res.data.map((ele) => {
          return {
            ...ele,
            mylive: this.mapKind[ele.category],
          };
        });
        
      });
    },
    getproduct() {
      getProduct().then((res) => {//获取商品列表数据
        res.data.forEach((element) => {
          this.list = res.data;
          this.mapKind[element.id] = element.name;
        });
      });
    },
  },
  created() {
    this.getproduct();
    this.getDatas();
    // Stores.getStore({
    //   ...this.info,
    // }).then((res) => {
    //   this.data = res.data.map((ele) => {
    //     return {
    //       ...ele,
    //       mylive: this.mapKind[ele.category],
    //     };
    //   });
    // });
  },
};
</script>

<style>
.list{
  position: relative;
}
.btn-add{
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
}

</style>