<template>
  <div class="app-container">

    <el-card class="box-card">

      <!-- 表格 -->
      <el-table
        :data="accountList"
        border
        style="width: 100%">

        <el-table-column
          prop="com_name"
          label="企业名称">
        </el-table-column>
        <el-table-column
          prop="con_name"
          label="服务商名称">
        </el-table-column>
        <el-table-column
          prop="frozen"
          label="发放中(元)">
        </el-table-column>
        <el-table-column
          prop="employ_acc"
          label="已发放(元)">
        </el-table-column>
        <el-table-column
          prop="balance"
          label="总余额(元)">
        </el-table-column>

      </el-table>
      <!-- /表格 -->

      <!-- 分页 -->
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <!-- /分页 -->
    </el-card>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAccount } from '@/api/capital'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      accountList: [],
      currentPage:1, //当前页数
      pageSize:10,
      total:0,

    }
  },
  mounted(){
    this.getAccountList(this.currentPage,this.pageSize)
  },
  methods:{
    //获取公司资金表
    getAccountList(page,page_size){
      getAccount({ page:page, page_size:page_size }).then(res => {
        this.accountList = res.data.list
        this.total = res.data.total
      })
    },
    onSubmit() {
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getAccountList(this.currentPage,this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAccountList(this.currentPage,this.pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
