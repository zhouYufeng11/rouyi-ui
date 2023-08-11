<template>
  <div class="box">
    <div class="boxtop">
      <span>查看档案著录</span>
    </div>
    <div class="recordinp">
      <el-form ref="personInfo" class="person-info form-with-border" :model="personInfo" hide-required-asterisk>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="parentId" label-width="200px">
              <div slot="label" class="label">业务流水号</div>
              <el-input v-model="personInfo.parentId" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="daNo" label-width="200px">
              <div slot="label" class="label">档案号</div>
              <el-input v-model="personInfo.daNo" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="title" label-width="200px">
              <div slot="label" class="label">题名</div>
              <el-input v-model="personInfo.title" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="itemName" label-width="200px">
              <div slot="label" class="label">事项</div>
              <el-select v-model="personInfo.itemName" :disabled="true" placeholder="" class="active_select">
                <el-option
                  v-for="item in matterNameList"
                  :key="item.itemNo"
                  :label="item.itemName"
                  :value="item.itemNo"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="adminName" label-width="200px">
              <div slot="label" class="label">行政相对人名称</div>
              <el-input v-model="personInfo.adminName" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="adminCertType" label-width="200px">
              <div slot="label" class="label">行政相对人证件类型</div>
              <el-select v-model="personInfo.adminCertType" :disabled="true" placeholder="" class="active_select">
                <el-option
                  label="身份证"
                  value="1"
                />
                <el-option
                  label="警官证"
                  value="2"
                />
                <el-option
                  label="护照"
                  value="3"
                />
                <el-option
                  label="军官证"
                  value="4"
                />
                <el-option
                  label="营业执照"
                  value="5"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="adminCertNo" label-width="200px">
              <div slot="label" class="label">行政相对人证件号码</div>
              <el-input v-model.number="personInfo.adminCertNo" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="adminCertPhone" label-width="200px">
              <div slot="label" class="label">行政相对人手机号</div>
              <el-input v-model.number="personInfo.adminCertPhone" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="applyName" label-width="200px">
              <div slot="label" class="label">申请人名称</div>
              <el-input v-model="personInfo.applyName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="applyCertType" label-width="200px">
              <div slot="label" class="label">申请人证件类型</div>
              <el-select v-model="personInfo.applyCertType" :disabled="true" placeholder="" class="active_select">
                <el-option
                  label="身份证"
                  value="身份证"
                />
                <el-option
                  label="警官证"
                  value="警官证"
                />
                <el-option
                  label="护照"
                  value="护照"
                />
                <el-option
                  label="军官证"
                  value="军官证"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="applyCertNo" label-width="200px">
              <div slot="label" class="label">申请人证件号码</div>
              <el-input v-model.number="personInfo.applyCertNo" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="applyPhone" label-width="200px">
              <div slot="label" class="label">申请联系人手机号</div>
              <el-input v-model.number="personInfo.applyPhone" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="acceptTime" label-width="200px">
              <div slot="label" class="label">受理时间</div>
              <el-input v-model="personInfo.acceptTime" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="finishTime" label-width="200px">
              <div slot="label" class="label">办结时间</div>
              <el-input v-model="personInfo.finishTime" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="proResult" label-width="200px">
              <div slot="label" class="label">办理结果</div>
              <el-input v-model="personInfo.proResult" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="deptName" label-width="200px">
              <div slot="label" class="label">所属部门</div>
              <el-input v-model="personInfo.deptName" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="departName" label-width="200px">
              <div slot="label" class="label">所属处室</div>
              <el-input v-model="personInfo.departName" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="level" label-width="200px">
              <div slot="label" class="label">密级</div>
              <el-select v-model="personInfo.level" :disabled="true" placeholder="" class="active_select">
                <el-option
                  v-for="item in miji"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="createBy" label-width="200px">
              <div slot="label" class="label">立卷人</div>
              <el-input v-model="personInfo.createBy" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="createTime" label-width="200px">
              <div slot="label" class="label">立卷时间</div>
              <el-input v-model="createTime" ::disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="retenPeriod" label-width="200px">
              <div slot="label" class="label">保管期限</div>
              <!-- <el-input v-model="personInfo.retenPeriod" /> -->
              <el-select v-model="personInfo.retenPeriod" :disabled="true" placeholder="" class="active_select">
                <el-option
                  label="10年"
                  value="D10"
                />
                <el-option
                  label="20年"
                  value="D20"
                />
                <el-option
                  label="30年"
                  value="D30"
                />
                <el-option
                  label="永久"
                  value="Y"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="trackNo" label-width="200px">
              <div slot="label" class="label">快递</div>
              <el-input v-model="personInfo.trackNo" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="source" label-width="200px">
              <div slot="label" class="label">来源</div>
              <el-select v-model="personInfo.source" :disabled="true" placeholder="" class="active_select">
                <el-option
                  label="手动"
                  :value="1"
                />
                <el-option
                  label="自动"
                  :value="0"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btn-box">
        <el-button type="primary" class="btn-color" size="mini" @click="onSubmit">返回</el-button>
        <el-button type="primary" class="btn-color" size="mini" @click="gotofile(personInfo.id)">查看文件</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { listManage, getlistManage } from '../../api/manage.js'

export default {
  data() {
    return {
      options: [],
      personInfo: {},
      formfile: {
        pageNum: 1,
        pageSize: 10,
        parentId: 0
      },
      value: '',
      createTime: '',
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
      matterNameList: []
    }
  },
  created() {
    this.formfile.parentId = this.$route.query.id
    // console.log(this.formfile)
    listManage(this.formfile).then(response => {
      this.personInfo = response.rows[0]
      // console.log(this.personInfo)
      this.createTime = this.personInfo.createTime.split(' ')[0]
    })
    getlistManage().then(res => {
      this.matterNameList = res.rows
      console.log(this.matterNameList)
    })
  },
  methods: {
    onSubmit() {
      this.$router.back()
    },
    gotofile(id) {
      this.$router.push('/lookfile' + `?id=${id}`)
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
  margin: 10px 0;
}

.label{
  font-weight: 500;
  padding: 10px 10px 10px 20px;
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
