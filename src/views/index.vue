<template>
  <div class="restarurant">
    <header>
      <div class="logo-title">余文国际五星级连锁酒店管理System</div>
      <div class="user-wrap">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-avatar size="small" src=""></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-lock" command="1">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-apple" command="2">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <div class="wrap">
      <div class="menu">
        <el-menu
          style="width:100%; margin-top: 20px;"
          :default-active="activeTab"
          router
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="home">
            <i class="el-icon-s-data"></i>
            <span slot="title">销售统计</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-s-claim"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-cherry"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="account">
            <i class="el-icon-user-solid"></i>
            <span slot="title">人员管理</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <el-tabs  type="card" v-model="activeTab" closable @tab-click="tabClick" @tab-remove="removeTab">
          <el-tab-pane
            v-for="item in activeTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <router-view></router-view>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        activeTab: 'home',
        activeTabs: [{
          title: '首页',
          name: 'home',
        }],
      }
    },
    methods: {
      //标签点击
      tabClick(tab) {
        this.$router.push({name: tab.name });
      },
      
      //删除标签
      removeTab(targetName) {
        let tabs = this.activeTabs;
        let activeName = this.activeTab;
        //当关闭的是当前激活的tab
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                this.$router.push({name: activeName });
              }
            }
          });
        }
        //关闭非激活页面
        this.activeTab = activeName;
        //不能关闭最后一个标签
        if (this.$route.name != targetName && this.activeTabs.length>1){
          this.activeTabs = tabs.filter(tab => tab.name !== targetName);
        }
      },

      //增加标签
      addTab(name, title) {
        this.activeTabs.push({
          title:title,
          name: name,
        });
        this.activeTab = name;
      },

      //下拉菜单点击(点击用户头像的)
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
    },
    watch:{
      //通过监听路由来进行控制tab的增减
      $route(to) {
        let isHaveNameFlag = false; //如果数组有这个路径，则为true，没有就是false
        let activeIndex = 0;//激活tab的下标
        for(let i = 0; i < this.activeTabs.length; i ++){
          if(to.name == this.activeTabs[i].name){
            isHaveNameFlag = true
            activeIndex = i;
          }
        }
        
        if(isHaveNameFlag){//如果有这个路径，则激活当前tab
          this.activeTab = this.activeTabs[activeIndex].name
        }
        else{//如果没有这个路径。则新增一个tab并激活这个tab
          this.addTab(to.name, to.meta.title)
        }
        
      }
    }, 
  }
</script>

<style scoped>
@import '../../static/css/index.css';
</style>