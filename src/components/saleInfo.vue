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
      <a-form-model-item ref="price" label="商品售价" prop="price">
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item ref="price_off" label="商品折扣" prop="price_off">
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item ref="inventory" label="商品库存" prop="inventory">
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item ref="unit" label="计量单位" prop="unit">
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <div class="clearfix">
          <a-upload
            :action="
              'https://mallapi.duyiedu.com/upload/images?appkey=' +
              $store.state.user.appkey
            "
            list-type="picture-card"
            name="avatar"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div>
              <a-icon :type="loading ? 'loding' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-form-model-item>
    </a-form-model>
    <div class="foot">
      <a-form-model-item ref="title" label="" prop="title">
        <a-button class="btn" type="primary" @click="prev">上一步</a-button>
        <a-button type="primary" @click="done">完成</a-button>
      </a-form-model-item>
    </div>
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ["categoryList", "form"],
  data() {
    return {
      obj: {
        uid: "1",
        name: "image.png",
        status: "done",
        url:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      fileList: [],
      previewVisible: false,
      previewImage: "",
      categoryItems: [],
      options: ["包邮"],
      selectedItems: [],
      loading: false,
      other: "",
      rules: {
        price: [
          {
            required: true,
            message: "请输入价格",
          },
        ],
        price_off: [
          {
            required: true,
            message: "请输入预售价格",
          },
        ],
        inventory: [
          {
            message: "请输入计量单位",
            required: true,
          },
        ],
        unit: [
          {
            message: "请输入计量单位",
            required: true,
          },
        ],
      },
    };
  },
  mounted() {
    //  this.form.images.forEach(item =>{
    //     this.fileList.push({
    //       ...this.obj,
    //       uid:parseInt(this.obj.uid)-1,
    //       url:item
    //       }
    //     );
    //   })
    console.log(9999, this.form.images[parseInt(this.obj.uid) - 1]);
    for (let i = 0; i < this.form.images.length; i++) {
      if (this.form.images[i]) {
        this.fileList.push({
          // name: "image.png",
          // status: "done",
          // uid: "1",
          // url:
          //   "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          ...this.obj,
          uid: i + "",
          url: this.form.images[i],
        });
      }
    }
  },
  methods: {
    prev() {
      this.$emit("prev");
    },
    done() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("two", this.form);
          alert("提交成功");
        } else {
          return false;
        }
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList, file }) {
      this.fileList = fileList;
    
      if (file.status == "done") {
        this.form.images.push(file.response.data.url);
      }
      if (file.status == "removed") {
       
        if (file.response) {
          let arr =[]
          arr = this.form.images.filter((ele) => {
            return file.response.data.url != ele;
          });
          this.form.images = arr ;
        }else{
          let arr = [];
          arr = this.form.images.filter(ele =>{
            return file.url !== ele ;
          })
          this.form.images = arr;
        }

        // console.log(this.form.images);
      }
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
  // computed: {
  //   fileList: {

  //     get: function () {

  //       // for(let i = 0 ;i < this.form.images.length ; i++){

  //       // }
  //       const fileList = [];
  //       this.form.images.forEach((item) => {
  //         fileList.push({
  //           ...this.obj,
  //           uid: parseInt(this.obj.uid) - 1,
  //           url: item,
  //         });
  //       });
  //       console.log(2222222, fileList);
  //       return fileList;
  //     },
  //       set:function(val){
  //       this.fileList.concat(val);

  // }
  //   }
  //   },

  next() {
    this.$refs.ruleForm.validate((valid) => {
      console.log(this.form);
      if (valid) {
        alert("submit!");
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  },
};
</script>
<style scoped>
/* .content {
  margin: 0 auto;
}

.steps-action {
  margin-top: 24px;
}
.foot {
  margin: 0 auto;
} */
.btn {
  margin-right: 50px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
