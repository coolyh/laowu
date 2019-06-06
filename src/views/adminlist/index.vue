<template>
  <div class="app-container">
    <!-- 添加 -->
    <div class="btns-wrap">
      <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-plus">新增管理员</el-button>
    </div>

    <!-- 添加客户 -->
    <el-dialog title="新增客户" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="公司名称"> 
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /添加客户 -->

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
      formInline: {
        user: '',
        region: '',
        level:'',
        daterange:''
      },
      tableData: [
        {
          companyName: 'Ghhhhio  刚刚好',
          tel: '手机号码',
          contacts: '联系人',
          address: '地区',
          detailedAddress: '详细地址',
          level: '意向级别',
        },{
          companyName: 'Ghhhhio  刚刚好',
          tel: '手机号码',
          contacts: '联系人',
          address: '地区',
          detailedAddress: '详细地址',
          level: '意向级别',
        },{
          companyName: 'Ghhhhio  刚刚好',
          tel: '手机号码',
          contacts: '联系人',
          address: '地区',
          detailedAddress: '详细地址',
          level: '意向级别',
        }
      ],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods:{
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
.btns-wrap{
  margin-bottom: 15px;
}
</style>
