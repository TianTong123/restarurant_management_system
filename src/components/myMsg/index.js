import vue from 'vue'
import myMsg from './myMsg'
 
// 组件构造器，构造出一个 vue组件实例
const Message = vue.extend(myMsg)

function showToast ({ content, type, callback, cancelFlag = false}) {
 const toastDom = new Message({
  el: document.createElement('div'),
  data () {
   return {
    msgFlag: true, // 是否显示
    cancelFlag: false,
    content: content, // 文本内容
    type: type, // 类型
    callback: '',//返回方法、
    imgSrc: "",
    imgs:[
      {name: 'success', path: require('./images/success.png')},
      {name: 'error', path: require('./images/error.png')},
      {name: 'prompt', path: require('./images/prompt.png')}]
   }
  },
  methods:{
    //确定
    cancel(){
      this.msgFlag = false;
    },
    //确定
    determine(){
      this.msgFlag = false;
      if (callback != undefined) {
        callback()
      }
    }
  },
  created(){
    switch (type){
      case 'success':
        this.imgSrc = this.imgs[0].path;
        break;
      case 'error':
        return this.imgSrc = this.imgs[1].path;
        break;
      case 'prompt':
        return this.imgSrc = this.imgs[2].path;
        break;
    }
  }
})
 // 添加节点
document.body.appendChild(toastDom.$el)
//  // 过渡时间
//  setTimeout(() => {
//   toastDom.isShow = false
//  }, duration)
}
// 全局注册
function registryToast () {
 vue.prototype.$myMsg = showToast
}
 
export default registryToast