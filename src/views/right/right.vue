<template>
  <div class="account m-view">
    <div class="m-wrap">
      <div class="m-head">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogAddFormVisible = true">增加权限</el-button>
      </div>
      <el-divider></el-divider>
      <div class="m-body">
        <el-table
          :data="tableData"
          style="width: 100%"
          tooltip-effect="dark">
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="rightName" label="权限名"></el-table-column>
          <el-table-column prop="rightUrl" label="权限"></el-table-column>
          <el-table-column
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="openRightDia(scope.row)">编辑权限</el-button>
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

      <!-- 增加权限弹框 -->
      <el-dialog title="增加权限" :visible.sync="dialogAddFormVisible" v-loading="loadingDia" :before-close="closeDia">
        <el-form>
          <el-form-item label="权限名">
            <el-input v-model="formAdd.rightName" size="small" placeholder="请输入权限名" clearable></el-input>
          </el-form-item>
          <el-form-item label="权限路径">
            <el-input v-model="formAdd.rightUrl" size="small" placeholder="请输入权限路径" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDia">取 消</el-button>
          <el-button size="small" type="primary" @click="addAccount" >确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑权限弹框 -->
      <el-dialog title="编辑权限" :visible.sync="dialogEditRightFormVisible" v-loading="loadingDia" :before-close="closeDia">
        <el-form>
          <el-form-item label="权限名">
            <el-input v-model="formRight.rightName" size="small" placeholder="请输入权限名" clearable></el-input>
          </el-form-item>
          <el-form-item label="权限路径">
            <el-input v-model="formRight.rightUrl" size="small" placeholder="请输入权限路径" clearable></el-input>
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
      dialogAddFormVisible: false,
      dialogEditRightFormVisible: false,
      viewRightInfo: {},//查看的用户信息
      options: [],//角色列表
      formRight: {//权限编辑表
        id: '',
        rightName: '',
        rightUrl: ''
      },
      formAdd:{ //新增角色表单
        rightName: '',
        rightUrl: ''
      },
      //表格
      tableData:[],
      pageInfo:{
        current: 1,
        pageSize: 10,
      },
      total: 0,
    }
  },
  mounted(){
    this.searchRight();
  },
  methods: {
    //查询
    searchRight(){
      this.loading = true;
      let parames = {
        ...this.pageInfo
      }
      this.$http.getRightList( parames )
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

    //新增账号
    addAccount(){
      this.loadingDia = true;
      let parames = {
        ...this.formAdd,
      }
      this.$http.addRight( parames )
          .then(({data}) => {
            this.loadingDia = false;
            this.dialogAddFormVisible = false;
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success' });
              this.searchRight();
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
      this.$http.editRight( parames )
          .then(({data}) => {
            this.loadingDia = false;
            this.dialogEditRightFormVisible = false;
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success' });
              this.searchRight();
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
      this.dialogAddFormVisible = false;
      this.dialogEditRightFormVisible = false;
      this.clearParame();
    },

    //打开角色编辑窗
    openRightDia(data){
      this.dialogEditRightFormVisible = true;
      let {id,rightName, rightUrl} = data;
      this.formRight = {
        id,
        rightName, 
        rightUrl
      }
    },

    //清空参数
    clearParame(){
      this.formAdd = {
        rightName: '',
        rightUrl: ''
      }
      this.formRight= {
        accountCode: '',
        rightList:[],
      }
    },

    //分页的方法
    handleCurrentChange(val) {
      this.pageInfo.current = val;
      this.searchRight();
    },
  },
}
</script>
