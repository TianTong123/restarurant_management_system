<template>
  <div class="login">
    <input type="text" v-model="text">
    <input type="text">
    <router-link :to="{name: 'home'}"> <input type="button" value="跳登录"/></router-link>
   <button @click="test">登录</button>
   <!-- <button @click="noHttp">登录2</button> -->
   <h1>{{returnMsg}}</h1> 
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
  }
}
</script>

<style scoped>

</style>