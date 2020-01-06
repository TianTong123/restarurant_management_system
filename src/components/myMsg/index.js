import vue from 'vue'
import myMesssage from './myMsg'
import myNotify from './myNotify'
 
// 创建vue组件实例
const message = vue.extend(myMesssage);
const notify = vue.extend(myNotify);

//添加通知节点
let notifyWrap = document.createElement('div');
notifyWrap.className = "notify-wrap"
notifyWrap.style = "position: fixed; z-index: 99999; right: 0px; top: 90px; transition-duration: .5s;"
document.body.appendChild(notifyWrap);


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
   * @content 提示内容;
   * @type 提示框类型，parameter： success，error，prompt
   * @time 显示时长
   */
  notify: ({
    content, 
    type, 
    time = 1500,
  }) =>{
    //创建一个存放通知的div
    const notifyDom = new notify({
      el: document.createElement('div'),
      data () {
        return {
          notifyFlag: true, // 是否显示
          time: time,//取消按钮是否显示
          content: content, // 文本内容
          type: type, // 类型
          timer: '',
          timeFlag: false,
        }
      },
      watch:{
        timeFlag(){
          if(this.timeFlag){
            this.notifyFlag = false;
            window.clearTimeout(this.timer); 
          }
        }
      },
      created(){
        this.timer = setTimeout(() => { 
          this.timeFlag = true;
        }, this.time);
         
      },
      beforeDestroy(){
        window.clearTimeout(this.timer); 
      }
    })
    
     // 添加节点
    notifyWrap.appendChild(notifyDom.$el);
  }
}


//注册
function register(){
  vue.prototype.$myMsg = myMsg
}



export default {
  myMsg,
  register
}