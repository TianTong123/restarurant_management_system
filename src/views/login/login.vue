<template>
  <div class="login">
    <input type="text" v-model="text">
    <input type="password">
    <router-link :to="{name: 'home'}"> <input type="button" value="跳登录"/></router-link>
   <button @click="test">登录</button>
   <button @click="msg">消息</button>
   <button @click="notify">通知</button>
   <button @click="downLodeFile">下载</button>
   <!-- <button @click="noHttp">登录2</button> -->
   <h1>{{returnMsg}}</h1> 
  </div>
</template>

<script>
import downLoadFileFlow from "@/server/downLoadFile";
export default {
  data(){
    return {
      returnMsg: '',
      text: '',
      num: 0,
    }
  },
  methods:{
    test(){
      this.$http.helloWord({test: this.text}).then(res => {
        if(res.data.code = 1)
        this.$myMsg.confirm({
          content: res.data.data,
          type: 'success',
        })
          this.returnMsg = res.data.data
      })
    },
    msg(){
      this.$myMsg.confirm({
        content: '啦啦啦',
        type: 'prompt',
        callback: ()=>{console.log("!!!!")}
      });
    },
    notify(){
      this.$myMsg.notify({
        content: this.num ++,
        type: 'success',
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

</style>