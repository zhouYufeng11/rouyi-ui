<template>
  <transition name="modal">
    <div v-show="flag" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <span>借阅申请</span>
            <i class="el-icon-close" @click="thisQuxiao" />
          </div>
          <div class="modal-body">
            <el-form class="person-info form-with-border">
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="申请人姓名" label-width="120px">
                    <div slot="label" class="label">申请人姓名</div>
                    <el-input v-model="personInfo.name" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="申请人证件类型" label-width="120px">
                    <div slot="label" class="label">申请人证件类型</div>
                    <el-select v-model="personInfo.adminCertType" placeholder="" class="active_select" style="width: 100%;">
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
                  <el-form-item prop="申请人证件号码" label-width="120px">
                    <div slot="label" class="label">申请人证件号码</div>
                    <el-input v-model="personInfo.certNo" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="申请人手机号" label-width="120px">
                    <div slot="label" class="label">申请人手机号</div>
                    <el-input v-model="personInfo.phone" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="所处单位" label-width="120px">
                    <div slot="label" class="label">所处单位</div>
                    <el-input v-model="personInfo.departName" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="申请时长" label-width="120px">
                    <div slot="label" class="label">申请时长</div>
                    <el-input v-model="personInfo.applyDuration" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="责任人" label-width="120px">
                    <div slot="label" class="label">责任人</div>
                    <el-input v-model="personInfo.responsiblePerson" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="责任人手机号" label-width="120px">
                    <div slot="label" class="label">责任人手机号</div>
                    <el-input v-model="personInfo.responsiblePhone" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="modal-box">
              <el-input
                v-model="personInfo.applyReason"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 6}"
                placeholder="请输入申请原因"
                class="borderNone"
              />
            </div>
          </div>
          <div class="modal-footer">
            <el-button size="mini" class="btncolor" @click="thisQuxiao">取消</el-button>
            <el-button type="primary" size="mini" @click="thisOk">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import { addLookManage, eventList } from '../../api/manage.js'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flag: false,
      personInfo: {
        applyNum: 0,
        applyReason: '',
        applyType: 0,
        eventType: 1,
        certNo: '',
        certType: 0,
        creatorId: 0,
        departId: 0,
        departName: '',
        deptId: 0,
        deptName: '',
        name: '',
        params: {},
        phone: '',
        remark: '',
        responsiblePerson: '',
        responsiblePhone: '',
        eventId: 0,
        applyDuration: ''
      },
      daId: [],
      daApply: {}
    }
  },
  created() {
    eventList().then(res => {
      console.log(res)
      this.personInfo.eventId = res.rows[0].id
    })
  },
  methods: {
    thisOk() {
      console.log(this.daId)
      this.daApply.daApply = this.personInfo
      this.daApply.daIds = this.daId
      addLookManage(this.daApply).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message({
            message: '申请成功',
            type: 'success'
          })
          this.$emit('transfer', this.user)
        }
      })
      this.flag = !this.flag
    },
    thisQuxiao() {
      this.textarea2 = ''
      this.flag = !this.flag
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-box>>>.el-textarea__inner{
  /* height: 150px; */
  border: 0;
  resize: none;
}

.btncolor{
  color: #0097fe;
}

.modal-wrapper {
  width: 800px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  /* font-size: 12px; */
}

.modal-box{
  margin: 0 10px;
  border: 1px solid rgba(121, 121, 121, 0.1);
}

.modal-container{
  width: 800px;
  height: 450px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
  border-bottom: 1px solid rgba(121, 121, 121, 0.1);
}

.modal-footer {
  text-align: right;
  padding: 15px 10px;
  border-top: 1px solid rgba(121, 121, 121, 0.1);
}

.person-info>>>.el-form-item__label{
  padding: 0;
  border-right: 1px solid #D1CECE;
  border-left: 1px solid #D1CECE;
  /* margin-bottom: 0px; */
}
.person-info>>>.el-col{
  border-top: 1px solid #D1CECE;
  border-bottom: 1px solid #D1CECE;
}
.label{
  padding-left: 10px;
  text-align: left;
  /* background-color: #FAFAFA; */
  /* text-align: center; */
}
.person-info>>>.el-input{
  /* border-top: 0; */
  height: 100%;
  border-right: 1px solid #D1CECE;
}
.person-info>>>el-input.is-disabled .el-input__inner{
  cursor: default !important;
}
.person-info>>>.el-input__inner{
  border: 0;
  border-radius: 0;
  /* border-top: 0; */
  background-color: #fff;
  color: #606266;
}
.el-form-item {
    margin-bottom: 0px;
}
.person-info{
  margin: 20px 20px 20px 20px;
}

.label{
  font-weight: 500;
  height: 38px;
}
</style>
