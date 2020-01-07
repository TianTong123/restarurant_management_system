<template>
  <div class="msg" v-if="msgFlag">
    <div class="msg-wrap">
      <div class="img"><img :src="imgSrc"></div>
      <p>{{content}}</p>
      <div class="footer">
        <div class="button" @click="determine">确认</div>
        <div class="button cancel" v-if="cancelFlag" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.msg{
  position: fixed;
  z-index: 99999;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .2);
}
.msg-wrap{
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -180px 0 0 -190px;
  width: 380px;
  height: 360px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 12px 5px rgba(0, 0, 0, 0.1);
  animation: show cubic-bezier(.18,.89,.32,1.28) .4s;
}
@keyframes show{
  0%{
    top: 20%;
    opacity: 0;
  }
  100%{
    top: 50%;
    opacity: 1;
  }
}
img{
  width: 100%;
  height: 100%;
}
.msg-wrap .img{
  margin: 50px auto 35px auto;
  width: 130px;
  height: 130px;
}
.msg-wrap p{
  margin: 0 auto;
  width: 300px;
  height: 60px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
}
.msg-wrap .footer{
  margin-top: 10px;
  width: 100%;
  text-align: center;
}
.msg-wrap .footer .button{
  display: inline-block;
  margin: 0 20px;
  width: 100px;
  height: 36px;
  border-radius: 18px;
  color: #fff;
  line-height: 36px;
  font-size: 14px;
  font-weight: 500;
  background-color: #4167DA;
  cursor: pointer;
}
.msg-wrap .footer .button:hover{
  background-color: #1AFA29;
}
.msg-wrap .footer .cancel{
  background-color: #aaa;
}
</style>
