<template>
  <div class="account m-view">
    <div class="m-wrap">
      <div class="m-head">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogAddFormVisible = true">增加账号</el-button>
      </div>
      <el-divider></el-divider>
      <div class="m-body">
        <el-table
          :data="tableData"
          v-loading="loading"
          style="width: 100%"
          tooltip-effect="dark" 
          :default-sort = "{prop: 'originalCost', saleCost: 'descending'}">
          <el-table-column prop="accountCode" label="账号code" ></el-table-column>
          <el-table-column prop="id" label="账号id" ></el-table-column>
          <el-table-column prop="name" label="姓名" ></el-table-column>
          <el-table-column prop="createDate" label="创建时间"></el-table-column>
          <el-table-column prop="phone" label="手机号" ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewAccount(scope.row.id, scope.row.accountCode, false)">查看</el-button>
              <el-button type="text" size="small" @click="openEditDia(scope.row.id, scope.row.accountCode)">编辑资料</el-button>
              <el-button type="text" size="small" @click="openRightDia(scope.row.id, scope.row.accountCode)">编辑角色</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageInfo.current"
          :page-size="pageInfo.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

      <!-- 查看账号弹框 -->
      <el-dialog title="查看账号" :visible.sync="dialogViewAccountVisible" v-loading="loadingDia" :before-close="closeDia">
        <img src="../../../static/images/adminImg.jpg" class="avatar" style="display: inline-block" >
        <div class="content" style="display: inline-block; margin-left: 20px">
          <div class="my-line-style"><span>账号code：</span>{{viewAccountInfo.accountCode}}</div>
          <div class="my-line-style"><span>账号id：</span>{{viewAccountInfo.id}}</div>
          <div class="my-line-style"><span>姓名：</span>{{viewAccountInfo.name}}</div>
          <div class="my-line-style"><span>手机号：</span>{{viewAccountInfo.phone}}</div>
          <div class="my-line-style"><span>创建时间：</span>{{viewAccountInfo.createDate}}</div>
          <div class="my-line-style"><span>角色：</span>
            <span v-for="(e, index) in viewAccountInfo.right" :key="index">
              <span class="red-color" v-show="e.status == 0">{{e.roleName}}、&nbsp;</span>
              <span class="green-color" v-show="e.status == 1">{{e.roleName}}、&nbsp;</span>
            </span>
          </div>
        </div>
      </el-dialog>

       <!-- 编辑账号弹框 -->
      <el-dialog title="编辑账号" :visible.sync="dialogFormVisible" v-loading="loadingDia" :before-close="closeDia">
        <el-form :model="formData">
          <el-form-item label="名字:">
            <el-input size="small" v-model="formData.name"></el-input>
          </el-form-item>   
          <el-form-item label="手机号:">
            <el-input size="small" v-model="formData.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input size="small" v-model="formData.password" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDia">取 消</el-button>
          <el-button size="small" type="primary" @click="editAccount" >确 定</el-button>
        </div>
      </el-dialog>

      <!-- 增加账号弹框 -->
      <el-dialog title="增加账号" :visible.sync="dialogAddFormVisible" v-loading="loadingDia" :before-close="closeDia">
        <el-form>
          <el-form-item label="数量:">
            <el-input v-model="formAdd.num" size="small" placeholder="请输入要增加账号的数量" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDia">取 消</el-button>
          <el-button size="small" type="primary" @click="addAccount" >确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑账号权限弹框 -->
      <el-dialog title="编辑账号权限" :visible.sync="dialogEditRightFormVisible" v-loading="loadingDia" :before-close="closeDia">
        <el-form>
          <el-form-item label="角色:">
            <el-select v-model="formRight.rightList" style="width: 100%" multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDia">取 消</el-button>
          <el-button size="small" type="primary" @click="editRight" >确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loading: false,
      loadingDia: false,
      dialogViewAccountVisible: false,
      dialogFormVisible: false,
      dialogAddFormVisible: false,
      dialogEditRightFormVisible: false,
      viewAccountInfo: {},//查看的用户信息
      options: [],//角色列表
      formRight: {//权限编辑表
        accountCode: '',
        rightList:[],
      },
      formAdd:{ //新增账号表单
        num: ''
      },
      //表格
      tableData:[],
      pageInfo:{
        current: 1,
        pageSize: 10,
      },
      total: 0,
      //编辑弹框表单
      formData:{
        phone: '',
        name: '',
        password: ''
      },
    }
  },
  mounted(){
    this.searchAccount();
    this.getRightList();
  },
  methods: {
    //查询
    searchAccount(){
      this.loading = true;
      let parames = {
        ...this.pageInfo,
      }
      this.$http.accountList( parames )
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

    //查看账号
    viewAccount(id, code,flag){
      if(!flag){
         this.dialogViewAccountVisible = true;
      }
      this.loadingDia = true;
      let parames = {
        id: id,
        accountCode: code
      }
      this.$http.viewAccount( parames )
         .then(({data}) => {
           this.loadingDia = false;
           if (data.code == 0){
             this.viewAccountInfo = data.data;
             if(data.data.roleList.length > 0 && data.data.roleList[0] != null){
               this.viewAccountInfo.right = data.data.roleList;
               this.formRight.rightList = data.data.roleList;
             }
             if(flag){
              this.formData = data.data;
              this.formData.password = "";
             } 
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
    
    //获取角色列表
    getRightList(){
      let parames = {
        current: 1,
        pageSize: 10000,
      }
      this.$http.getRoleList( parames )
         .then(({data}) => {
           if (data.code == 0){
              this.options = data.data.records;
           }
           else{
             this.$myMsg.notify({ content: data.msg, type: 'error'});
           }  
         })
        .catch(err => {
           this.$myMsg.notify({ content: err.message, type: 'error' });
        })
    },

    //新增账号
    addAccount(){
      this.loadingDia = true;
      let parames = {
        ...this.formAdd,
      }
      this.$http.addAccount( parames )
          .then(({data}) => {
            this.loadingDia = false;
            this.dialogAddFormVisible = false;
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success' });
              this.searchAccount();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error' });
            }  
          })
         .catch(err => {
            this.loadingDia = false;
            this.dialogAddFormVisible = false;
            this.$myMsg.notify({ content: err.message, type: 'error' });
         })
    },

    //编辑账号
    editAccount(){
      this.loadingDia = true;
      let {phone, name, password, id} = this.formData
      let parames = {
        id,
        phone,
        name,
        password
      }
      this.$http.editAccount( parames )
          .then(({data}) => {
            this.loadingDia = false;
            this.dialogAddFormVisible = false;
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success' });
              this.searchAccount();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error' });
            }  
          })
         .catch(err => {
            this.loadingDia = false;
            this.dialogAddFormVisible = false;
            this.$myMsg.notify({ content: err.message, type: 'error' });
         })
    },

    //角色编辑
    editRight(){
       this.loadingDia = true;
      let parames = {
        ...this.formRight,
      }
      this.$http.editAccountRight( parames )
          .then(({data}) => {
            this.loadingDia = false;
            this.dialogEditRightFormVisible = false;
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success' });
              this.searchAccount();
            }
            else{
              this.$myMsg.notify({ content: data.msg, type: 'error' });
            }  
          })
         .catch(err => {
            this.loadingDia = false;
            this.dialogEditRightFormVisible = false;
            this.$myMsg.notify({ content: err.message, type: 'error' });
         })
    },

    //关闭弹框
    closeDia(){
      this.dialogViewAccountVisible = false;
      this.dialogFormVisible = false;
      this.dialogAddFormVisible = false;
      this.dialogEditRightFormVisible = false;
      this.clearParame();
    },

    //打开角色编辑窗
    openRightDia(id, code){
      this.dialogEditRightFormVisible = true;
      this.formRight.accountCode = code;
      this.viewAccount(id, code, false);
    },
    //打开编辑窗
    openEditDia(id, accountCode){
      this.dialogFormVisible = true;
      this.viewAccount(id, accountCode, true);
    },

    //清空参数
    clearParame(){
      this.formData = {
        right: '',
        phone: '',
        name: '',
        password: ''
      },
      this.formAdd = {
        num: ''
      }
      this.formRight = {
        accountCode: '',
        rightList:[],
      }
    },

    //分页的方法
    handleCurrentChange(val) {
      this.pageInfo.current = val;
      this.searchAccount();
    }
  },
}
</script>
