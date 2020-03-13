<template>
  <div class="order" style="height: 100%">
    <div class="m-wrap">
      <div class="m-head">
        <div class="m-label">订单号:</div><el-input v-model="formSearch.orderCode" placeholder="请输入订单号" clearable  prefix-icon="el-icon-search"></el-input>
        <el-radio v-model="formSearch.isRead" @change="stateChange" label="0">未看</el-radio>
        <el-radio v-model="formSearch.isRead" @change="stateChange" label="1">已看</el-radio>
        <el-button type="primary" icon="el-icon-search" @click="searchOrder">搜索</el-button>
        <el-button type="primary" icon="el-icon-remove-outline" @click="readOrder" v-show="formSearch.isRead==0">已看</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="diaAdd = true">新增订单</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="deleteCommodity">删除订单</el-button>
      </div>
      <el-divider></el-divider>
      <div class="m-body">
        <el-table
          :data="tableData"
          v-loading="loading"
          style="width: 100%"
          tooltip-effect="dark" 
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="orderCode" label="订单号"></el-table-column>
          <el-table-column prop="creator" label="创建人"></el-table-column>
          <el-table-column prop="orderPosition" label="桌号"></el-table-column>
          <el-table-column prop="isRead" label="状态">
            <template slot-scope="scope">
                <span v-if="scope.row.isRead == 1">已看</span>
                <span v-if="scope.row.isRead == 0">未看</span>
            </template>
          </el-table-column>
          <el-table-column prop="totalPrice" label="总价"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewOrder(scope.row.orderCode)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageInfo.current"
          :page-size="pageInfo.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

      <!-- 查看订单弹框 -->
      <el-dialog title="查看订单" :visible.sync="diaView" v-loading="loadingDia" :before-close="closeDia">
        <div class="content" style="display: inline-block; margin-left: 20px">
          <div class="my-line-style"><span>创建人：</span>{{viewOrderInfo.creator}}</div>
          <div class="my-line-style"><span>订单号：</span>{{viewOrderInfo.orderCode}}</div>
          <div class="my-line-style"><span>价格：</span>{{viewOrderInfo.totalPrice}}.00￥</div>
          <div class="my-line-style"><span>创建时间：</span>{{viewOrderInfo.createDate}}</div>
          <div class="my-line-style"><span>状态：</span>
            <span class="green-color" v-if="viewOrderInfo.isRead == 1">已看</span>
            <span class="red-color" v-if="viewOrderInfo.isRead == 0">未看</span>
          </div>
          <div class="my-line-style"><span>商品列表：</span>
            <span v-for="(e, index) in viewOrderInfo.commoditys" :key="index"><br/>
              商品名：<span class="green-color">{{e.commodityName}}：&nbsp;</span>
              数量：<span class="green-color">{{e.quantity}}&nbsp;</span>
              总价：<span class="green-color">{{e.totalPrice}}.00￥</span>
            </span>
          </div>
          <div class="my-line-style"><span>备注：</span>{{viewOrderInfo.remark}}</div>
        </div>
      </el-dialog>

      <!--新增订单弹框 -->
      <el-dialog title="新增订单" :visible.sync="diaAdd" v-loading="loadingDia" :before-close="closeDia">
        <el-form>
          <el-form-item label="桌号">
            <el-input v-model="formAdd.orderPosition" size="small" placeholder="桌号" clearable></el-input>
          </el-form-item>
          <div class="myform-item" v-for="(commodity, index) in commoditys" :key="commodity.key">
            <span class="left-price">{{prices[index]}}￥</span>
            <el-form-item :label="`商品${index+1}`">
              <el-select v-model="commodity.commodity" @change="changeCommodity(commodity.commodity, commodity.num, index)" value-key="id" filterable size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.commodityName"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数量">
              <el-input size="small" type="number" v-model="commodity.num" @change="changeCommodityNum(commodity.commodity, commodity.num, index)"></el-input>
            </el-form-item>
            <el-button class="right-button" size="small" @click.prevent="removeCommodity(commodity)">删除</el-button>
          </div>
          <el-form-item label="描述:">
            <el-input rows="4" v-model="formAdd.remark" type="textarea" maxlength="240" show-word-limit></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="price red-color">{{price}}￥</div>
          <el-button size="small" @click="closeDia">取 消</el-button>
          <el-button size="small" @click="addCommodity">新增商品</el-button>
          <el-button size="small" type="primary" @click="addOrder" >确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import util from "@/util/utils"

export default {
  data(){
    return{
      loading: false,
      loadingDia: false,
      //dia
      diaView: false,
      diaAdd: false,
      //查询
      formSearch:{
        orderCode: '',
        isRead: '1'
      },
      //选项
      options: [],
      multipleSelection: [],//选中的订单
      //表格
      tableData:[],
      pageInfo:{
        current: 1,
        pageSize: 10,
      },
      total: 0,
      viewOrderInfo:{},//订单详情
      formAdd:{ //新增订单表单
        orderPosition: '',
        remark: '',
        creator: util.getSession('user').name,
        isRead: 1,
        commoditys: [],
      },
      prices:[0],//价格数组 你可能回疑惑，为什么不是在页面计算而是这样用数组来计算，因为这样响应更迅速
      price: 0,//总价格
      numList: [],//商品数量数组
      commoditys: [{ //商品数组
        commodity: '',
        num: 1,
      }],
    }
  },
  mounted(){
    this.getCommoitys();
    this.searchOrder();
  },
  methods: {
    //查询订单
    searchOrder(){
      this.loading = true;
      let parames = {
        ...this.pageInfo,
        ...this.formSearch,
      }
      this.$http.getOrderList( parames )
          .then(({data}) => {
            this.loading = false;
            if (data.code == 0){
              this.tableData = data.data.records;
              this.total = data.data.total;
            }
            else{
              this.$myMsg.notify({
                content: data.msg,
                type: 'error'
              })
            }  
          })
         .catch(err => {
            this.loading = false;
            this.$myMsg.notify({
             content: err.message,
             type: 'error'
           })
         })
    },

    //查看详情
    viewOrder(code){
      this.diaView = true
      this.loadingDia = true;
      let parames = {
        orderCode: code,
      }
      this.$http.getOrderInfo( parames )
          .then(({data}) => {
            this.loadingDia = false;
            if (data.code == 0){
              this.viewOrderInfo = data.data;
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
         .catch(err => {
           this.loadingDia = false;
            this.$myMsg.notify({ content: err.message, type: 'error' });
         })
    },

    //新增订单
    addOrder(){
      this.loadingDia = true;
      let commodityIdList = this.commoditys.map(v=>v.commodity.id);
      for(let i = 0; i < commodityIdList.length; i++){
        let temp = {commodityId: commodityIdList[i], quantity: this.numList[i]}
        this.formAdd.commoditys.push(temp);
      }
      let parames = {
        ...this.formAdd
      }
      this.$http.addOrder( parames )
          .then(({data}) => {
            this.loadingDia = false;
            this.closeDia();
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success'});
              this.searchOrder();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
         .catch(err => {
            this.loadingDia = false;
            this.closeDia();
            this.$myMsg.notify({ content: err.message, type: 'error' });
         })
    },

    //删除订单
    deleteCommodity(){
       if(this.multipleSelection.length == 0){
        this.$myMsg.notify({ content: '请选择至少一条数据再进行该操作！', type: 'error'});
        return
      }
      let parames = {
        idList: this.multipleSelection.map(v=>v.id),
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: `是否一键删除这些订单！`,
        cancelFlag: true,
        callback: ()=> {
          this.$http.deleteOrders( parames.idList )
          .then(({data}) => {
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success'});
              this.searchOrder();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
         .catch(err => {
            this.$myMsg.notify({ content: err.message, type: 'error' });
         })
        }
      })
    },
    
    //获取全部商品
    getCommoitys(){
      let parames = {
        current: 1,
        pageSize: 1000000,
        state: 1
      }
      this.$http.commoityList( parames )
          .then(({data}) => {
            if (data.code == 0){
              this.options = data.data.records;
            }
            else{
              this.$myMsg.notify({
                content: data.msg,
                type: 'error'
              })
            }  
          })
         .catch(err => {
            this.$myMsg.notify({
             content: err.message,
             type: 'error'
           })
         })
    },

    //一键已看
    readOrder(){
      if(this.multipleSelection.length == 0){
        this.$myMsg.notify({ content: '请选择至少一条数据再进行该操作！', type: 'error'});
        return
      }
      let parames = {
        idList: this.multipleSelection.map(v=>v.id),
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: `是否一键看完这些订单！`,
        cancelFlag: true,
        callback: ()=> {
          this.$http.isReadOrders( parames.idList )
          .then(({data}) => {
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success'});
              this.searchOrder();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
         .catch(err => {
            this.$myMsg.notify({ content: err.message, type: 'error' });
         })
        }
      })
    },

    //删除商品
    removeCommodity(item, inex) {
      var index = this.commoditys.indexOf(item)
      if (index !== -1 && this.commoditys.length > 1) {
        this.commoditys.splice(index, 1);
        this.prices.splice(index, 1);
        this.numList.splice(index, 1);
      }
      this.computedPrices()
    },

    //新增商品
    addCommodity() {
      this.commoditys.push({
        commodity: '',
        num: 1,
        key: Date.now()
      });
      this.prices.push(0);
      this.numList.push(1);
      this.computedPrices();
    },

    //商品变化
    changeCommodity(commodity, num, index){
      this.prices[index] = commodity.saleCost * num;
      this.computedPrices();
      this.numList[index] = num;
    },

    //数量变化
    changeCommodityNum(commodity, num, index){
      this.prices[index] = commodity.saleCost * num;
      this.computedPrices();
      this.numList[index] = num;
    },

    //总价计算
    computedPrices(){
      this.price = eval(this.prices.join("+"));
    },

    //关闭弹框
    closeDia(){
      this.diaView = false;
      this.diaAdd = false;
      this.clearParame();
    },

    //清空参数
    clearParame(){
      this.formAdd = {
        orderPosition: '',
        remark: '',
        creator: util.getSession('user').name,
        isRead: 1,
        commoditys: [],
      };
      this.prices = [0];
      this.commoditys = [{ //商品数组
        commodity: '',
        num: 0,
      }]
    },

    //选中的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //改变状态触发
    stateChange(){
      this.searchOrder();
    },

    //分页的方法
    handleCurrentChange(val) {
      this.pageInfo.current = val;
      this.searchCommoity();
    },
  }
}
</script>

<style>
.order .right-button{
  position: absolute;
  right: 0px;
  margin-right: 10px;
}
.order .left-price{
  position: absolute;
  left: 0px;
  margin-left: 20px;
  line-height: 32px;
  color: #f00;
}
</style>