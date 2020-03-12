<template>
  <div class="account" style="height: 100%">
    <div class="m-wrap">
      <div class="m-head">
        <el-input v-model="formSearch.orderCode" placeholder="请输入内容" clearable  prefix-icon="el-icon-search"></el-input>
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
              <el-button type="text" size="small" @click="viewOrder(scope.row.id)">查看</el-button>
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
      <el-dialog title="查看商品" :visible.sync="diaView" v-loading="loadingDia" :before-close="closeDia">
        <div class="content" style="display: inline-block; margin-left: 20px">
          <div class="my-line-style"><span>创建人：</span>{{viewOrderInfo.creator}}</div>
          <div class="my-line-style"><span>订单号：</span>{{viewOrderInfo.orderCode}}</div>
          <div class="my-line-style"><span>数量：</span>{{viewOrderInfo.totalPrice}}</div>
          <div class="my-line-style"><span>订单数量：</span>{{viewOrderInfo.quantity}}</div>
          <div class="my-line-style"><span>创建时间：</span>{{viewOrderInfo.createDate}}</div>
          <div class="my-line-style"><span>状态：</span>
            <span class="green-color" v-if="viewOrderInfo.isRead == 1">已看</span>
            <span class="red-color" v-if="viewOrderInfo.isRead == 0">未看</span>
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
          <!-- <div class="myform-item" v-for="(commodity, index) in formAdd.commoditys" :key="commodity.key">
            <el-form-item :label="`商品'${index+1}`">
              <el-input v-model="commodity.commodity"></el-input>
            </el-form-item>
            <el-form-item :label="数量">
              <el-input v-model="commodity.num"></el-input>
            </el-form-item>
            <el-button @click.prevent="removeCommodity(commodity)">删除</el-button>
          </div> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDia">取 消</el-button>
          <el-button @click="addCommodity">新增商品</el-button>
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
        creator: util.getSession('user').name,
        status: 1,
        commoditys: [{
          commodity: '',
          num: 0,
        }],
      },
    }
  },
  methods: {
    //查询订单
    searchOrder(){
      this.loading = true;
      let parames = {
        ...this.pageInfo,
        ...this.formSearch,
      }
      this.$http.getRoleList( parames )
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
    viewOrder(id){
      this.diaView = true
      this.loadingDia = true;
      let parames = {
        id: id,
      }
      this.$http.getCommoityInfo( parames )
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
      let parames = {
        id: id,
      }
      this.$http.getCommoityInfo( parames )
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

    //删除订单
    deleteCommodity(){
       if(this.multipleSelection.length == 0){
        this.$myMsg.notify({ content: '请选择至少一条数据再进行该操作！', type: 'error'});
        return
      }
      this.loading = true;
      let parames = {
        idList: this.multipleSelection.map(v=>v.id),
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: `是否一键删除这些订单！`,
        cancelFlag: true,
        callback: ()=> {
          this.$http.upOrDownCommoity( parames )
          .then(({data}) => {
            this.loading = false;
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success'});
              this.searchOrder();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
         .catch(err => {
           this.loading = false;
            this.$myMsg.notify({ content: err.message, type: 'error' });
         })
        }
      })
    },

    //一键已看
    readOrder(){
      if(this.multipleSelection.length == 0){
        this.$myMsg.notify({ content: '请选择至少一条数据再进行该操作！', type: 'error'});
        return
      }
      this.loading = true;
      let parames = {
        idList: this.multipleSelection.map(v=>v.id),
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: `是否一键看完这些订单！`,
        cancelFlag: true,
        callback: ()=> {
          this.$http.upOrDownCommoity( parames )
          .then(({data}) => {
            this.loading = false;
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success'});
              this.searchOrder();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
         .catch(err => {
           this.loading = false;
            this.$myMsg.notify({ content: err.message, type: 'error' });
         })
        }
      })
    },

    //删除商品
    removeCommodity(item) {
      var index = this.formAdd.commoditys.indexOf(item)
      if (index !== -1) {
        this.formAdd.commoditys.splice(index, 1)
      }
    },

    //新增商品
    addCommodity() {
      this.formAdd.commodityspush({
        commodity: '',
        num: 0,
        key: Date.now()
      });
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
        roleName: ''
      }
    },

    //选中的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //改变状态触发
    stateChange(){
      this.searchCommoity();
    },

    //分页的方法
    handleCurrentChange(val) {
      this.pageInfo.current = val;
      this.searchCommoity();
    },
  }
}
</script>
