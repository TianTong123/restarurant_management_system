<template>
  <div class="account m-view">
    <div class="m-wrap">
      <div class="m-head">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addAccound">增加账号</el-button>
      </div>
      <el-divider></el-divider>
      <div class="m-body">
        <el-table
          :data="tableData"
          style="width: 100%"
          tooltip-effect="dark" 
          :default-sort = "{prop: 'originalCost', saleCost: 'descending'}">
          <el-table-column prop="accountCode" label="账号code" width="180"></el-table-column>
          <el-table-column prop="id" label="账号id" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="createDate" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
        </el-table>

        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageInfo.current"
          :page-size="pageInfo.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loading: false,
      loadingDia: false,
      formAdd:{ //新增账号表单

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
    this.searchAccound();
  },
  methods: {
    //查询
    searchAccound(){
      this.loading = true;
      let parames = {
        ...this.pageInfo,
      }
      this.$http.accoundList( parames )
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
    addAccound(){

    },

    //分页的方法
    handleCurrentChange(val) {
      this.pageInfo.current = val;
      this.searchAccound();
    }
  },
}
</script>
