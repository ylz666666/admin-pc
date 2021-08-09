<template>
  <div style="background-color: #ececec; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="8" v-for='arr in list' :key='arr'>
        <a-card :title="arr" :bordered="false">
          <p>{{arr}}</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
    data(){
     return{
        list:['商品总览','用户总览','销售总览']
     }
    }
}
</script>

<style>

</style>
