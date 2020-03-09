<template>
  <div class="home m-view">
    <div class="m-wrap">
      <!-- 表单 -->
      <div class="m-block">
        <div class="m-title">销售总额</div> 
        <el-date-picker v-model="salesVolumeTime" placeholder="开始日期" type="month" value-format="yyyy-MM" :clearable="true" :picker-options="pickerOptions"></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="getSalesVolume">查询</el-button>
        <ve-line :data="salesVolumeData" :extend="{series: { smooth: false }}"></ve-line>
      </div>
      <div class="m-block">
      
      <div class="m-title">商品数量</div> 
        <el-date-picker v-model="commodityNumTime" placeholder="开始日期" type="month" value-format="yyyy-MM" :clearable="true" :picker-options="pickerOptions"></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="getCommodityNum">查询</el-button>
        <ve-line :data="commodityNumData" :extend="{series: { smooth: false }}"></ve-line>
      </div>
      <div class="m-block">
      
      <div class="m-title">时段订单</div> 
        <el-date-picker v-model="timeOrderTime" placeholder="开始日期" type="month" value-format="yyyy-MM" :clearable="true" :picker-options="pickerOptions"></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="getTimeOrder">查询</el-button>
        <ve-line :data="timeOrderData" :extend="{series: { smooth: false }}"></ve-line>
      </div>
    </div>
  </div> 
</template>

<script>
import echarts from "echarts/lib/echarts";


export default {
  data(){
    return {
      salesVolumeData: {//销售额数据
        columns: ["日期", "总金额"],
        rows: [
          { 日期: "1",  总金额: 1093,  },
          { 日期: "2",  总金额: 3230,  },
          { 日期: "3",  总金额: 2623,  },
          { 日期: "4",  总金额: 1423,  },
          { 日期: "5",  总金额: 3492,  },
          { 日期: "6",  总金额: 9293,  }
        ]
      },
      commodityNumData: {//商品数量数据
        columns: ["日期", "总金额"],
        rows: [
          { 日期: "1",  总金额: 1093,  },
          { 日期: "2",  总金额: 3230,  },
        ]
      },
      timeOrderData: {//时间段数据
        columns: ["日期", "总金额"],
        rows: [
          { 日期: "1",  总金额: 1093,  },
        ]
      },
      salesVolumeTime: '',//销售额
      commodityNumTime: '',//商品数量
      timeOrderTime: '',//时间段订单
      //日期设置
			pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    }
  },
  methods:{
    //查询销售额
    getSalesVolume(){

    },
    //获取商品数量
    getCommodityNum(){

    },
    //获取时段订单
    getTimeOrder(){

    },
  }
}
</script>
