<template>
  <div class="home m-view">
    <div class="m-wrap">
      <!-- 表单 -->
      <div class="m-block">
        <div class="m-title">销售总额</div> 
        <el-date-picker v-model="salesVolumeTime" placeholder="开始日期" type="month" value-format="yyyy-MM" :clearable="true" :picker-options="pickerOptions"></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="getSalesVolume">查询</el-button>
        <ve-line v-loading="loadingSale" :data="salesVolumeData" :settings="saleChartSettings" :extend="{series: { smooth: false }}"></ve-line>
      </div>
      <div class="m-block">
      
      <div class="m-title">商品数量</div> 
        <el-date-picker v-model="commodityNumTime" placeholder="开始日期" type="month" value-format="yyyy-MM" :clearable="true" :picker-options="pickerOptions"></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="getCommodityNum">查询</el-button>
        <ve-histogram v-loading="loadingCommodity" :settings="commidtyChartSettings" :data="commodityNumData"></ve-histogram>
      </div>
      <div class="m-block">
      
      <div class="m-title">时段订单</div> 
        <el-date-picker v-model="timeOrderTime" placeholder="开始日期"  value-format="yyyy-MM-dd" :clearable="true" :picker-options="pickerOptions"></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="getTimeOrder">查询</el-button>
        <ve-line v-loading="loadingTime" :settings="timeChartSettings" :data="timeOrderData" :extend="{series: { smooth: false }}"></ve-line>
      </div>
    </div>
  </div> 
</template>

<script>
import echarts from "echarts/lib/echarts";


export default {
  data(){
    this.saleChartSettings = {
      labelMap: {
        date: '时间',
        salePrice: '总金额'
      }
    };
    this.commidtyChartSettings = {
      labelMap: {
        commodityName: '商品名',
        commodityNum: '销售数量'
      }
    };
    this.timeChartSettings = {
      labelMap: {
        tiemeArea: '时段',
        orderNum: '订单数'
      }
    };
    return {
      loadingSale: false,
      loadingTime: false,
      loadingCommodity: false,
      salesVolumeData: {//销售额数据
        columns: ["date", "salePrice"],
        rows: []
      },
      commodityNumData: {//商品数量数据
        columns: ["commodityName", "commodityNum"],
        rows: []
      },
      timeOrderData: {//时间段数据
        columns: [ "tiemeArea", "orderNum"],
        rows: []
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
  mounted(){
    this.initDate();
    this.getSalesVolume();
    this.getTimeOrder();
    this.getCommodityNum();
  },
  methods:{
    //查询销售额
    getSalesVolume(){
      this.loadingSale = true;
      let parames = {
        date: this.salesVolumeTime
      }
      this.$http.getSalesVolume( parames )
          .then(({data}) => {
            this.loadingSale = false;
            if (data.code == 0){
              this.salesVolumeData.rows = data.data
            }
            else{
              this.$myMsg.notify({
                content: data.msg,
                type: 'error'
              })
            }  
          })
         .catch(err => {
            this.loadingSale = false;
            this.$myMsg.notify({
             content: err.message,
             type: 'error'
           })
         })
    },

    //获取商品数量
    getCommodityNum(){
      this.loadingCommodity = true;
      let parames = {
        date: this.commodityNumTime
      }
      this.$http.getCommodityNum( parames )
          .then(({data}) => {
            this.loadingCommodity = false;
            if (data.code == 0){
              this.commodityNumData.rows = data.data
            }
            else{
              this.$myMsg.notify({
                content: data.msg,
                type: 'error'
              })
            }  
          })
         .catch(err => {
            this.loadingCommodity = false;
            this.$myMsg.notify({
             content: err.message,
             type: 'error'
           })
         })
    },

    //获取时段订单
    getTimeOrder(){
      this.loadingTime = true;
      let parames = {
        date: this.timeOrderTime
      }
      this.$http.getTimeOrder( parames )
          .then(({data}) => {
            this.loadingTime = false;
            if (data.code == 0){
              this.timeOrderData.rows = data.data
            }
            else{
              this.$myMsg.notify({
                content: data.msg,
                type: 'error'
              })
            }  
          })
         .catch(err => {
            this.loadingTime = false;
            this.$myMsg.notify({
             content: err.message,
             type: 'error'
           })
         })
    },

    //初始化时间
    initDate(){
      let now = new Date();
      let month =  now.getMonth()+1;
      if(month < 10){
        month = '0'+month;
      }
      let day = now.getDate()
      if(day < 10){
        day = '0'+day;
      }
      let year = now.getFullYear();
      let time = `${year}-${month}`;
      this.salesVolumeTime = time;
      this.commodityNumTime = time;
      this.timeOrderTime = `${time}-${day}`;
    }
  }
}
</script>
