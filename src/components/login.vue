<template>
 <div class="logins">
    <a-form-model
    class=".loginForm"
    ref="loginForm"
    :model="loginForm"
    :rules="rules"
    v-bind="layout"
  >
    <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="loginForm.email"  />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="password">
      <a-input
        v-model="loginForm.password"
        type="password"
        autocomplete="off"
      />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('loginForm')">
        登录
      </a-button>
      <a-button style="margin-left: 100px" @click="resetForm('loginForm')">
        <a href="https://mallapi.duyiedu.com/login/#/register">注册</a>
      </a-button>
    </a-form-model-item>
  </a-form-model></div>
</template>
<script>
import api from '@/api/user.js' ;
export default {
  data() {
     let loginFormreg = /^[\w-]+@[\w.-]+.com$/;
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }else if(loginFormreg.test(value)) {
       return callback();
      }else{
        
         return callback(new Error('你的邮箱格式错误'));
      }
     
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
       return callback(new Error('请输入密码'));
      }else{
        callback();
      }
      
        }
        
    return {
      loginForm: {
        password: '',
         email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email:[{validator: checkEmail, trigger: 'change'}]
       
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.user(this.loginForm).then(res =>{
            console.log(1111,res)
            this.$store.dispatch('setUserInfo',res);
            this.$router.push({
              name:'Home'
            });
          }).catch(err => {
            this.$message.error(err);
          });
         
        } else {
          console.log('账号或密码错误 亲亲');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
}

</script>
<style scoped>
@import url('~@/assets/css/login.less');
</style>
