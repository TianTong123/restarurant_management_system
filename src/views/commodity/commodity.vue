<template>
  <div class="commodity">
    <div class="m-wrap m-view">
      <!-- 头 -->
      <div class="m-head">
        <div class="m-label">菜名:</div><el-input v-model="searchForm.commName" placeholder="请输入内容" clearable  prefix-icon="el-icon-search"></el-input>
        <div class="m-label">类型:</div>
        <el-select v-model="searchForm.sType" placeholder="请选择" @change="stateChange" clearable>
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        
        <el-radio v-model="searchForm.state" @change="stateChange" label="0">已下架</el-radio>
        <el-radio v-model="searchForm.state" @change="stateChange" label="1">已上架</el-radio>
        <el-button type="primary" icon="el-icon-search" @click="searchCommoity">搜索</el-button>
        <el-button type="primary" icon="el-icon-remove-outline" @click="upCommodity" v-show="searchForm.state==1">下架</el-button>
        <el-button type="primary" icon="el-icon-remove-outline" @click="upCommodity" v-show="searchForm.state==0">上架</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">新增商品</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="deleteCommodity">删除商品</el-button>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 表单 -->
      <div class="m-body">
        <el-table 
          v-loading="loading"
          :data="tableData" 
          style="width: 100%" 
          tooltip-effect="dark" 
          @selection-change="handleSelectionChange"
          :default-sort = "{prop: 'originalCost', saleCost: 'descending'}">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="commodityName" label="商品名" width="300"></el-table-column>
          <el-table-column prop="originalCost" label="原价" sortable width="180">
          </el-table-column>
          <el-table-column prop="saleCost" label="现价" sortable width="180">
            <template slot-scope="scope">
                <div class="red-color">{{ scope.row.saleCost }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
                <span v-if="scope.row.state == 1">已上架</span>
                <span v-if="scope.row.state == 0">已下架</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewCommodity(scope.row.id, false)">查看</el-button>
              <el-button type="text" size="small" @click="openEditDia(scope.row.id)">编辑</el-button>
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
      <!-- 新增/编辑商品弹框 -->
      <el-dialog :title="diaTitle" :visible.sync="dialogFormVisible" v-loading="loadingDia" :before-close="closeDia">
        <el-form :model="formData">
          <div class="myform-item">
            <el-form-item label="商品名:">
              <el-input size="small" v-model="formData.commodityName"></el-input>
            </el-form-item>   
            <el-form-item label="类型:">
              <el-autocomplete
                class="inline-input"
                v-model="formData.type"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
          </el-form-item>
          </div>
          <div class="myform-item">
            <el-form-item label="原价:">
              <el-input size="small" v-model="formData.originalCost"></el-input>
            </el-form-item>
            <el-form-item label="现价:">
              <el-input size="small" v-model="formData.saleCost"></el-input>
            </el-form-item>
          </div>
          <div class="myform-item">
            <el-form-item label="图片:">
              <el-upload
                class="avatar-uploader"
                action="http://39.107.123.212:8088/restaurant/file/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="formData.picUrl" :src="`http://39.107.123.212/restaurant/file/imgShow/${formData.picUrl}`" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <!-- <el-form-item label="添加备选:">
              <el-input size="mini" v-model="option.optionName" maxlength="5" show-word-limit style="margin-bottom: 5px" placeholder="备选名字"></el-input>
              <el-input size="mini" v-model="option.price" type="number" style="width: 78px" placeholder="价格"></el-input>
              <el-button size="mini" @click="addOption">添加</el-button>
              <div class="label-wrap">
                <div class="my-label" v-for="(e, index) in formData.options" :key="index">
                  {{e.optionName}}
                  <i class="close" @click="deleteOption(index)"/>
                </div>
              </div>
            </el-form-item> -->
          </div>
          <el-form-item label="描述:">
            <el-input rows="4" v-model="formData.remark" type="textarea" maxlength="240" show-word-limit></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDia">取 消</el-button>
          <el-button size="small" type="primary" @click="addCommoity" v-show="!isEdit">确 定</el-button>
          <el-button size="small" type="primary" @click="editCommodity" v-show="isEdit">确 定</el-button>
        </div>
      </el-dialog>

       <!-- 查看商品弹框 -->
      <el-dialog title="查看商品" :visible.sync="dialogViewCommodityVisible" v-loading="loadingDia" :before-close="closeDia">
        <img :src="`http://39.107.123.212:8088/restaurant/file/imgShow/${viewCommodityInfo.picUrl}`" class="avatar" style="display: inline-block" >
        <div class="content" style="display: inline-block; margin-left: 20px">
          <div class="my-line-style"><span>创建人：</span>{{viewCommodityInfo.creator}}</div>
          <div class="my-line-style"><span>商品名：</span>{{viewCommodityInfo.commodityName}}</div>
          <div class="my-line-style"><span>现价：</span>{{viewCommodityInfo.saleCost}}</div>
          <div class="my-line-style"><span>原价：</span>{{viewCommodityInfo.originalCost}}</div>
          <div class="my-line-style"><span>创建时间：</span>{{viewCommodityInfo.createDate}}</div>
          <div class="my-line-style"><span>类型：</span>{{viewCommodityInfo.type}}</div>
          <div class="my-line-style"><span>备注：</span>{{viewCommodityInfo.remark}}</div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import util from "@/util/utils";
// import {myMsg} from "@/components/myMsg";

export default {
  data(){
    return{
      loading: false,
      loadingDia: false,//弹框的
      user:{
        accountCode: util.getSession("user").accountCode,
        name: util.getSession("user").name,
      },
      //查询
      searchForm:{
        commName: '',
        sType: '',
        state: '1'
      },
      //选项
      typeOptions: [],
      //表格
      tableData:[],
      multipleSelection: [],//选中的参数
      pageInfo:{
        current: 1,
        pageSize: 10,
      },
      total: 0,
      //备选
      // option:{
      //   optionName: '',
      //   price: '',
      // },
      //新增弹框表单
      formData:{
        commodityName: '',//商品名
        picUrl: '',//图片
        remark: '',//描述
        saleCost: 0,//售/现价
        originalCost: 0,//原价
        type: '',//商品类型
        creator: '',//创建人
        creatorAccount: '',//创建者账户
        options: [],//备选
      },
      //查看商品
      viewCommodityInfo: '',
      //弹框
      isEdit: false,
      diaTitle: "新增商品",
      dialogFormVisible: false,//新增商品
      dialogViewCommodityVisible: false,//查看商品
    }
  },
  mounted(){
    this.searchCommoity();
    this.getTypeList();
  },
  methods:{
    //新增商品
    addCommoity(){
      this.loadingDia = true;
      this.diaTitle = "新增商品"
      this.isEdit = false;
      this.formData.creator = this.user.name;
      this.formData.creatorAccount = this.user.accountCode;
      this.$http.addCommoity(  this.formData )
          .then(res => {
            this.loadingDia = false;
            this.dialogFormVisible = false;
            if (res.data.code == 0){
              this.$myMsg.notify({ content: res.data.msg, type: 'success' })
              this.searchCommoity();
            }
            else{
              this.$myMsg.notify({ content: res.data.msg, type: 'error' })
            }  
          })
         .catch(err => {
            this.loadingDia = false;
            this.dialogFormVisible = false;
            this.$myMsg.notify({ content: err.message, type: 'error' })
         })
    },

    //查询接口
    searchCommoity(){
      this.loading = true;
      let parames = {
        ...this.pageInfo,
        ...this.searchForm
      }
      this.$http.commoityList( parames )
          .then(({data}) => {
            this.loading = false;
            this.dialogFormVisible = false;
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
            this.dialogFormVisible = false;
            this.$myMsg.notify({
             content: err.message,
             type: 'error'
           })
         })
    },
    
    //查看详情
    viewCommodity(id, flag){
      if(!flag){
         this.dialogViewCommodityVisible = true;
      }
      this.loadingDia = true;
      let parames = {
        id: id,
      }
      this.$http.getCommoityInfo( parames )
          .then(({data}) => {
            this.loadingDia = false;
            if (data.code == 0){
              this.viewCommodityInfo = data.data;
              if(flag) this.formData = data.data
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

    //编辑商品
    editCommodity(){
      this.$http.editCommoity( this.formData )
          .then(res => {
            this.loadingDia = false;
            this.dialogFormVisible = false;
            if (res.data.code == 0){
              this.$myMsg.notify({ content: res.data.msg, type: 'success' })
              this.searchCommoity();
              this.clearParame();
            }
            else{
              this.$myMsg.notify({ content: res.data.msg, type: 'error' })
            }  
          })
         .catch(err => {
            this.loadingDia = false;
            this.dialogFormVisible = false;
            this.clearParame();
            this.$myMsg.notify({ content: err.message, type: 'error' })
         })
    },

    //删除商品
    deleteCommodity(){
      if(this.multipleSelection.length == 0){
        this.$myMsg.notify({ content: '请选择至少一条数据再进行该操作！', type: 'error'});
        return
      }
      this.loadingDia = true;
      let parames = {
        commodityCodeList: this.multipleSelection.map(v=>v.commodityCode),
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: '是否删除这些商品！',
        cancelFlag: true,
        callback: ()=> {
          this.$http.deleteCommoity( parames.commodityCodeList )
          .then(({data}) => {
            this.loadingDia = false;
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success'});
              this.searchCommoity();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
         .catch(err => {
           this.loadingDia = false;
            this.$myMsg.notify({ content: err.message, type: 'error' });
         })
        }
      })
    },

    //上下架商品
    upCommodity(){
      if(this.multipleSelection.length == 0){
        this.$myMsg.notify({ content: '请选择至少一条数据再进行该操作！', type: 'error'});
        return
      }
      this.loadingDia = true;
      let parames = {
        flag: this.searchForm.state==0?1:0,
        idList: this.multipleSelection.map(v=>v.id),
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: `是否${this.searchForm.state == 0?'上架':'下架'}这些商品！`,
        cancelFlag: true,
        callback: ()=> {
          this.$http.upOrDownCommoity( parames )
          .then(({data}) => {
            this.loadingDia = false;
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success'});
              this.searchCommoity();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error'});
            }  
          })
         .catch(err => {
           this.loadingDia = false;
            this.$myMsg.notify({ content: err.message, type: 'error' });
         })
        }
      })
    },
    
    //打开编辑窗
    openEditDia(id){
      this.diaTitle = "编辑商品";
      this.isEdit = true;
      this.dialogFormVisible = true;
      this.viewCommodity(id, true);
    },

    //获取类型列表
    getTypeList(){
      this.loading = true;
      let parames = {
        ...this.pageInfo,
      }
      this.$http.getTypeList( parames )
          .then(({data}) => {
            this.loading = false;
            this.dialogFormVisible = false;
            if (data.code == 0){
              this.typeOptions = [];
              for(let i = 0; i < data.data.length; i++){
                let temp = {value: data.data[i], label: data.data[i]};
                this.typeOptions.push(temp)
              }
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
            this.dialogFormVisible = false;
            this.$myMsg.notify({
             content: err.message,
             type: 'error'
           })
         })
    },

    //分页的方法
    handleCurrentChange(val) {
      this.pageInfo.current = val;
      this.searchCommoity();
    },

    //关闭弹框
    closeDia(){
      this.dialogViewCommodityVisible = false;
      this.dialogFormVisible = false;
      this.clearParame();
    },

    //改变状态触发
    stateChange(){
      this.searchCommoity();
    },

    //清空参数
    clearParame(){
      this.formData = {
        commodityName: '',//商品名
        picUrl: '',//图片
        remark: '',//描述
        saleCost: 0,//售/现价
        originalCost: 0,//原价
        type: '',//商品类型
        creator: '',//创建人
        creatorAccount: '',//创建者账户
        options: [],//备选
      }
    },
    //备选处理
    //添加
    // addOption(){
    //   //插入数据
    //   this.formData.options.push({optionName: this.option.optionName, price: this.option.price});
    //   //清空
    //   this.option.optionName = "";
    //   this.option.price = 0;
    // },
    querySearch(queryString, cb) {
      let restaurants = this.typeOptions;
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    //删除
    deleteOption(index){
      this.formData.options.splice(index, 1);
    },
    //备选处理结束

    //选中的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //上传图片
    handleAvatarSuccess(res, file) {
      this.formData.picUrl =`${res.data}`;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$myMsg.notify({
          type: 'error',
          content: '上传头像图片只能是 JPG 格式!',
        })
      }
      if (!isLt2M) {
        this.$myMsg.confirm({
          type: 'error',
          content: '上传头像图片大小不能超过 2MB!',
        })
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
.label-wrap{
  display: block;
  margin-top: 5px;
  height: 70px;
  overflow-y: auto;
}
.label-wrap .my-label{
  display: inline-block;
  vertical-align: top;
  padding-left: 5px;
  margin: 5px 5px 0 5px;
  height: 20px;
  border-radius: 10px;
  line-height: 20px;
  background-color: #eee;
  cursor: pointer;
}
.label-wrap .my-label .close{
  display: inline-block;
  vertical-align: top;
  margin: 2px 5px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: #ccc;
  background-image: url(../../../static/images/close.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 8px;
  overflow: hidden;
  cursor: pointer;
}
.label-wrap .my-label .close:hover{
  background-color: rgb(255, 136, 0);
}
</style>