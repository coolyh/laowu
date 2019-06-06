<template>
  <div class="app-container">

    <el-card class="box-card">

      <!-- 添加 -->
      <div class="btns-wrap">
        <el-button type="primary" icon="el-icon-document" size="mini">创建申请表</el-button>
      </div>

      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%">

        <el-table-column
          prop="companyName"
          label="用户名">
        </el-table-column>

        <el-table-column
          prop="tel"
          label="手机号码">
        </el-table-column>

        <el-table-column
          prop="contacts"
          label="昵称">
        </el-table-column>

        <el-table-column
          prop="address"
          label="所属上级">
        </el-table-column>

        <el-table-column
          prop="detailedAddress"
          label="职务">
        </el-table-column>

        <el-table-column
          prop="level"
          label="用户角色">
        </el-table-column>

        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)">修改密码</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- /表格 -->

      <!-- 分页 -->
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
      <!-- /分页 -->
    </el-card>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      tableData: [
        {
          companyName: 'Ghhhhio  刚刚好',
          tel: '手机号码',
          contacts: '联系人',
          address: '地区',
          detailedAddress: '详细地址',
          level: '意向级别',
        }
      ],
      currentPage:1, //当前页数
    }
  },
  methods:{
    onSubmit() {
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-form-box{

  .form-title{
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    color: #666;
  }
}
</style>
