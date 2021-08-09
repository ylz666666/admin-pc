<template>
  <div>
    <div class="header">
      <a-steps :current="current" class="header-steps">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div class="steps-content">
      <steps
        :categoryList="categoryList"
        @submit="info"
        v-if="current === 0"
        :form="form"
      />
      <sale-info
        :form="form"
        v-if="current === 1"
        @prev="prev"
        @two="infotwo"
      />
    </div>
  </div>
</template>

<script>
import steps from "../../components/steps.vue";
import saleInfo from "../../components/saleInfo";
import { getProduct, addProduct, editProduct } from "@/api/product";
import Store from "@/api/storeData";

export default {
  components: {
    steps,
    saleInfo,
  },
  created() {
    getProduct().then((res) => {
      this.categoryList = res.data;
    });
    if (this.$route.params.id) {
      Store.lookStore(this.$route.params).then((res) => {
        this.form = res;
      });
    }
  },
  data() {
    return {
      current: 0,
      form: {
        title: "",
        desc: "",
        category: "",
        tags: "",
        c_item: [],
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: "",
        images: [],
      },
      categoryList: [],
      categoryItems: [],
      steps: [
        {
          title: "请填写商品基本信息",
          content: "First-content",
        },
        {
          title: "填写商品销售信息",
          content: "Second-content",
        },
      ],
    };
  },

  methods: {
    info(form) {
      this.form = {
        ...this.form,
        ...form,
      };
      // for (let i = 0; i < this.form.images.length; i++) {
      //   if (this.form.images[i]) {
      //       this.fileList.push({
      //         ...this.obj,
      //         uid: i+'',
      //         url: this.form.images[i],
      //       });

      //   }
      // }
      this.current++;
    },
    infotwo(form) {
      this.form = {
        ...this.form,
        ...form,
      };
      if (this.current == 1) {
        if (this.$route.params.id) {
          editProduct(this.form).then(res=> {
            console.log(res);
            this.$router.push({
              name: "ProductList",
            });
          });
        } else {
          addProduct(this.form).then((res) => {
            this.$router.push({
              name: "ProductList",
            });
          });
        }
      }
      this.current--;
    },
    prev() {
      this.current--;
    },
  },
};
</script>

<style scoped>
.header-steps {
  width: 50%;
  margin: 20px auto;
}
.content {
  margin: 0 auto;
}
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
</style>