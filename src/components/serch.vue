<template>
  <a-form-model
    layout="inline"
    :model="serchInfo"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item label="请搜索关键字">
      <a-input v-model="serchInfo.searchWord" placeholder="请输入关键字">
        <a-icon slot="prefix" type="input" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目">
      <!-- <a-input v-model="serchInfo.password" type="selected" placeholder="请选择商品类目">
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input> -->

      <a-select
        placeholder="请选择你的商品类目"
        style="width: 120px"
        @change="handleChange"
        allowClear
      >
        <a-select-option v-for="li in lists" :key="li.name" :value="li.name">
          {{ li.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item>
      <a-button type="primary" html-type="submit"> 搜索 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { getProduct } from "@/api/product.js";
export default {
  props: ["data", "list"],
  data() {
    return {
      serchInfo: {
        searchWord: "",
        category: 0,
      },
    };
  },
  methods: {
    handleSubmit(e) {
      this.$emit("submit", this.serchInfo);
      let datas = this.data;
      if (this.serchInfo.category) {
        datas = datas.filter(
          (item) => item.category == this.serchInfo.category
        );
      }
      if (this.serchInfo.searchWord) {
        datas = datas.filter(
          (item) =>
            item.desc.indexOf(this.serchInfo.searchWord) >= 0 ||
            item.title.indexOf(this.serchInfo.searchWord) >= 0
        );
      }
      this.$store.dispatch("setReduce", datas);
    },

    handleChange(val) {
      if (!val) {
        return;
      }
      this.list.filter((ele) => {
        if (ele.name === val) {
          this.serchInfo.category = ele.id;
        }
      });
    },
  },
  computed: {
    lists() {
      return this.list.filter((item) => {
        return item.name;
      });
    },
  },
};
</script>
