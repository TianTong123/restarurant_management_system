<template>
  <div class="account m-view">
    <div class="m-wrap">
      <div class="m-head">
        <div class="m-label">角色名:</div><el-input v-model="formSearch.roleName" placeholder="请输入内容" clearable  prefix-icon="el-icon-search"></el-input>
        <el-radio v-model="formSearch.status" @change="stateChange" label="0">已停用</el-radio>
        <el-radio v-model="formSearch.status" @change="stateChange" label="1">已启用</el-radio>
        <el-button type="primary" icon="el-icon-search" @click="searchRole">搜索</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogAddFormVisible = true">增加角色</el-button>
        <el-button type="primary" icon="el-icon-remove-outline" @click="upRole" v-show="formSearch.status==1">停用</el-button>
        <el-button type="primary" icon="el-icon-remove-outline" @click="upRole" v-show="formSearch.status==0">启用</el-button>
      </div>
      <el-divider></el-divider>
      <div class="m-body">
        <el-table
          :data="tableData"
          style="width: 100%"
          tooltip-effect="dark" 
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="roleName" label="角色名"></el-table-column>
          <el-table-column prop="createDate" label="创建时间"></el-table-column>
          <el-table-column prop="creator" label="创建人"></el-table-column>
          <el-table-column prop="status" label="状态">
             <template slot-scope="scope">
                <span v-if="scope.row.status == 1">启用</span>
                <span v-if="scope.row.status == 0">停用</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewRole(scope.row.id, false)">查看</el-button>
              <el-button type="text" size="small" @click="openRoleDia(scope.row.id, scope.row.roleName)">编辑角色</el-button>
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

      <!-- 查看角色弹框 -->
      <el-dialog title="查看角色" :visible.sync="dialogViewAccountVisible" v-loading="loadingDia" :before-close="closeDia">
        <div class="content" style="display: inline-block; margin-left: 20px">
          <div class="my-line-style"><span>账号id：</span>{{viewRoleInfo.id}}</div>
          <div class="my-line-style"><span>角色：</span>{{viewRoleInfo.roleName}}</div>
          <div class="my-line-style"><span>创建时间：</span>{{viewRoleInfo.createDate}}</div>
          <div class="my-line-style"><span>状态：</span>
            <span class="green-color" v-if="viewRoleInfo.status == 1">启用</span>
            <span class="red-color" v-if="viewRoleInfo.status == 0">停用</span>
          </div>
          <div class="my-line-style"><span>权限：</span>
            <span v-for="(e, index) in viewRoleInfo.rights" :key="index">
              <span class="red-color" >{{e.rightName}}、&nbsp;</span>
            </span>
          </div>
        </div>
      </el-dialog>

      <!-- 增加角色弹框 -->
      <el-dialog title="增加角色" :visible.sync="dialogAddFormVisible" v-loading="loadingDia" :before-close="closeDia">
        <el-form>
          <el-form-item label="角色名">
            <el-input v-model="formAdd.roleName" size="small" placeholder="请输入要增加角色名" clearable></el-input>
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
          <el-form-item label="角色名">
            <el-input v-model="formRole.roleName" size="small" placeholder="更改角色名" clearable></el-input>
          </el-form-item>
          <el-form-item label="权限:">
            <el-select v-model="formRole.rightList" style="width: 100%" multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.rightName"
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
import util from "@/util/utils"

export default {
  data(){
    return{
      loading: false,
      loadingDia: false,
      dialogViewAccountVisible: false,
      dialogAddFormVisible: false,
      dialogEditRightFormVisible: false,
      viewRoleInfo: {},//查看的用户信息
      options: [],//角色列表
      formRole: {//权限编辑表
        roleName: '',
        roleId: '',
        rightList:[],
      },
      formSearch:{//查找角色
        roleName: '',
        status: '1',
      },
      formAdd:{ //新增角色表单
        roleName: '',
        creator: util.getSession('user').name,
        status: 1,
      },
      //表格
      tableData:[],
      pageInfo:{
        current: 1,
        pageSize: 10,
      },
      total: 0,
      multipleSelection: [],//选中的角色
    }
  },
  mounted(){
    this.searchRole();
    this.getRightList();
  },
  methods: {
    //查询
    searchRole(){
      this.loading = true;
      let parames = {
        ...this.pageInfo,
        ...this.formSearch,
      }
      this.$http.getRoleList( parames )
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

    //查看角色
    viewRole(id, flag){
      if(!flag){
         this.dialogViewAccountVisible = true;
      }
      this.loadingDia = true;
      let parames = {
        id: id,
      }
      this.$http.getRole( parames )
         .then(({data}) => {
           this.loadingDia = false;
           if (data.code == 0){
             this.viewRoleInfo = data.data;
             if(data.data.rights.length > 0){
               this.viewRoleInfo.rights = data.data.rights;
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

    //新增角色
    addAccount(){
      this.loadingDia = true;
      let parames = {
        ...this.formAdd,
      }
      this.$http.addRole( parames )
          .then(({data}) => {
            this.loadingDia = false;
            this.dialogAddFormVisible = false;
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success' });
              this.searchRole();
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

    //停/启用角色
    upRole(){
      if(this.multipleSelection.length == 0){
        this.$myMsg.notify({ content: '请选择至少一条数据再进行该操作！', type: 'error'});
        return
      }
      this.loading = true;
      let parames = {
        flag: this.formSearch.status==0?1:0,
        idList: this.multipleSelection.map(v=>v.id),
      }
      this.$myMsg.confirm({
        type: 'prompt',
        content: `是否${this.formSearch.status == 0?'启用':'停用'}这些账号！`,
        cancelFlag: true,
        callback: ()=> {
          this.$http.upOrDownRole( parames )
          .then(({data}) => {
            this.loading = false;
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success'});
              this.searchRole();
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
    //获取权限列表
    getRightList(){
      let parames = {
        current: 1,
        pageSize: 10000,
      }
      this.$http.getRightList( parames )
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

    //角色编辑
    editRight(){
      this.loadingDia = true;
      let parames = {
        ...this.formRole,
      }
      this.$http.editRole( parames )
          .then(({data}) => {
            this.loadingDia = false;
            this.dialogEditRightFormVisible = false;
            if (data.code == 0){
              this.$myMsg.notify({ content: data.msg, type: 'success' });
              this.searchRole();
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

    //改变状态
    stateChange(){
      this.searchRole();
    },

    //关闭弹框
    closeDia(){
      this.dialogViewAccountVisible = false;
      this.dialogAddFormVisible = false;
      this.dialogEditRightFormVisible = false;
      this.clearParame();
    },

    //打开角色编辑窗
    openRoleDia(id, name){
      this.dialogEditRightFormVisible = true;
      this.formRole.roleId = id;
      this.formRole.roleName = name;
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
    //分页的方法
    handleCurrentChange(val) {
      this.pageInfo.current = val;
      this.searchRole();
    }
  },
}
</script>
