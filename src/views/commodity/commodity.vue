<template>
  <div class="commodity" style="height: 100%">
    <div class="m-wrap">
      <!-- 头 -->
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
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-radio v-model="searchForm.radio" label="1">已下架</el-radio>
        <el-radio v-model="searchForm.radio" label="2">已上架</el-radio>
        <el-button type="primary" icon="el-icon-remove-outline">下架</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">新增商品</el-button>
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
          <el-table-column prop="originalCost" label="原价" sortable width="180"></el-table-column>
          <el-table-column prop="saleCost" label="现价" sortable width="180"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
        </el-table>

        <!-- 分页 -->
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
      <!-- 弹框 -->
      <el-dialog title="新增商品" :modal="false" :visible.sync="dialogFormVisible" v-loading="loading">
        <el-form :model="formData">
          <div class="myform-item">
            <el-form-item label="商品名:">
              <el-input size="small" v-model="formData.commodityName"></el-input>
            </el-form-item>   
            <el-form-item label="类型:">
            <el-select size="small" v-model="formData.type" placeholder="请选择商品类型">
              <el-option label="区域一"  value="shanghai"></el-option>
              <el-option label="区域二"  value="beijing"></el-option>
            </el-select>
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
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="formData.picUrl" :src="formData.picUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="添加备选:">
              <el-select v-model="formData.options" multiple filterable allow-create default-first-option size="small" placeholder="请选择商品类型">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="描述:">
            <el-input rows="4" v-model="formData.remark" type="textarea" maxlength="240" show-word-limit></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
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
    },
    //选中的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      this.formData.picUrl = URL.createObjectURL(file.raw);
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
  },
  data(){
    return{
      loading: false,
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
      tableData:[],
      pageInfo:{
        currentPage: 4,
        size: 20,
        total: 100
      },
      //弹框表单
      formData:{
        commodityName: '',//商品名
        options:'',//备选
        picUr: '',//图片
        remark: '',//描述
        saleCost: '',//售/现价
        originalCost: '',//原价
        type: '',//商品类型
        creator: '',//创建人
        creatorAccount: '',//创建者账户
        options: [],//备选
      },
      //弹框
      dialogFormVisible: true,
    }
  }
}
</script>
