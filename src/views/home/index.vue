<template>
  <div class="restarurant">
    <header>
      <div class="logo-title">余文国际五星级连锁酒店管理System</div>
      <div class="user-wrap">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-avatar size="medium" src="../../assets/logo.png" ></el-avatar>
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
          style="width:100%; margin-top: 20px"
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
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
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