<template>
<div>
<h1>欢迎来到余文国际</h1>
  <button @click="test">登录</button>
   <button @click="msg">消息</button>
</div>
  
</template>

<script>
export default {
  data(){
    return {
      returnMsg: '',
      text: ''
    }
  },
  methods:{
    test(){
      this.$http.helloWord({test: this.text}).then(res => {
        this.returnMsg = res.data
      })
    },
    msg(){
      this.$myMsg.confirm({
        content: '啦啦啦',
        type: 'error',
        callback: ()=>{console.log("!!!!")}
      });
    }
  }
}
</script>
