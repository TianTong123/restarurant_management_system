import vue from 'vue'
import myMesssage from './myMsg'
import myNotify from './myNotify'
 
// 组件构造器，构造出一个 vue组件实例
const message = vue.extend(myMesssage);
const notify = vue.extend(myNotify);
let top = 0;

let myMsg = {
  /**
  * 
  * 确认提示框
  * @content 提示内容;
  * @type 提示框类型，parameter： success，error，prompt
  * @cancelFlag 是否显示取消按钮 true显示，不填或者false为不显示
  * @callback 函数
  */
  confirm: ({ 
    content, 
    type, 
    callback, 
    cancelFlag = false
  }) => {
    const msgDom = new message({
      el: document.createElement('div'),
      data () {
        return {
          msgFlag: true, // 是否显示
          cancelFlag: cancelFlag,//取消按钮是否显示
          content: content, // 文本内容
          type: type, // 类型
          callback: '',//返回方法、
          imgSrc: "",
          imgs:[
            {name: 'success', path: require('./images/success.png')},
            {name: 'error', path: require('./images/error.png')},
            {name: 'prompt', path: require('./images/prompt.png')}
           ]
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
            this.imgSrc = this.imgs[1].path;
            break;
          case 'prompt':
            this.imgSrc = this.imgs[2].path;
            break;
        }
      }
    })
     // 添加节点
    document.body.appendChild(msgDom.$el);
  },


  /**
   * 通知框
   */
  notify: ({
    content, 
    type, 
    time = 1500,
  }) =>{
    const notifyDom = new notify({
      el: document.createElement('div'),
      data () {
        return {
          notifyFlag: true, // 是否显示
          time: time,//取消按钮是否显示
          content: content, // 文本内容
          type: type, // 类型
          top: top,
          timer: '',
          timerFlag: '',
        }
      },
      created(){
        this.top += 1;
        top += 1;
        this.timer = setInterval(() => {
          if(this.top == 1){
           // this.timerFlag = setTimeout(() => {       
              top -= 1;
              this.notifyFlag = false;
              window.clearInterval(this.timer); 
            //}, 1000);
          }else{
            this.timerFlag = setTimeout(() => {   
              this.top -= 1;
            }, 1000);
          } 
        }, this.time);
      },
      beforeDestroy(){
        window.clearTimeout(this.timer); 
        window.clearTimeout(this.timerFlag); 
      }
    })
     // 添加节点
    document.body.appendChild(notifyDom.$el);
  }
}



//注册
function register(){
  //注册
  vue.prototype.$myMsg = myMsg
}

export default {
  myMsg,
  register
}