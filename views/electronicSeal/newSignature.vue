<template>
  <div class="box">
    <div class="boxtop">
      <span v-if="this.$route.query.id">编辑签章用户</span>
      <span v-else>新增签章用户</span>
    </div>
    <div class="recordinp">
      <el-form ref="formfile" class="person-info form-with-border" :rules="rules" :model="formfile" hide-required-asterisk>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="userId" label-width="200px">
              <div slot="label" class="label">档案系统用户</div>
              <el-input v-model="formfile.userId" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="phone" label-width="200px">
              <div slot="label" class="label">用户手机号</div>
              <el-input v-model="formfile.phone" width="100" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="email" label-width="200px">
              <div slot="label" class="label">电子邮箱</div>
              <el-input v-model="formfile.email" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="userName" label-width="200px">
              <div slot="label" class="label">姓名</div>
              <el-input v-model="formfile.userName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="userType" label-width="200px">
              <div slot="label" class="label">用户类型</div>
              <el-select v-model="formfile.userType" placeholder="" class="active_select">
                <el-option
                  label="个人用户"
                  :value="1"
                />
                <el-option
                  label="企业用户"
                  :value="2"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="certType" label-width="200px">
              <div slot="label" class="label">证件类型</div>
              <el-select v-model="formfile.certType" placeholder="" class="active_select">
                <el-option
                  label="身份证"
                  :value="0"
                />
                <el-option
                  label="统一社会信用代码"
                  :value="7"
                />
                <el-option
                  label="其他证件"
                  :value="10"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="certNo" label-width="200px">
              <div slot="label" class="label">证件号码</div>
              <el-input v-model="formfile.certNo" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btn-box">
        <el-button type="primary" class="btn-color" size="mini" @click="goback">返回</el-button>
        <el-button v-if="this.$route.query.id" type="primary" class="btn-color" size="mini" @click="changelist">修改并退出</el-button>
        <el-button v-else type="primary" class="btn-color" size="mini" @click="addList">提交并退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import { addSignature, getSignature, changesignature } from '../../api/manage.js'
import { getUserProfile } from '@/api/system/user'

export default {
  data() {
    return {
      formfile: {
        // 证件号码
        certNo: '',
        // 证件类型
        certType: '',
        // 电子邮箱
        email: '',
        // 用户手机号
        phone: '',
        // 档案系统用户id
        userId: '',
        // 用户名称
        userName: '',
        // 用户类型
        userType: ''
      },
      rules: {
        userId: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
        userType: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        certType: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        certNo: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      miji: [{
        value: 0,
        label: '公开级'
      },
      {
        value: 1,
        label: '国内级'
      },
      {
        value: 2,
        label: '内部级'
      },
      {
        value: 3,
        label: '秘密级'
      },
      {
        value: 4,
        label: '机密级'
      },
      {
        value: 5,
        label: '绝密级'
      }],
      shixiang: [],
      value: '',
      yewu: {
        parentId: ''
      },
      numb: 1,
      id: 0,
      timeCreate: '',
      num: '',
      list: {
        pageNum: 1,
        pageSize: 10,
        id: 0
      }
    }
  },
  computed: {},
  created() {
    getUserProfile().then(res => {
      console.log(res)
      this.formfile.deptId = res.data.dept.deptId
    })
    if (this.$route.query.id) {
      this.list.id = this.$route.query.id
      getSignature(this.list).then(res => {
        console.log(res)
        this.formfile = res.rows[0]
        // this.listTotal = Number(res.total)
      })
    }
  },
  methods: {
    goback() {
      this.$router.back()
    },
    addList() {
      addSignature(this.formfile).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message({
            message: '添加成功',
            type: 'warning'
          })
          this.$router.back()
        }
      })
    },
    changelist() {
      changesignature(this.formfile).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped>
.box {
  border: 1px solid rgba(121, 121, 121, 0.1);
  width: 1200px;
  height: 1000px;
  margin: 50px 0 100px 80px;
  border-radius: 12px;
}

.boxtop {
  width: 100%;
  height: 60px;
  background-color: #f9f9f9;
  padding-top: 20px;
  padding-left: 20px;
  border-radius: 12px 12px 0 0;
}

.recordinp {
  height: 100px;
  margin: 0 20px 20px 40px;
}
.person-info {
    width: 98.7%;
    margin: 0.2% 0 1% 10px;
    color: #8e9fc2;
    border-top: 1px solid rgba(121, 121, 121, 0.1);
    border-left: 1px solid rgba(121, 121, 121, 0.1);
}

.person-info>>>.el-form-item__label{
  padding: 0;
  border-right: 1px solid rgba(121, 121, 121, 0.1);
  /* margin-bottom: 0px; */
}
.person-info>>>.el-col{
  border-bottom: 1px solid rgba(121, 121, 121, 0.1);
}
.label{
  padding-left: 20px;
  text-align: left;
  /* background-color: #FAFAFA; */
  /* text-align: center; */
}
.person-info>>>.el-input{
  border-top: 0;
  height: 100%;
  border-right: 1px solid rgba(121, 121, 121, 0.1);
}
.person-info>>>el-input.is-disabled .el-input__inner{
  cursor: default !important;
}
.person-info>>>.el-input__inner{
  border: 0;
  border-radius: 0;
  border-top: 0;
  border-bottom: 0;
  background-color: #fff;
  color: #606266;
  margin: 20px 0;
}

.label{
  font-weight: 500;
  padding: 20px 10px 20px 20px;
  background-color: #f6f8fa;
}

.el-form-item {
    margin-bottom: 0px;
}

.form-with-border {
  border: 1px solid rgba(121, 121, 121, 0.1);
  /* padding: 20px; */
  margin-top: 40px;
  margin-bottom: 50px;
}

.recordinp>>>.el-textarea__inner{
  /* height: 150px; */
  resize: none;
}

.recordinp > .tijiao{
  display: flex;
  justify-content: space-evenly;
}
.recordinp > .tablebiao{
  margin: 30px 0 30px 0;
}

.btn-box{
  /* padding: 0 0 30px 0;
  display: flex;
  justify-content: space-around; */
  /* margin: 0 auto; */
  text-align: center;
}

.active_select{
  width: 100%;
}

</style>
