<template>
  <div class="login">
    <div class="wrap">
      <span>余文国际后台管理系统</span>
      <el-form ref="loginForm" :rules="rules" :model="loginForm">
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import downLoadFileFlow from "@/server/downLoadFile";
export default {
  data(){
    return {
      loginForm:{
        account: "",
        password: '',
      },
       rules: {
          account: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ]
      }
    }
  },
  methods:{
    login(){
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.$router.replace({name: 'home'})
        }
      });
    },
    downLodeFile () {
      let obj = {
        viewPath: "OSP/M00/00/00/rBBkKF38FWSEQK4RAAAAAIzsYvY298.pdf", //文件路径
        groupName: "OSP",
        fileName: ""
      };
      downLoadFileFlow(obj, "模板简历.pdf");
    },
  }
}
</script>

<style scoped>
@import '../../../static/css/login.css';
</style>