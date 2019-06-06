<template>
  <div class="app-container">

    <el-card class="box-card first-card">
      
      <!-- tabs -->
      <el-tabs v-model="activeName" class="no-border-tabs">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="签约完成" name="second"></el-tab-pane>
        <el-tab-pane label="未完成签约" name="third"></el-tab-pane>
      </el-tabs>

      <!-- 查询筛选项 -->
      <el-form :inline="true" :model="orderForm" class="screen-form-box screen-form-box-more"  size="mini">

        <div class="screen-form-box-left">

          <div class="screen-form-row">
            <el-form-item>
              <div class="form-title">收款人姓名</div>
              <div class="form-item">
                <el-input v-model="orderForm.order" placeholder="收款人姓名"></el-input>
              </div>
            </el-form-item>

            <el-form-item>
              <div class="form-title">收款账号</div>
              <div class="form-item">
                <el-input v-model="orderForm.order" placeholder="收款账号"></el-input>
              </div>
            </el-form-item>

            <el-form-item>
              <div class="form-title">交易状态</div>
              <div class="form-item">
                <el-select v-model="orderForm.status">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="支付成功" value="1"></el-option>
                  <el-option label="支付失败" value="2"></el-option>
                  <el-option label="支付中" value="3"></el-option>
                </el-select>
              </div>
            </el-form-item>

            <el-form-item>
              <div class="form-title">请求起止时间</div>
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
              <div class="form-title">发放时间</div>
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
          </div>

          <div class="screen-form-row" v-show="!isMore">

            <el-form-item>
              <div class="form-title">发放方式</div>
              <div class="form-item">
                <el-select v-model="orderForm.status">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="支付成功" value="1"></el-option>
                  <el-option label="支付失败" value="2"></el-option>
                  <el-option label="支付中" value="3"></el-option>
                </el-select>
              </div>
            </el-form-item>

            <el-form-item>
              <div class="form-title">客户订单号</div>
              <div class="form-item">
                <el-input v-model="orderForm.order" placeholder="客户订单号"></el-input>
              </div>
            </el-form-item>

            <el-form-item>
              <div class="form-title">发放渠道</div>
              <div class="form-item">
                <el-select v-model="orderForm.status">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="支付成功" value="1"></el-option>
                  <el-option label="支付失败" value="2"></el-option>
                  <el-option label="支付中" value="3"></el-option>
                </el-select>
              </div>
            </el-form-item>

            <el-form-item>
              <div class="form-title">客户订单号</div>
              <div class="form-item">
                <el-input v-model="orderForm.order" placeholder="客户订单号"></el-input>
              </div>
            </el-form-item>

          </div>

        </div>

        <div class="screen-form-box-right">

          <el-form-item>
            <div class="form-title"></div>
            <div class="form-item form-more-btns">
              <span class="open-more" @click="onMoreShow">
                <span v-show="isMore">
                  展开更多
                  <i class="el-icon-arrow-down"></i>
                </span>
                <span v-show="!isMore">
                  收起
                  <i class="el-icon-arrow-up"></i>
                </span>
              </span>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button>重置</el-button>
            </div>
          </el-form-item>

        </div>

      </el-form>
      <!-- /查询筛选项 -->

      <!-- 添加 -->
      <div class="btns-wrap">
        <el-button type="primary" icon="el-icon-tickets" size="mini" @click="onNotice">
          <span v-show="isNotice">批量重发通知</span>
          <span v-show="!isNotice">取消批量重发通知</span>
        </el-button>
        <el-button type="primary" icon="el-icon-tickets" size="mini" @click="onCancel">
          <span v-show="isCancel">批量取消</span>
          <span v-show="!isCancel">取消批量取消</span>
        </el-button>
      </div>

      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-show="isSelection">

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

      </el-table>
      <!-- /表格 -->

      <!-- 带选择的表格 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-show="!isSelection">
        <!-- checkBox -->
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

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

      </el-table>
      <!-- /带选择的表格 -->

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

    <!-- 底部批量确定层 -->
    <div class="down-tip" v-show="!isSelection">
      已选 
      <span class="number">0</span>
      条，是否确认批量
      <span v-show="!isNotice">重发</span>
      <span v-show="!isCancel">取消</span>
      ？
      <el-button class="tip-btn" @click="onTipCancel">取消</el-button>
      <el-button class="tip-btn" type="primary">确认</el-button>
    </div>
    <!-- /底部批量确定层 -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { constants } from 'crypto';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      activeName: 'first',
      orderForm: {
        order: '',
        daterange:'',
        status:'0',
        type:'0',
      },
      isMore:true,
      isSelection:true,
      isNotice:true,
      isCancel:true,
      tableData: [
        {
          companyName: 'Ghhhhio  刚刚好',
          tel: '手机号码',
          contacts: '联系人',
          address: '地区',
          detailedAddress: '详细地址',
          level: '意向级别',
        },
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
    onMoreShow(){
      this.isMore ? this.isMore = false : this.isMore = true
    },
    onNotice(){
      if(this.isNotice){
        this.isNotice = !this.isNotice
        this.isCancel = !this.isNotice
        this.isSelection = false
      }else{
        this.isNotice = true
        this.isSelection = true
      }
    },
    onCancel(){
      if(this.isCancel){
        this.isCancel = !this.isCancel
        this.isNotice = !this.isCancel
        this.isSelection = false
      }else{
        this.isCancel = true
        this.isSelection = true
      }
    },
    onTipCancel(){
      this.isNotice = this.isCancel = this.isSelection = true
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
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
