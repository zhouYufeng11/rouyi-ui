<template>
  <div class="box">
    <div class="boxtop">
      <span v-show="numb === '1'">新增档案</span>
      <span v-show="numb === '2'">编辑档案</span>
    </div>
    <div class="recordinp">
      <el-form ref="personInfo" class="person-info form-with-border" :rules="rules" :model="personInfo" hide-required-asterisk>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="parentId" label-width="200px">
              <div slot="label" class="label">业务流水号</div>
              <el-input v-model="personInfo.parentId" @blur="shiqu" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="daNo" label-width="200px">
              <div slot="label" class="label">档案号</div>
              <el-input v-model.trim="personInfo.daNo" style="width: 250px;border-right: 0px;" />
              <el-button @click="zidong">自动生成</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="title" label-width="200px">
              <div slot="label" class="label">题名</div>
              <el-input v-model="personInfo.title" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="itemName" label-width="200px">
              <div slot="label" class="label">事项</div>
              <el-select v-model="personInfo.itemName" placeholder="" class="active_select" @change="matterIdC">
                <el-option
                  v-for="item in matterNameList"
                  :key="item.itemNo"
                  :label="item.itemName"
                  :value="item.itemName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="adminName" label-width="200px">
              <div slot="label" class="label">行政相对人名称</div>
              <el-input v-model="personInfo.adminName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="adminCertType" label-width="200px">
              <div slot="label" class="label">行政相对人证件类型</div>
              <el-select v-model="personInfo.adminCertType" placeholder="" class="active_select">
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
              <el-input v-model="personInfo.adminCertNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="adminCertPhone" label-width="200px">
              <div slot="label" class="label">行政相对人手机号</div>
              <el-input v-model.number="personInfo.adminCertPhone" />
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
              <el-select v-model="personInfo.applyCertType" placeholder="" class="active_select">
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
            <el-form-item prop="applyCertNo" label-width="200px">
              <div slot="label" class="label">申请人证件号码</div>
              <el-input v-model.number="personInfo.applyCertNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="applyPhone" label-width="200px">
              <div slot="label" class="label">申请联系人手机号</div>
              <el-input v-model.number="personInfo.applyPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="acceptTime" label-width="200px">
              <div slot="label" class="label">受理时间</div>
              <el-date-picker
                v-model="personInfo.acceptTime"
                type="date"
                placeholder=""
                style="border: 0;"
                :clearable="false"
                value-format="timestamp"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="finishTime" label-width="200px">
              <div slot="label" class="label">办结时间</div>
              <el-date-picker
                v-model="personInfo.finishTime"
                type="date"
                placeholder=""
                style="border: 0;"
                :clearable="false"
                value-format="timestamp"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="proResult" label-width="200px">
              <div slot="label" class="label">办理结果</div>
              <el-input v-model="personInfo.proResult" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="deptName" label-width="200px">
              <div slot="label" class="label">所属部门</div>
              <el-select v-model="personInfo.deptName" placeholder="" class="active_select">
                <el-option
                  v-for="item in deptList"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="departName" label-width="200px">
              <div slot="label" class="label">所属处室</div>
              <el-select v-model="personInfo.departName" placeholder="" class="active_select">
                <el-option
                  v-for="item in erji"
                  :key="item.deptName"
                  :label="item.deptName"
                  :value="item.deptName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="level" label-width="200px">
              <div slot="label" class="label">密级</div>
              <el-select v-model="personInfo.level" placeholder="" class="active_select">
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
              <el-input v-model="personInfo.createBy" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="createTime" label-width="200px">
              <div slot="label" class="label">立卷时间</div>
              <el-input v-model="createTime" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="retenPeriod" label-width="200px">
              <div slot="label" class="label">保管期限</div>
              <!-- <el-input v-model="personInfo.retenPeriod" /> -->
              <el-select v-model="personInfo.retenPeriod" placeholder="" class="active_select">
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
              <el-input v-model="personInfo.trackNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="source" label-width="200px">
              <div slot="label" class="label">来源</div>
              <el-select v-model="personInfo.source" placeholder="" class="active_select">
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
      <div v-show="numb === '1'" class="btn-box">
        <el-button type="primary" class="btn-color" size="mini" @click="submitForm('personInfo')">提交并退出</el-button>
        <el-button type="primary" class="btn-color" size="mini" @click="fileFrom('personInfo', personInfo.id)">提交并上传文件</el-button>
      </div>
      <div v-show="numb === '2'" class="btn-box">
        <el-button type="primary" class="btn-color" size="mini" @click="modifyForm('personInfo')">提交并退出</el-button>
        <el-button type="primary" class="btn-color" size="mini" @click="xgfileFrom('personInfo', personInfo.id)">提交并上传文件</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { admanage } from '../../api/goodslist'
import { listManage, updateManage, abc, getlistManage } from '../../api/manage.js'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      // options: [{
      //   value: '资质管理处',
      //   label: '资质管理处'
      // }, {
      //   value: '工程许可处',
      //   label: '工程许可处'
      // }],
      personInfo: {
        parentId: '',
        daNo: '',
        title: '',
        itemName: '',
        matterId: '',
        adminName: '',
        adminCertType: '',
        adminCertNo: '',
        adminCertPhone: '',
        applyName: '',
        applyCertType: '',
        applyCertNo: '',
        applyPhone: '',
        acceptTime: '',
        finishTime: '',
        proResult: '',
        deptName: '',
        departName: '',
        level: '',
        createBy: '',
        createTime: '',
        retenPeriod: '',
        source: 1,
        trackNo: ''
      },
      formfile: {
        pageNum: 1,
        pageSize: 10,
        adminCertNo: '',
        adminName: '',
        daNo: '',
        departId: '',
        if_trackNo: '',
        parentId: '',
        status: '',
        title: '',
        updateTime: '',
        year: ''
      },
      rules: {
        parentId: [
          { required: true, message: '请输入业务流水号', trigger: 'blur' }
        ],
        daNo: [
          { required: true, message: '请输入档案号', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入题名', trigger: 'blur' }
        ],
        matterName: [
          { required: true, message: '请输入事项', trigger: 'change' }
        ],
        adminName: [
          { required: true, message: '请输入行政相对人名称', trigger: 'blur' }
        ],
        adminCertType: [
          { required: true, message: '请输入行政相对人证件类型', trigger: 'blur' }
        ],
        adminCertNo: [
          { required: true, message: '请输入行政相对人证件号码', trigger: 'blur' }
        ],
        // adminCertPhone: [
        //   { required: true, message: '请输入行政相对人手机号', trigger: 'blur' },
        //   { type: 'number', message: '必须为数字值', trigger: 'blur' }
        // ],
        // applyName: [
        //   { required: true, message: '请输入申请人名称', trigger: 'blur' }
        // ],
        // applyCertType: [
        //   { required: true, message: '请输入申请人证件类型', trigger: 'blur' }
        // ],
        // applyCertNo: [
        //   { required: true, message: '请输入申请人证件号码', trigger: 'blur' },
        //   { type: 'number', message: '必须为数字值', trigger: 'blur' }
        // ],
        // applyPhone: [
        //   { required: true, message: '申请联系人手机号', trigger: 'blur' },
        //   { type: 'number', message: '必须为数字值', trigger: 'blur' }
        // ],
        finishTime: [
          { type: 'date', message: '请输入办结时间', trigger: 'change' }
        ],
        acceptTime: [
          { type: 'date', message: '请输入受理时间', trigger: 'change' }
        ],
        deptName: [
          { required: true, message: '请输入部门名称', trigger: 'change' }
        ],
        departName: [
          { required: true, message: '请输入处室名称', trigger: 'change' }
        ],
        level: [
          { required: true, message: '请输入密级', trigger: 'change' }
        ],
        createBy: [
          { required: true, message: '请输入立卷人', trigger: 'blur' }
        ],
        retenPeriod: [
          { required: true, message: '请输入保管期限', trigger: 'change' }
        ],
        createTime: [
          { required: true, message: '请输入立卷时间', trigger: 'blur' }
        ],
        proResult: [
          { required: true, message: '请输入办理结果', trigger: 'blur' }
        ]
      },
      bum: [{
        value: '泰州市行政审批局',
        label: '泰州市行政审批局'
      }],
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
      shixiang: [{
        value: '食品生成许可',
        label: '食品生成许可'
      },
      {
        value: '房地产开发企业资质的核准',
        label: '房地产开发企业资质的核准'
      },
      {
        value: '麻醉药品和精神药品邮寄证明核发',
        label: '麻醉药品和精神药品邮寄证明核'
      },
      {
        value: '计量标准器具核准',
        label: '计量标准器具核准'
      },
      {
        value: '建筑工程施工许可证的发放',
        label: '建筑工程施工许可证的发放'
      },
      {
        value: '城镇污水排入排水管网许可',
        label: '城镇污水排入排水管网许可'
      },
      {
        value: '市政设施（城市道路，城市桥梁）建设类审批',
        label: '市政设施（城市道路，城市桥梁）建设类审批'
      },
      {
        value: '商品房预售许可',
        label: '商品房预售许可'
      }],
      value: '',
      yewu: {
        parentId: ''
      },
      numb: 1,
      id: 0,
      timeCreate: '',
      matterNameList: [],
      queryParams: {
        deptName: undefined,
        status: undefined
      },
      deptList: [],
      createTime: ''
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    erji() {
      for (let i = 0; i < this.deptList.length; i++) {
        // if (!this.erji) return
        if (this.deptList[i].deptName === this.personInfo.deptName) {
          // console.log(this.deptList[i].children[0])
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.personInfo.deptId = this.deptList[i].deptId
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.personInfo.departtName = this.deptList[i].children[0].deptName
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.personInfo.departId = this.deptList[i].children[0].deptId
          return this.deptList[i].children
        }
      }
    }
  },
  created() {
    this.numb = this.$route.query.num
    this.personInfo.createTime = Date.now() * 1000
    this.createTime = dayjs().format('YYYY/MM/DD')
    // console.log(this.$store.state.user.name)
    this.personInfo.createBy = this.$store.state.user.name
    if (this.$route.query.id) {
      this.formfile.id = this.$route.query.id
      listManage(this.formfile).then(res => {
        this.personInfo = res.rows[0]
        this.personInfo.acceptTime = dayjs(this.personInfo.acceptTime).valueOf()
        this.personInfo.finishTime = dayjs(this.personInfo.finishTime).valueOf()
        // console.log(res)
      })
    }
    this.formfile.updateTime = dayjs().unix() * 1000
    // console.log(this.formfile.updateTime)
    abc(this.queryParams).then(response => {
      this.deptList = response.data
      // console.log(this.deptList)
    })
    // systemDict().then(res => {
    //   this.matterNameList = res.rows
    //   console.log(this.matterNameList)
    // })
    getlistManage().then(res => {
      this.matterNameList = res.rows
      console.log(this.matterNameList)
    })
  },
  methods: {
    zidong() {
      this.personInfo.daNo = Math.floor(Math.random() * 1000 + 1)
    },
    matterIdC() {
      console.log(this.personInfo.itemName)
      for (let i = 0; i < this.matterNameList.length; i++) {
        if (this.matterNameList[i].itemName === this.personInfo.itemName) {
          this.personInfo.deptName = this.matterNameList[i].deptName
          this.personInfo.departName = this.matterNameList[i].departtName
          this.personInfo.level = this.matterNameList[i].level
          this.personInfo.retenPeriod = this.matterNameList[i].retenPeriod
          console.log(11)
        }
      }
      // console.log(this.personInfo)
    },
    submitForm(personInfo) {
      this.$refs[personInfo].validate((valid) => {
        if (valid) {
          if (this.personInfo.trackNo) {
            admanage(this.personInfo).then(res => {
              if (res.code === 200) {
                this.$router.push('/administration')
              } else {
                this.$message({
                  message: '信息有误',
                  type: 'warning'
                })
              }
              // console.log(res)
            })
          } else {
            this.$confirm('是否填写快递单号', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
            }).catch(() => {
              admanage(this.personInfo).then(res => {
                if (res.code === 200) {
                  this.$router.push('/administration')
                } else {
                  this.$message({
                    message: '信息有误',
                    type: 'warning'
                  })
                }
                // console.log(res)
              })
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    shiqu() {
      this.yewu.parentId = this.personInfo.parentId
      listManage(this.yewu).then(res => {
        // console.log(res.rows.length)
        if (this.yewu.parentId !== '') {
          if (res.rows.length !== 0) {
            this.$message({
              message: '业务流水号已存在',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: '请填写业务流水号',
            type: 'warning'
          })
        }
      })
    },
    modifyForm(personInfo) {
      this.$refs[personInfo].validate((valid) => {
        if (valid) {
          this.id = Number(this.$route.query.id)
          this.personInfo.id = this.$route.query.id
          updateManage(this.personInfo).then(res => {
            // console.log(res)
            if (res.code === 200) {
              this.$router.push('/administration')
            } else {
              this.$message({
                message: '信息有误',
                type: 'warning'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    xgfileFrom(personInfo, id) {
      this.$refs[personInfo].validate((valid) => {
        if (valid) {
          this.id = Number(this.$route.query.id)
          this.personInfo.id = this.$route.query.id
          updateManage(this.personInfo).then(res => {
            // console.log(res)
            if (res.code === 200) {
              this.$router.push('/uploadfiles' + `?daId=${id}`)
            } else {
              this.$message({
                message: '信息有误',
                type: 'warning'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // yanzheng(personInfo) {
    //   this.personInfo.updateTime = dayjs().unix()
    //   this.$refs[personInfo].validate((valid) => {
    //     if (valid) {
    //       // this.id = Number(this.$route.query.id)
    //       // this.personInfo.id = this.$route.query.id
    //       listManage(this.yewu).then(res => {
    //       // console.log(res.rows.length)
    //         if (this.yewu.parentId !== '') {
    //           if (res.rows.length !== 0) {
    //             this.$message({
    //               message: '业务流水号已存在',
    //               type: 'warning'
    //             })
    //           }
    //         } else {
    //           this.$message({
    //             message: '请填写业务流水号',
    //             type: 'warning'
    //           })
    //         }
    //       })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })

    //   listManage(this.yewu).then(res => {
    //     // console.log(res.rows.length)
    //     if (this.yewu.parentId !== '') {
    //       if (res.rows.length !== 0) {
    //         this.$message({
    //           message: '业务流水号已存在',
    //           type: 'warning'
    //         })
    //       } else {
    //         this.$router.push('/administration')
    //         admanage(this.personInfo).then(res => {
    //           console.log(res)
    //           if (this.personInfo.trackNo) {
    //             if (res.code === 200) {
    //               this.$router.push('/administration')
    //             } else {
    //               this.$message({
    //                 message: '信息有误',
    //                 type: 'warning'
    //               })
    //             }
    //           }
    //         })
    //       }
    //     } else {
    //       this.$message({
    //         message: '请填写业务流水号',
    //         type: 'warning'
    //       })
    //     }
    //   })
    // },
    fileFrom(personInfo, id) {
      this.$refs[personInfo].validate((valid) => {
        if (valid) {
          if (this.personInfo.trackNo) {
            admanage(this.personInfo).then(res => {
              if (res.code === 200) {
                this.$router.push('/uploadfiles' + `?daId=${res.data}`)
              } else {
                this.$message({
                  message: '信息有误',
                  type: 'warning'
                })
              }
              // console.log(res)
            })
          } else {
            this.$confirm('是否填写快递单号', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
            }).catch(() => {
              admanage(this.personInfo).then(res => {
                if (res.code === 200) {
                  this.$router.push('/uploadfiles' + `?daId=${res.data}`)
                } else {
                  this.$message({
                    message: '信息有误',
                    type: 'warning'
                  })
                }
                // console.log(res)
              })
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    wjian(personInfo) {
      listManage(this.yewu).then(res => {
        // console.log(res.rows.length)
        if (this.yewu.parentId !== '') {
          if (res.rows.length !== 0) {
            this.$message({
              message: '业务流水号已存在',
              type: 'warning'
            })
          } else {
            this.$refs[personInfo].validate((valid) => {
              if (valid) {
                if (!this.personInfo.trackNo) {
                  this.$confirm('检测到未填写快递单号，是否在离开页面？', '快递单号', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '添加',
                    cancelButtonText: '离开'
                  })
                    .then(() => {
                    })
                    .catch(action => {
                      admanage(this.personInfo).then(res => {
                        // console.log(res)
                        if (res.code === 200) {
                          this.$router.push('/uploadfiles')
                        } else {
                          this.$message({
                            message: '信息有误',
                            type: 'warning'
                          })
                        }
                      })
                    })
                }
              } else {
                setTimeout(() => {
                  document.getElementsByClassName('is-error')[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                  })
                }, 0)
                return false
              }
            })
          }
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
  height: 1200px;
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
