<template>
  <div>
    <a-form-model
      class="content"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 15 }"
      ref="ruleForm"
      :model="form"
      :rules="rules"
    >
      <a-form-model-item ref="title" label="副标题" prop="title">
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item ref="desc" label="商品描述" prop="desc">
        <a-input v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item
        label="商品类目"
        prop="category"
        placeholder="选择所属子类目"
      >
        <a-select v-model="form.category" @change="handleChange">
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="选择所属子类目">
          <a-select-option v-for="c in categoryItems" :key="c" :value="c">
            {{c}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags">
        <a-select
         
          placeholder="选择标签"
          :default-value="['包邮,最晚次日达']"
          v-model="form.tags"
        >
          <a-select-option value="包邮，最晚次日达">包邮，最晚次日达
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
    <div class="foot">
      <a-form-model-item ref="title" >
        <a-button type="primary" class="btn" @click="next">下一步</a-button>
      </a-form-model-item>
    </div>
  </div>
</template>
<script>
export default {
  props: ["categoryList",'form'],
  data() {
    return {
      num:0,
      categoryItems: [],
      options: ["包邮"],
      selectedItems: [],
      other: "",
      // form: {
      //   title: "",
      //   desc: "",
      //   category: "",
      //   tags: "",
      //   c_items: [],
      // },

      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
          },
        ],
        desc: [
          {
            required: true,
            message: "请输入描述信息",
          },
        ],
        tags: [
          {
            required: true,
          },
        ],
      },
    };
  },
  methods: {
    handleChange(selectedItems) {
      this.form.c_items='';
      this.categoryList.forEach((ele) => {
        if (selectedItems == ele.id) {
          this.categoryItems = ele.c_items;
        }
      });
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('submit',this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style scoped>
.content {
  margin: 0 auto;
}

.steps-action {
  margin-top: 24px;
}
.foot {
  margin: 0 auto;
}
.btn {
  text-align: center;
  margin: 0 auto;
}
</style>
