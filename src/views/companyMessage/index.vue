<template>
  <div class="app-container home">

    <el-row :gutter="20">

      <el-col :span="12" >

        <!-- 基本信息 -->
        <el-card class="box-card" style="margin-bottom:20px;">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>

          <ul class="infoList">
            <li class="infoItem">
              <span>企业名称</span>
              <span>{{userInfo.com_name}}</span>
            </li>
            <li class="infoItem">
              <span>企业地址</span>
              <span>{{userInfo.com_address}}</span>
            </li>
            <li class="infoItem">
              <span>负责人</span>
              <span>{{userInfo.nick_name}}</span>
            </li>
            <li class="infoItem">
              <span>负责人电话</span>
              <span>{{userInfo.user_name}}</span>
            </li>
          </ul> 
        </el-card>
        <!-- /基本信息 -->

        <!-- 邮寄地址 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>邮寄地址</span>
            <el-button class="box-card-btn" type="primary" size="mini"  @click="onAddressVisible">修改</el-button>
          </div>

          <ul class="infoList">
            <li class="infoItem">
              <span>收票人</span>
              <span>{{userInfo.mailing_collector}}</span>
            </li>
            <li class="infoItem">
              <span>电话</span>
              <span>{{userInfo.mailing_phone}}</span>
            </li>
            <li class="infoItem">
              <span>地址</span>
              <span>{{userInfo.mailing_address}}</span>
            </li>
          </ul> 
        </el-card>
        <!-- /邮寄地址 -->
        
      </el-col>

      <!-- 开票信息 -->
      <el-col :span="12">
        <el-card class="box-card" style="height:431px;">
          <div slot="header" class="clearfix">
            <span>开票信息</span>
            <el-button class="box-card-btn" type="primary" size="mini" @click="onInvoiceVisible">修改</el-button>
          </div>

          <ul class="infoList">
            <li class="infoItem">
              <span>开票企业名称</span>
              <span>{{userInfo.invoice_com_name}}</span>
            </li>
            <li class="infoItem">
              <span>纳税识别号</span>
              <span>{{userInfo.invoice_tax_identification_number}}</span>
            </li>
            <li class="infoItem">
              <span>地址</span>
              <span>{{userInfo.invoice_address}}</span>
            </li>
            <li class="infoItem">
              <span>电话号码</span>
              <span>{{userInfo.invoice_phone}}</span>
            </li>
            <li class="infoItem">
              <span>开户银行</span>
              <span>{{userInfo.invoice_bank}}</span>
            </li>
            <li class="infoItem">
              <span>银行账号</span>
              <span>{{userInfo.invoice_bank_number}}</span>
            </li>
          </ul> 
        </el-card>
      </el-col>
      <!-- /开票信息 -->

    </el-row>

    <!-- 签约信息 -->
    <el-row style="padding-top:20px;">
      <el-col :span="24">
        <el-card class="box-card entries">
          <div slot="header" class="clearfix">
            <span>签约信息</span>
          </div>

          <!-- 表格 -->
          <el-table
            :data="serviceList"
            border
            style="width: 100%">

            <el-table-column
              prop="contract_number"
              label="合同编号">
            </el-table-column>
            <el-table-column
              prop="con_name"
              label="签约服务商">
            </el-table-column>
            <el-table-column
              prop="con_settlement"
              label="结算方式">
            </el-table-column>
            <el-table-column
              prop="description_service_charges"
              label="服务费比例">
            </el-table-column>
            <el-table-column
              prop="invoice_status"
              label="发票类型">
            </el-table-column>
            <el-table-column
              prop="contract_c_e_time"
              label="合同起止时间">
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
              :page-size="page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
          <!-- /分页 -->

        </el-card>
      </el-col>
    </el-row>
    <!-- /签约信息 -->
    
    <!-- 邮寄地址-修改弹出层 -->
    <el-dialog title="修改邮寄地址" :visible.sync="addressVisible" width="600px">
      <el-form :model="userInfoNew" label-width="100px" size="mini">
        <el-form-item label="收票人"> 
          <el-input v-model="userInfoNew.mailing_collector" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="电话"> 
          <el-input v-model="userInfoNew.mailing_phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址"> 
          <el-input v-model="userInfoNew.mailing_address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addressVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="onAddressSubmit" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /邮寄地址-修改弹出层 -->
    
    <!-- 开票信息-修改弹出层 -->
    <el-dialog title="修改开票信息" :visible.sync="invoiceVisible" width="600px">
      <el-form :model="userInfoNew" label-width="100px" size="mini">
        <el-form-item label="开票企业名称"> 
          <el-input v-model="userInfoNew.invoice_com_name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="纳税识别号"> 
          <el-input v-model="userInfoNew.invoice_tax_identification_number" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="地址"> 
          <el-input v-model="userInfoNew.invoice_address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码"> 
          <el-input v-model="userInfoNew.invoice_phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户银行"> 
          <el-input v-model="userInfoNew.invoice_bank" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行账号"> 
          <el-input v-model="userInfoNew.invoice_bank_number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="invoiceVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="onInvoiceSubmit" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /开票信息-修改弹出层 -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getInfo, editInvoice, editMailAddress, getServiceList } from '@/api/user'
import { parseTime } from '@/utils/index'

export default {
  name: 'Home',
  data() {
    return {
      userInfo:{},
      userInfoNew:{},
      
      addressVisible: false,
      invoiceVisible: false,

      serviceList: [],
      currentPage:1,
      page_size:10,
      total:0,
    }
  },
  computed: {
    ...mapGetters([
      'com_id'
    ])
  },
  mounted(){
    this.getComInfo()
    this.getServiceData(this.currentPage,this.page_size)
  },
  methods:{
    // 获取企业基本信息
    getComInfo(){
      getInfo().then(res => {
        this.userInfo = res.data
      })
    },
    // 邮寄地址
    onAddressVisible(){
      this.addressVisible = true
      this.userInfoNew = JSON.parse(JSON.stringify(this.userInfo))
    },
    onAddressSubmit(){
      this.userInfo = this.userInfoNew

      editMailAddress({ com_id : this.com_id,...this.userInfoNew }).then(res => {
        // console.log(res)
        if(res && res.code === 200){
          this.$notify({
            title: '成功',
            message: res.msg,
            type: 'success'
          })
          // 关闭弹层
          this.addressVisible = false
        }
      })
    },
    // 开票信息
    onInvoiceVisible(){
      this.invoiceVisible = true
      this.userInfoNew = JSON.parse(JSON.stringify(this.userInfo))
    },
    onInvoiceSubmit(){
      this.userInfo = this.userInfoNew

      editInvoice({ 
        com_id : this.com_id,
        invoice_address: this.userInfoNew.invoice_address,
        invoice_phone: this.userInfoNew.invoice_phone,
        invoice_bank: this.userInfoNew.invoice_bank,
        invoice_bank_number: this.userInfoNew.invoice_bank_number
      }).then(res => {
        // console.log(res)
        if(res && res.code === 200){
          this.$notify({
            title: '成功',
            message: res.msg,
            type: 'success'
          })
          // 关闭弹层
          this.invoiceVisible = false
        }
      })
    },
    // 签约信息
    getServiceData(page,page_size){
      getServiceList({
        status:1,
        page:page,
        page_size:page_size
      }).then(res => {
        this.serviceList = this.arrangeData(res.data.list)
        this.total = res.data.total
      })
    },
    arrangeData(list){
      let arr = []
      list.forEach((item) => {
        //结算方式 1、日结 2、月结
        let con_settlement
        if(item.con_settlement == 1){
          con_settlement = '日结'
        }else if(item.con_settlement == 2){
          con_settlement = '月结'
        }
        //发票类型 1、普通发票 2、增值税专用发票 3、其他发票
        let invoice_status
        if(item.invoice_status == 1){
          invoice_status = '普通发票'
        }else if(item.invoice_status == 2){
          invoice_status = '增值税专用发票'
        }else if(item.invoice_status == 3){
          invoice_status = '其他发票'
        }
        arr.push({
          contract_number: item.contract_number,
          con_name: item.con_name,
          con_settlement: con_settlement,
          description_service_charges: item.description_service_charges,
          invoice_status: invoice_status,
          contract_c_e_time: `${parseTime(item.contract_c_time, "{y}-{m}-{d}")} 至 ${parseTime(item.contract_e_time, "{y}-{m}-{d}")}`
        })
      })
      return arr
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getServiceData(this.currentPage,this.page_size)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getServiceData(this.currentPage,this.page_size)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card{
  position: relative;

  .box-card-btn{
    position: absolute;
    top: 12px;
    right: 20px;
  }
}
.infoList{
  padding: 0;
  margin: 0;

  .infoItem{
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 14px;
    color: #666;
  }
}
</style>
