<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu clearFix">

      <el-dropdown class="avatar-container right-menu" trigger="click">
        <div class="avatar-wrapper">
          你好，{{name}}
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="changePasswordVisible = true">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="avatar-wrapper right-menu" style="margin:0 10px;color: #606266;font-size: 14px;">|</div>

      <div class="avatar-wrapper right-menu" style="color: #606266;font-size: 14px;"
      @click="onSwitchingCompanyVisible"
      :id ="user_id">
        {{com_name}} 
        <i class="el-icon-caret-bottom "/>
      </div>

    </div>
    
    <!-- 修改密码 -->
    <el-dialog title="修改密码" 
      :visible.sync="changePasswordVisible" 
      width="600px">
      <el-form :model="changePasswordForm"
        status-icon 
        :rules="changePasswordRules"
        ref="changePasswordForm"
        label-width="100px">
        <el-form-item label="原密码" prop="password" required> 
          <el-input v-model="changePasswordForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password_new" required> 
          <el-input v-model="changePasswordForm.password_new" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="password_re" required> 
          <el-input v-model="changePasswordForm.password_re" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onChangePassword">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /修改密码 -->
    
    <!-- 切换公司 -->
    <el-dialog title="切换公司" 
      :visible.sync="switchingCompanyVisible" 
      width="600px">

      <el-table
      :data="companyTableData"
      v-loading="companyLoading"
      style="width: 100%">
        <el-table-column
          prop="com_name"
          label="商户名称">
        </el-table-column>
        <el-table-column
          prop="com_id"
          label="操作"
          width="90px">
          <template slot-scope="scope">
            <el-button @click="onSwitchingCompany(scope.row)" type="text" size="small">切换</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPageCompany"
        :page-size="page_size"
        layout="total, prev, pager, next, jumper"
        :total="totalCompany"
        style="padding-top:20px;text-align:right;">
      </el-pagination>

    </el-dialog>
    <!-- /切换公司 -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updatePwd, getCompany, switchCompany } from '@/api/user'

export default {
  data(){

    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }

    var validatePassword_new = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.changePasswordForm.password_re !== '') {
          this.$refs.changePasswordForm.validateField('password_re');
        }
        callback()
      }
    }

    var validatePassword_re = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.changePasswordForm.password_new) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      switchingCompanyVisible:false,
      changePasswordVisible: false,
      changePasswordForm: {
        username: '',
        password: '',
        password_new: '',
        password_re: '',
      },
      changePasswordRules: {
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        password_new: [
          { validator: validatePassword_new, trigger: 'blur' }
        ],
        password_re: [
          { validator: validatePassword_re, trigger: 'blur' }
        ]
      },
      companyLoading:true,
      companyTableData: [],
      currentPageCompany:1,
      page_size:5,
      totalCompany:0,
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'user_name',
      'com_name',
      'user_id'
    ])
  },
  mounted(){
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    // 退出登录
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    
    // 修改密码
    onChangePassword(){
      // 添加用户名的值
      this.changePasswordForm.username = this.user_name

      this.$refs['changePasswordForm'].validate((valid) =>{
        if ( valid ) {
          updatePwd(this.changePasswordForm).then( res => {
            // console.log(res)
            if(res && res.code === 200){
              this.$notify({
                title: '成功',
                message: res.msg,
                type: 'success'
              })
              // 重置密码修改
              this.$refs['changePasswordForm'].resetFields();
              // 关闭弹层
              this.changePasswordVisible = false
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })

    },
    //取消按钮
    onCancel(){
      // 重置密码修改
      this.$refs['changePasswordForm'].resetFields();
      // 关闭弹层
      this.changePasswordVisible = false
    },
    //获取公司列表
    getCompanyData(page,page_size){
      let data = {}
      if(page && page_size){
        data.page = page
        data.page_size = page_size
      }
      getCompany( data ).then(res => {
        this.companyTableData = res.data.list
        this.totalCompany = res.data.total
        this.companyLoading = false
      })
    },
    // 打开/关闭 公司切换列表弹层
    onSwitchingCompanyVisible(){
      this.switchingCompanyVisible = true
      this.getCompanyData(this.currentPageCompany,this.page_size)
    },
    // 切换公司
    onSwitchingCompany(row){
      switchCompany({com_id : row.com_id}).then(res => {
        location.reload()
        console.log( row.com_id )
      })
    },
    // 每页 ${val} 条
    handleSizeChange(val) {
      this.page_size = val
      this.getCompanyData(this.currentPageCompany,val)
    },
    // 当前页: ${val}
    handleCurrentChange(val) {
      this.currentPageCompany = val
      this.getCompanyData(val,this.page_size)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
