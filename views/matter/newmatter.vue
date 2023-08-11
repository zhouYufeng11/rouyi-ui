<template>
  <transition name="modal">
    <div v-show="flag" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <span>{{ title }}</span>
            <i class="el-icon-close" @click="thisQuxiao" />
          </div>
          <div class="modal-body">
            <div class="modal-box">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-dark">
                    <el-select v-model="fileList.dictLabel" placeholder="请选择主项" size="mini" @change="changeDict">
                      <el-option
                        label=""
                        value=""
                      />
                      <el-option
                        v-for="item in options"
                        :key="item.dictCode"
                        :label="item.dictLabel"
                        :value="item.dictLabel"
                      />
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple-dark">
                    <el-input
                      v-model="fileList.itemNo"
                      size="mini"
                      placeholder="请输入子项代码"
                    />
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-dark">
                    <el-input
                      v-model="fileList.itemName"
                      size="mini"
                      placeholder="请输入子项名称"
                    />
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple-dark">
                    <el-select v-model="fileList.deptName" placeholder="请选择部门" size="mini">
                      <el-option
                        v-for="item in deptList"
                        :key="item.deptId"
                        :label="item.deptName"
                        :value="item.deptName"
                      />
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-dark">
                    <el-select v-model="fileList.departtName" placeholder="请选择处室" size="mini">
                      <el-option
                        v-for="item in erji"
                        :key="item.deptName"
                        :label="item.deptName"
                        :value="item.deptName"
                      />
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple-dark">
                    <el-select v-model="fileList.level" placeholder="请选择密级" size="mini">
                      <el-option
                        v-for="item in miji"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-dark">
                    <el-select v-model="fileList.retenPeriod" placeholder="请选择保管期限" size="mini">
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
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-show="title === '新建事项'" class="modal-footer">
            <el-button size="mini" class="btncolor" @click="thisQuxiao">取消</el-button>
            <el-button type="primary" size="mini" @click="thisOk">确定</el-button>
          </div>
          <div v-show="title === '编辑事项'" class="modal-footer">
            <el-button size="mini" class="btncolor" @click="thisQuxiao">取消</el-button>
            <el-button type="primary" size="mini" @click="changeOk">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { abc, addNewManage, getlistManage, changeManage, systemDict } from '../../api/manage.js'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      textarea2: '',
      flag: false,
      title: '',
      fileInfo: {},
      value: '',
      options: {},
      fileList: {
        createBy: 'string',
        creatorId: 0,
        // daId: 0,
        departId: 0,
        // 处室名称
        departtName: '',
        deptId: 0,
        // 部门名称
        deptName: '',
        // 主项代码
        dictValue: 0,
        // 主项名称
        dictLabel: '',
        // id: 0,
        // 事项名称
        itemName: '',
        // 事项代码
        itemNo: '',
        level: '',
        params: {},
        remark: 'string',
        // 保管期限
        retenPeriod: '',
        updateBy: 'string'
      },
      deptList: [],
      queryParams: {
        deptName: undefined,
        status: undefined
      },
      num: 1,
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
      info: {
        pageNum: 1,
        pageSize: 10,
        id: 0
      },
      id: 0
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    erji() {
      if (!this.fileList.departtName) {
        for (let i = 0; i < this.deptList.length; i++) {
        // if (!this.erji) return
          if (this.deptList[i].deptName === this.fileList.deptName) {
            // console.log(this.deptList[i].children[0])
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.fileList.deptId = this.deptList[i].deptId
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.fileList.departtName = this.deptList[i].children[0].deptName
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.fileList.departId = this.deptList[i].children[0].deptId
            return this.deptList[i].children
          }
        }
      }
    }
  },
  watch: {
    num() {
      this.fileList = {
        createBy: 'string',
        creatorId: 0,
        // daId: 0,
        departId: 0,
        // 处室名称
        departtName: '',
        deptId: 0,
        // 部门名称
        deptName: '',
        // 主项代码
        dictValue: 0,
        // 主项名称
        dictLabel: '',
        // id: 0,
        // 事项名称
        itemName: '',
        // 事项代码
        itemNo: '',
        level: '',
        params: {},
        remark: 'string',
        // 保管期限
        retenPeriod: ''
      }
      abc(this.queryParams).then(response => {
        this.deptList = response.data
        // console.log(this.deptList)
      })
      systemDict().then(res => {
        console.log(res)
        this.options = res.rows
      })
    },
    id() {
      if (!this.id) return
      abc(this.queryParams).then(response => {
        this.deptList = response.data
        // console.log(this.deptList)
      })
      this.info.id = this.id
      getlistManage(this.info).then(res => {
        // console.log(res)
        this.fileList = res.rows[0]
      })
    }
  },
  created() {
  },
  methods: {
    thisOk() {
      // console.log(this.fileList)
      addNewManage(this.fileList).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$emit('transfer', this.user)
          this.$message({
            message: '新建事项成功',
            type: 'warning'
          })
          this.fileList = {
            createBy: 'string',
            creatorId: 0,
            // daId: 0,
            departId: 0,
            // 处室名称
            departtName: '',
            deptId: 0,
            // 部门名称
            deptName: '',
            // 主项代码
            dictValue: 0,
            // 主项名称
            dictLabel: '',
            // id: 0,
            // 事项名称
            itemName: '',
            // 事项代码
            itemNo: '',
            level: '',
            params: {},
            remark: 'string',
            // 保管期限
            retenPeriod: ''
          }
          this.flag = !this.flag
          // this.$router.go(0)
        }
      })
      this.id = 0
      this.num = 1
    },
    thisQuxiao() {
      this.flag = !this.flag
      this.num = 1
      this.id = 0
    },
    changeOk() {
      changeManage(this.fileList).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          // this.$router.go(0)
          this.flag = !this.flag
          this.id = 0
          this.num = 1
        }
      })
    },
    changeDict() {
      if (this.id === 0 && this.title === '编辑事项') return
      for (let i = 0; i < this.options.length; i++) {
        if (this.fileList.dictLabel === this.options[i].dictLabel) {
          this.fileList.dictValue = this.options[i].dictCode
        }
      }
      // console.log(this.fileList)
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
/* .modal-box>>>.el-input__inner{
  height: 150px;
  border: 0;
  margin: 50px 50px 40px 20px ;
  resize: none;
  width: 200px;
  margin-bottom: 20px;
} */
.modal-box>>>.el-input__inner{
  /* margin-bottom: 20px; */
  margin: 10px 0 10px 10px;
  width: 200px;
}
.modal-header > span {
  font-size: 14px;
  color: #666666;
  font-weight: 800;
}

.modal-header > i {
  color: #666666;
  font-weight: 800;
}

.btncolor{
  color: #0097fe;
}

.modal-wrapper {
  width: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.modal-box{
  margin: 50px 50px 40px 20px;
  /* border: 1px solid rgba(121, 121, 121, 0.1); */
}

.modal-container{
  width: 500px;
  height: 410px;
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
</style>
