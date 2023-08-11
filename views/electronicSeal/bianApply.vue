<template>
  <div class="box">
    <div class="boxtop">
      <span>编辑</span>
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
            <el-form-item prop="eAccount" label-width="200px">
              <div slot="label" class="label">随e签账号</div>
              <el-input v-model="formfile.eAccount" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="sealType" label-width="200px">
              <div slot="label" class="label">印章类型</div>
              <!-- <el-input v-model="formfile.certType" /> -->
              <el-select v-model="formfile.sealType" placeholder="" class="active_select">
                <el-option
                  label="个人签名"
                  :value="1"
                />
                <el-option
                  label="机构印章"
                  :value="2"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="sealHeight" label-width="200px">
              <div slot="label" class="label">印章高度</div>
              <el-input v-model="formfile.sealHeight" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="upload">
        <span>默认状态：</span>
        <el-upload
          ref="upload"
          class="upload"
          action="string"
          :file-list="fileList"
          :auto-upload="false"
          :http-request="uploadFile"
          :on-change="handleChange"
          multiple="multiple"
          :show-file-list="false"
          accept=".gif,.jpg,.jpeg,.png,.GIF,.JPG,.PNG"
        >
          <el-button size="mini">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">支持文件格式:.rar.zip.doc.docx.pdf ，单个文件不能超过500kb</div> -->
        </el-upload>
      </div>
      <div class="btn-box">
        <el-button type="primary" class="btn-color" size="mini" @click="goback">返回</el-button>
        <el-button type="primary" class="btn-color" size="mini" @click="addList">提交并退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import { getSigapplyList, changesigapply, uploadFiles } from '../../api/manage.js'

export default {
  data() {
    return {
      formfile: {
        // 电子邮箱
        email: '',
        // 用户手机号
        phone: '',
        // 档案系统用户id
        userId: '',
        // 用户名称
        userName: '',
        eAccount: '',
        sealType: '',
        sealHeight: '',
        fileUrl: '',
        deptId: ''
      },
      list: {
        fileName: 'string',
        fileType: 'string',
        fileUrl: 'string',
        daId: 0,
        deptId: 0
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
      value: '',
      yewu: {
        parentId: ''
      },
      numb: 1,
      id: 0,
      timeCreate: '',
      fileList: [],
      list2: {
        pageNum: 1,
        pageSize: 10,
        id: 0
      }
    }
  },
  computed: {},
  created() {
    this.list2.id = this.$route.query.id
    getSigapplyList(this.list2).then(res => {
      console.log(res)
      this.formfile = res.rows[0]
      this.listTotal = Number(res.total)
    })
  },
  methods: {
    goback() {
      this.$router.back()
    },
    addList() {
      changesigapply(this.formfile).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$message({
            message: '修改成功成功',
            type: 'success'
          })
          this.$router.back()
        }
      })
    },
    handleChange(file, fileList) {
      uploadFiles(file.raw).then(res => {
        this.formfile.fileUrl = res.url
        // console.log(this.formfile.fileUrl)
        // console.log(111)
      })
    },
    // 自定义上传文件
    uploadFile(file) {
      this.formData.append('file', file.file)
      // console.log(file.file, "sb2");
    },
    // 删除文件
    handleRemove(file, fileList) {
      console.log(file, fileList)
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

.upload {
  display: flex;
}

.upload {
  margin-bottom: 20px;
}

</style>
