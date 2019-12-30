<template>
  <div class="account" style="height: 100%">
    <div class="m-wrap">
      <div class="m-head">
        <el-input v-model="searchForm.input" placeholder="请输入内容" clearable  prefix-icon="el-icon-search"></el-input>
        <el-select v-model="searchForm.value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-radio v-model="searchForm.radio" label="1">备选项</el-radio>
        <el-radio v-model="searchForm.radio" label="2">备选项</el-radio>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-remove-outline">停用</el-button>
      </div>
      <el-divider></el-divider>
      <div class="m-body">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="ss日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    //分页的方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  data(){
    return{
      //查询
      searchForm:{
        input: '',
        value: '',
        radio: '1'
      },
      //选项
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
      }],
      //表格
      tableData:[{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },{ date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },],
      pageInfo:{
        currentPage: 4,
        size: 20,
        total: 100
      }
    }
  }
}
</script>
