<template>
  <div class="app-container">

    <el-card class="box-card first-card">
      <!-- 查询筛选项 -->
      <el-form :inline="true" :model="orderForm" class="screen-form-box"  size="mini">

        <el-form-item>
          <div class="form-title">订单号</div>
          <div class="form-item">
            <el-input v-model="orderForm.order" placeholder="订单号"></el-input>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="form-title">申请时间</div>
          <div class="form-item">
            <el-date-picker
              v-model="orderForm.daterange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="form-title">订单状态</div>
          <div class="form-item">
            <el-select v-model="orderForm.status">
              <el-option label="全部" value="0"></el-option>
              <el-option label="已取消" value="1"></el-option>
              <el-option label="已完成" value="2"></el-option>
              <el-option label="办理中(发放中)" value="3"></el-option>
              <el-option label="待支付" value="4"></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="form-title">业务类型</div>
          <div class="form-item">
            <el-select v-model="orderForm.type">
              <el-option label="全部" value="0"></el-option>
              <el-option label="微信" value="1"></el-option>
              <el-option label="支付宝" value="2"></el-option>
              <el-option label="银行卡" value="3"></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="form-title"></div>
          <div class="form-item">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button>重置</el-button>
          </div>
        </el-form-item>

      </el-form>
      <!-- /查询筛选项 -->

      <!-- 发放总金额 发成功金额 发放中金额 -->
      <el-row :gutter="60">
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="card-item">
              <div class="card-left">
                <svg-icon icon-class="card-icon1" class="server-icon" />
              </div>
              <div class="card-right">
                <div class="card-title">发放总金额</div>
                <div class="card-content">￥0.00</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- /发放总金额 发成功金额 发放中金额 -->
    </el-card>

    <el-card class="box-card">

      <!-- 导出xls -->
      <div class="btns-wrap-right">
        <el-button icon="el-icon-download" size="mini">导出xls</el-button>
      </div>
      <!-- /导出xls -->

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
      orderForm: {
        order: '',
        daterange:'',
        status:'0',
        type:'0',
      },
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
.card-item{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .card-left{
    font-size: 40px;
  }
  .card-right{
    text-align: right;

    .card-title{
      font-size: 12px;
      color: #b4b4b4;
    }
    .card-content{
      font-size: 20px;
      color: #666;
      padding-top: 10px;
    }
  }
}
.btns-wrap{
  text-align: right;
}
</style>
