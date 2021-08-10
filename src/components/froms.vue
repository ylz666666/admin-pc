<template>
  <a-table :columns="columns" :data-source="tableData">
    <div slot="operation" slot-scope="text, record"  >
      <button class="edit" @click="edit(record)">编辑</button>
      <button class="remove" @click='remove(record)' type="dashed" >删除</button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
  },
  {
    title: "类目",
    dataIndex: "mylive",
    key: "mylive",
    ellipsis: true,
  },
  {
    title: "预售价格",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "折扣价格",
    dataIndex: "price_off",
    key: "price_off",
  },
  {
    title: "标签",
    dataIndex: "tags[0]",
    key: "tags[0]",
    ellipsis: true,
  },
  {
    title: "限制购买数量",
    dataIndex: "inventory",
    key: "inventory",
    ellipsis: true,
  },
  {
    title: "上架状态",
    dataIndex: "status",
    key: "status",
    customRender:function(text,record){
      return record.status == 1 ? '上架':'下架';
    }
  },
  {
    title: "操作",
    width:'150px',
    dataIndex: "operation",
    key: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

import {mapState} from 'vuex';
export default {
  props:['data'],
  data() {
    return {
      columns,
    };
  },
  methods:{
    edit(recond){
      this.$emit('edit',recond);
    },
    remove(recond){
      this.$emit('remove',recond);
      
    }
  },
 
  computed: {
    ...mapState(['reduce']),
    tableData(){//映射接收夫类数据进行处理
    if(this.reduce){
      return this.reduce.map(ele=>{
        return {
          ...ele,
          key:ele.id
        }
      })
    }
      return this.data.map(ele=>{
        return {
          ...ele,
          key:ele.id
        }
      })
    }
     // list() {
      
      //  arr = this.data.filter(ele =>{
      //    return !this.$store.state.serchInfo.kind ||ele.tags === this.$store.state.serchInfo.kind ;
      //   }).filter(ele =>{
      //     return !this.$store.state.serchInfo.seach||ele.title.indexOf(this.$store.state.serchInfo.seach) > 0;
      //   })
      // console.log('sb',this.data);
      // arr = this.data.filter((ele) => {
      //    console.log(ele.title.indexOf(this.$store.state.serchInfo.seach));
      //     return !this.$store.state.serchInfo.seach||ele.title.indexOf(this.$store.state.serchInfo.seach) > 0;
        
      // });
      
    //   return arr;
    // },
    
  },
  
};


</script>
<style scoped>
.remove{
   margin-left:10px
 }
</style>