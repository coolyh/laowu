<template>
  <div class="app-container home">
    <!-- 账户余额 近7天薪酬发放 常用服务 -->
    <el-row :gutter="20">

      <!-- 账户余额 -->
      <el-col :span="12" >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>账户余额</span>
            <el-button style="float: right; padding: 0;"
              type="text"
              @click="$router.push('/recharge/balanceDetail')">
            查看详情>
            </el-button>
          </div>
          <div class="account-balance">
            <el-table
              :data="accountList"
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
                label="发放中(元)"
                width="110">
              </el-table-column>
              <el-table-column
                prop="employ_acc"
                label="已发放(元)"
                width="110">
              </el-table-column>
              <el-table-column
                prop="balance"
                label="总余额(元)"
                width="110">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <!-- /账户余额 -->

      <!-- 近7天薪酬发放 -->
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>近7天薪酬发放</span>
          </div>
          <!-- chart -->
          <Chart></Chart>
        </el-card>
      </el-col>
      <!-- /近7天薪酬发放 -->

    </el-row>

    <!-- 常用服务 -->
    <el-row>
      <el-col :span="24">
        <el-card class="box-card entries">
          <div slot="header" class="clearfix">
            <span>常用服务</span>
          </div>

          <div class="server-box">
            <el-card class="server-item" shadow="hover">
              <svg-icon icon-class="server-icon1" class="server-icon" />
              <span>薪酬发放</span>
            </el-card>
            <el-card class="server-item" shadow="hover">
              <svg-icon icon-class="server-icon2" class="server-icon" />
              <span>充值记录</span>
            </el-card>
            <el-card class="server-item" shadow="hover">
              <svg-icon icon-class="server-icon3" class="server-icon" />
              <span>账单下载</span>
            </el-card>
            <el-card class="server-item" shadow="hover">
              <svg-icon icon-class="server-icon4" class="server-icon" />
              <span>发票管理</span>
            </el-card>
            <el-card class="server-item" shadow="hover">
              <svg-icon icon-class="server-icon5" class="server-icon" />
              <span>电子签约</span>
            </el-card>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <!-- /常用服务 -->

    <!-- /账户余额 近7天薪酬发放 常用服务 -->
  </div>
</template>

<script>
import Chart from '@/components/Charts/pay'
import { getAccount } from '@/api/capital'

export default {
  name: 'Home',
  components: { Chart },
  data() {
    return {
      accountList: [],
    }
  },
  mounted(){
    this.getAccountList()
  },
  methods:{
    getAccountList(){
      getAccount().then(res => {
        this.accountList = res.data.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  .entries{
    margin-top: 20px;
  }
  .account-balance{
    height:260px;
    overflow-y: auto;
  }
  .server-box{
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .server-item{
      width: 200px;
      cursor: pointer;

      .server-icon{
        font-size: 30px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
}
</style>
