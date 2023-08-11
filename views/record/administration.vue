<template>
  <div class="box">
    <div class="boxtop">
      <span>档案管理</span>
    </div>
    <div class="recordinp">
      <el-row :gutter="30">
        <el-col :span="3">
          <div class="grid-content">
            <el-input v-model="formfile.parentId" size="mini" placeholder="电子文件号/档案流水号" />
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-select v-model="formfile.status" placeholder="档案状态" size="mini">
              <el-option label="待补齐" :value="0" />
              <el-option label="待审核" :value="1" />
              <el-option label="审核中" :value="2" />
              <el-option label="已完成" :value="3" />
              <el-option label="整改中" :value="4" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-input v-model="formfile.adminName" size="mini" placeholder="行政相对人名称" />
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-input v-model="formfile.adminCertNo" size="mini" placeholder="行政相对人号码" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-date-picker
              v-model="formfile.updateTime"
              type="date"
              placeholder="选择开始时间"
              size="mini"
              style="width: 100%;"
            />
          </div>
        </el-col>
        <el-col :span="4">
          <el-date-picker
            v-model="formfile.updateTime"
            type="date"
            placeholder="选择结束时间"
            size="mini"
            style="width: 100%;"
          />
        </el-col>
      </el-row>
      <el-row :gutter="30" class="el-top">
        <el-col :span="3">
          <div class="grid-content">
            <el-input v-model="formfile.title" size="mini" placeholder="题名" />
          </div>
        </el-col>
        <!-- <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-input v-model="formfile.year" size="mini" placeholder="年度" />
          </div>
        </el-col> -->
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-select v-model="formfile.departId" placeholder="所属处室" size="mini">
              <el-option v-for="item in depList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-select v-model="formfile.year" placeholder="所属年度" size="mini">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-select v-model="formfile.ifTrackNo" placeholder="是否有快递单号" size="mini">
              <el-option label="有" value="1" />
              <el-option label="无" value="0" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleQuery">查询</el-button>
          <el-button size="mini" icon="el-icon-refresh-left" @click="resetting">重置</el-button>
        </el-col>
        <el-col :span="4">
          <i class="el-icon-refresh jiange" @click="resetting" />
          <i class="el-icon-setting jiange" />
        </el-col>
      </el-row>
    </div>
    <div class="boxtablefrom">
      <div class="tablebtn">
        <el-button type="primary" size="mini" @click="editfile(1, 0)">新建档案</el-button>
        <el-button type="primary" size="mini" @click="lookfile">申请借阅</el-button>
        <el-button type="primary" size="mini" @click="gotodownload">申请下载</el-button>
        <el-button type="primary" size="mini" @click="faqi(1)">容缺归档</el-button>
        <el-button type="primary" size="mini" @click="faqi(2)">发起整改</el-button>
        <el-button type="primary" size="mini" @click="release">发布审核</el-button>
        <el-button type="primary" size="mini" @click="kdi">填写快递单号</el-button>
        <el-button type="primary" size="mini" @click="lookkdi">查看快递信息</el-button>
      </div>
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="headClass"
        :cell-style="rowClass"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column label="档案号" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.parentId }}</template>
        </el-table-column>
        <el-table-column prop="title" label="题名" show-overflow-tooltip />
        <el-table-column prop="adminName" label="行政相对人" show-overflow-tooltip />
        <el-table-column prop="level" label="密级">
          <template slot-scope="scope">
            <span v-show="scope.row.level === 0">公开级</span>
            <span v-show="scope.row.level === 1">国内级</span>
            <span v-show="scope.row.level === 2">内部级</span>
            <span v-show="scope.row.level === 3">秘密级</span>
            <span v-show="scope.row.level === 4">机密级</span>
            <span v-show="scope.row.level === 5">绝密级</span>
          </template>
        </el-table-column>
        <el-table-column prop="retenPeriod" label="保管期限">
          <template slot-scope="scope">
            <span v-show="scope.row.retenPeriod === 'D10'">10年</span>
            <span v-show="scope.row.retenPeriod === 'D20'">20年</span>
            <span v-show="scope.row.retenPeriod === 'D30'">30年</span>
            <span v-show="scope.row.retenPeriod === 'Y'">永久</span>
          </template>
        </el-table-column>
        <el-table-column prop="year" label="所属年度" />
        <el-table-column prop="deptName" label="所属部门" />
        <el-table-column prop="status" label="案卷状态" width="100">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.status === 0" class="el-icon-warning">待补齐</el-tag>
            <el-tag v-show="scope.row.status === 1" class="el-icon-warning">待审核</el-tag>
            <el-tag v-show="scope.row.status === 2" class="el-icon-warning">审核中</el-tag>
            <el-tag v-show="scope.row.status === 3" class="el-icon-warning">已完成</el-tag>
            <el-tag v-show="scope.row.status === 4" class="el-icon-warning">整改中</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="trackStatus" label="快递状态" width="100">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.trackStatus === 0" class="el-icon-warning">无快递</el-tag>
            <el-tag v-show="scope.row.trackStatus === null" class="el-icon-warning">无快递</el-tag>
            <el-tag v-show="scope.row.trackStatus === 1" class="el-icon-warning">无快递信息</el-tag>
            <el-tag v-show="scope.row.trackStatus === 2" class="el-icon-warning">在途</el-tag>
            <el-tag v-show="scope.row.trackStatus === 3" class="el-icon-warning">已签收</el-tag>
            <!-- <el-tag v-show="scope.row.trackStatus === 1" type="success" class="el-icon-success">已补齐</el-tag> -->
          </template>
        </el-table-column>
        <!-- <el-table-column prop="trackStatus" label="快递状态" /> -->
        <el-table-column prop="createTime" label="更新时间" />
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <div class="button-group">
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="viewfile(scope.row)">查看</el-button>
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="editfile(2,scope.row)">编辑</el-button>
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="onRectification(scope.row.id)">整改记录</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationchange">
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="prev, pager, next, sizes"
          :total="listTotal"
          :current-page="page1"
          @current-change="log"
          @size-change="handleSizeChange"
        />
        <!-- :current-page.sync="currentPage2" -->
        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
      </div>
      <div class="buttonbox">
        <el-button size="mini" @click="allChange">选择全部</el-button>
        <el-button size="mini" @click="reverseChange">反向选择</el-button>
        <el-select v-model="value" placeholder="更多操作" size="mini" class="selectbox">
          <el-option label="操作一" value="1" />
          <el-option label="操作二" value="2" />
          <el-option label="操作三" value="3" />
          <el-option label="操作四" value="4" />
        </el-select>
      </div>
      <Pigeonhole ref="childtra" @transfer="getUser" />
      <TrackingNumber ref="childpig" @transfer="getUser" />
      <Borrowing ref="childborr" @transfer="getUser" />
      <Rectification ref="childrect" @transfer="getUser" />
      <Information ref="childinfo" @transfer="getUser" />
    </div>
  </div>
</template>

<script>

import Pigeonhole from './pigeonhole.vue'
import TrackingNumber from './trackingNumber.vue'
import Borrowing from './borrowing.vue'
import Rectification from './rectification.vue'
import Information from './information.vue'
import { a, admanage } from '../../api/goodslist'
import { listManage, flowList, addverify, eventList } from '../../api/manage.js'

export default {
  components: {
    Pigeonhole,
    TrackingNumber,
    Borrowing,
    Rectification,
    Information
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
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
      listTotal: 0,
      options: [{
        value: '2013',
        label: '2013'
      }, {
        value: '2014',
        label: '2014'
      }, {
        value: '2015',
        label: '2015'
      }, {
        value: '2016',
        label: '2016'
      }, {
        value: '2017',
        label: '2017'
      }, {
        value: '2018',
        label: '2018'
      }, {
        value: '2019',
        label: '2019'
      }, {
        value: '2020',
        label: '2020'
      }, {
        value: '2021',
        label: '2021'
      }, {
        value: '2022',
        label: '2022'
      }, {
        value: '2023',
        label: '2023'
      }],
      value: '',
      arr: [],
      page1: 1,
      pagetotal: 10,
      list: {
        // 模拟数据
        createBy: 'string',
        createTime: 1690790732000,
        creator_id: 'string',
        daId: 0,
        del_flag: 'string',
        deptId: 0,
        deptName: 'string',
        id: 1684740810427387905,
        params: {},
        rectifyReason: 'string',
        remark: 'string',
        updateBy: 'string',
        updateTime: 1690790732000
      },
      list2: {
        daId: 0,
        eventId: ''
      },
      list4: {
        // 查询审批借阅记录
        pageNum: 1,
        pageSize: 10
      },
      statusList: [],
      num: 0,
      daId: [],
      dastring: '',
      depList: []
    }
  },
  watch: {
    page1(newValue, oldValue) {
      this.formfile.pageNum = newValue
      listManage(this.formfile).then(response => {
        this.tableData = response.rows
        this.listTotal = Number(response.total)
        console.log(response.total)
      })
    },
    pagetotal(newValue, oldValue) {
      this.formfile.pageNum = 1
      this.formfile.pageSize = this.pagetotal
      listManage(this.formfile).then(response => {
        this.tableData = response.rows
        this.listTotal = Number(response.total)
      })
    },
    num() {
      listManage(this.formfile).then(response => {
        this.tableData = response.rows
        this.listTotal = Number(response.total)
        console.log(response.rows)
      })
    }
  },
  created() {
    listManage(this.formfile).then(response => {
      this.tableData = response.rows
      this.listTotal = Number(response.total)
      console.log(response.rows)
    })
  },
  methods: {
    getUser() {
      listManage(this.formfile).then(response => {
        this.tableData = response.rows
        this.listTotal = Number(response.total)
        console.log(response.rows)
      })
    },
    conlog() {
      // addRectify(this.list).then(res => {
      //   console.log(res)
      // })
      // applyList(this.list2).then(res => {
      //   console.log(res)
      // })
      // addExam(this.list3).then(res => {
      //   console.log(res)
      // })
      // examList(this.list4).then(res => {
      //   console.log(res)
      // })
      flowList().then(res => {
        console.log(res)
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    gotodownload() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要下载的档案',
          type: 'warning'
        })
      } else {
        if (this.multipleSelection.every(item => item.status === 3)) {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            this.dastring += ((this.multipleSelection[i].id) + ',')
          }
          this.$router.push('/download' + `?id=${this.dastring}`)
        } else {
          this.$message({
            message: '该档案无法申请下载，请核查档案状态。',
            type: 'warning'
          })
        }
      }
    },
    lookfile(id) {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要申请借阅的档案',
          type: 'warning'
        })
      } else {
        if (this.multipleSelection.every(item => item.status === 3)) {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            this.daId.push(this.multipleSelection[i].id)
          }
          console.log(this.daId)
          this.$refs.childborr.personInfo.applyNum = this.multipleSelection.length
          this.$refs.childborr.flag = true
          this.$refs.childborr.personInfo.deptId = this.multipleSelection[0].deptId
          this.$refs.childborr.daId = this.daId
        } else {
          this.$message({
            message: '该档案无法申请借阅，请核查档案状态。',
            type: 'warning'
          })
        }
      }
    },
    release() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要发布审核的档案',
          type: 'warning'
        })
      } else {
        if (this.multipleSelection.every(item => item.status === 0 || item.status === 4)) {
          eventList().then(res => {
            this.list2.eventId = res.rows[1].id
            console.log(res.rows[0].id)
          })
          if (this.multipleSelection[0].trackNo) {
            this.$confirm('是否要发布审核?', '提示', {
              confirmButtonText: '继续发布',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.list2.daId = this.multipleSelection[0].id
              addverify(this.list2.daId).then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '发布审核成功!'
                  })
                  listManage(this.formfile).then(response => {
                    this.tableData = response.rows
                    this.listTotal = Number(response.total)
                    console.log(response.rows)
                  })
                }
              })
            }).catch(() => {
            })
          } else {
            this.$confirm('该档案尚无快递单号，请核查?', '提示', {
              confirmButtonText: '继续发布',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.list2.daId = this.multipleSelection[0].id
              addverify(this.list2.daId).then(res => {
                if (res.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '发布审核成功!'
                  })
                } else {
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  })
                }
              })
            }).catch(() => {})
          }
        } else {
          this.$message({
            message: '该档案无法发起审核，请核查档案状态。',
            type: 'warning'
          })
        }
      }
    },
    lookkdi() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要查看快递信息的档案',
          type: 'warning'
        })
      } else {
        if (this.multipleSelection[0].trackNo) {
          this.$refs.childinfo.flag = true
        } else {
          this.$message({
            message: '没有快递单号',
            type: 'warning'
          })
        }
      }
    },
    headClass() {
      return 'text-align: center;background:#efefef;'
    },
    rowClass() {
      return 'text-align: center;font-size: 10px;'
    },
    kdi() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要填写快递单号的档案',
          type: 'warning'
        })
      } else {
        if (this.multipleSelection.every(item => item.status === 0 || item.status === 4)) {
          this.$refs.childpig.list.id = this.multipleSelection[0].id
          this.$refs.childpig.flag = true
        } else {
          this.$message({
            message: '该档案无法快递单号，请核查档案状态。',
            type: 'warning'
          })
        }
      }
    },
    faqi(numb) {
      if (this.multipleSelection.length === 0) {
        if (numb === 1) {
          this.$message({
            message: '请选择要容缺归档的档案',
            type: 'warning'
          })
        } else {
          this.$message({
            message: '请选择要发起整改的档案',
            type: 'warning'
          })
        }
      } else {
        if (numb === 1) {
          if (this.multipleSelection.every(item => item.status === 0 || item.status === 4)) {
            this.$refs.childtra.flag = true
            this.$refs.childtra.numb = numb
            this.$refs.childtra.list.daId = this.multipleSelection[0].id
            this.$refs.childtra.list2.daId = this.multipleSelection[0].id
            this.$refs.childtra.list2.status = this.multipleSelection[0].status
            this.$refs.childtra.teitle = '请输入容缺归档原因'
          } else {
            this.$message({
              message: '该档案无法容缺归档，请核查档案状态。',
              type: 'warning'
            })
          }
        } else {
          if (this.multipleSelection.every(item => item.status === 3)) {
            this.$refs.childtra.flag = true
            this.$refs.childtra.numb = numb
            this.$refs.childtra.list.daId = this.multipleSelection[0].id
            this.$refs.childtra.teitle = '请输入整改原因'
          } else {
            this.$message({
              message: '该档案无法发起整改，请核查档案状态。',
              type: 'warning'
            })
          }
        }
      }
    },
    resetting() {
      this.formfile = {
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
      }
      this.page1 = 1
      listManage(this.formfile).then(response => {
        this.formfile.pageNum = 1
        this.tableData = response.rows
        this.listTotal = Number(response.total)
      })
    },
    editfile(numb, scope) {
      if (numb === 2) {
        // if (!(scope.status === 0 || scope.status === 4)) {
        //   this.$message({
        //     message: '该档案无法编辑，请核查档案状态。',
        //     type: 'warning'
        //   })
        //   return
        // }
      }
      if (scope !== 0) {
        this.$router.push('/newadministration' + '?' + `id=${scope.id}&num=${numb}`)
      } else {
        this.$router.push('/newadministration' + '?' + `num=${numb}`)
      }
    },
    viewfile(arr) {
      this.$router.push('/viewfile' + '?' + `id=${arr.parentId}`)
    },
    onRectification(id) {
      this.$refs.childrect.flag = true
      this.$refs.childrect.daId = id
    },
    getlist() {
      a().then(res => {
        console.log(res)
      })
      admanage().then(res => {
        console.log(res)
      })
    },
    handleQuery() {
      this.page1 = 1
      // this.getList()
      listManage(this.formfile).then(response => {
        this.formfile.pageNum = 1
        this.tableData = response.rows
        this.listTotal = Number(response.total)
        console.log(response.rows)
      })
    },
    log(val) {
      this.page1 = val
    },
    handleSizeChange(val) {
      this.pagetotal = val
    },
    reverseChange() {
      // this.multipleSelection = this.tableData
      // console.log(this.multipleSelection)
      // console.log(this.tableData)
      this.tableData.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row)
      })
    },
    allChange() {
      this.multipleSelection.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row)
      })
      this.tableData.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.box {
  border: 1px solid rgba(121, 121, 121, 0.1);
  width: 1200px;
  /* height: 800px; */
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

.selectbox {
  margin-left: 10px;
  width: 100px;
}

.buttonbox{
  margin-bottom: 30px;
}

.boxtop span {
  align-items: 60px;
  font-weight: 800;
  color: #666666
}

.paginationchange{
  display: flex;
  flex-direction: row-reverse;
  margin-top: 50px;
}

.recordinp {
  height: 100px;
  margin-left: 35px;
  padding-top: 20px;

  .el-top {
    margin-top: 10px;
  }
}

.tablebtn {
  margin: 30px 0 15px 0;
}

.boxtablefrom {
  margin-left: 50px;
  margin-right: 20px;

}

.button-style {
  background-color: #f0f7ff;
  color: #408eff;
  margin: 0px 0px 0px 0px;
  padding: 2px;
}

.button-group .el-button {
  margin-right: -8px; /* 按钮之间的间距 */
}

.sxin {
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
}

.jiange{
  padding: 5px;
}

</style>
