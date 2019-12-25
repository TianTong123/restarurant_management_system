<template>
  <div class="restarurant">
    <header>
      <div class="logo-title">余文国际五星级连锁酒店管理System</div>
      <div class="user-wrap">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-avatar size="small" src="http://192.168.17.126:8088/commodity/imgShow"></el-avatar>
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
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
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
          <el-menu-item index="4">
            <i class="el-icon-user-solid"></i>
            <span slot="title">人员管理</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <el-tabs style="margin-top: 10px" type="card" v-model="editableTabsValue" closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="index"
            :label="item.title"
            :name="item.name"
          >
            {{item.content}}
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
        editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
    },
    methods: {
      //删除标签文件
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
      //下拉菜单点击(点击用户头像的)
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
    }
  }
</script>

<style scoped>
@import '../../../static/css/home.css';
</style>