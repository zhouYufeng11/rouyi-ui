<template>
  <div class="downloadbox">
    <div class="boxtop">
      <span>查看</span>
    </div>
    <div class="recordinp">
      <el-form class="person-info form-with-border">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="申请人姓名" label-width="200px">
              <div slot="label" class="label">申请人姓名</div>
              <el-input v-model="personInfo.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="申请人证件类型" label-width="200px">
              <div slot="label" class="label">申请人证件类型</div>
              <el-select v-model="personInfo.certType" placeholder="" class="active_select" style="width: 100%;">
                <el-option
                  label="身份证"
                  :value="1"
                />
                <el-option
                  label="警官证"
                  :value="2"
                />
                <el-option
                  label="护照"
                  :value="3"
                />
                <el-option
                  label="军官证"
                  :value="4"
                />
                <el-option
                  label="营业执照"
                  :value="5"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="申请人证件号码" label-width="200px">
              <div slot="label" class="label">申请人证件号码</div>
              <el-input v-model="personInfo.certNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="申请人手机号" label-width="200px">
              <div slot="label" class="label">申请人手机号</div>
              <el-input v-model="personInfo.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="所处单位" label-width="200px">
              <div slot="label" class="label">所处单位</div>
              <el-input v-model="personInfo.departName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="申请时长" label-width="200px">
              <div slot="label" class="label">申请时长</div>
              <el-input v-model="personInfo.applyDuration" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="责任人" label-width="200px">
              <div slot="label" class="label">责任人</div>
              <el-input v-model="personInfo.responsiblePerson" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="责任人手机号" label-width="200px">
              <div slot="label" class="label">责任人手机号</div>
              <el-input v-model="personInfo.responsiblePhone" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="申请理由" label-width="200px">
              <div slot="label" class="label">申请理由</div>
              <el-input v-model="personInfo.applyReason" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="headClass"
        :cell-style="rowClass"
      >
        <el-table-column label="电子文件号" show-overflow-tooltip>
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
        <el-table-column prop="retenPeriod" label="保管期限" />
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
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" disabled @click="viewfile(scope.row)">查看</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="fye">
        <div>合计：{{ listTotal }}</div>
        <div class="paginationchange">
          <el-pagination
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="prev, pager, next, sizes"
            :total="listTotal"
            :current-page="page"
            @current-change="log"
            @size-change="handleSizeChange"
          />
          <!-- :current-page.sync="currentPage2" -->
          <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange" -->
        </div>
      </div>
      <div class="tijiao">
        <el-button type="primary" class="button-style" size="small" @click="goback">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import { listManage, addLookManage, getApplyList, getverifyInfo, abc, getdamanage } from '../../api/manage.js'

export default {
  data() {
    return {
      tableData: [],
      personInfo: {},
      tablea: [],
      options: [{
        value: '1',
        label: '同意'
      }, {
        value: '2',
        label: '驳回'
      }],
      page: 1,
      value: '',
      textareatext: '',
      pageNum: 1,
      listTotal: 0,
      list: {
        id: 0
      },
      daIds: []
    }
  },
  watch: {
    pageNum() {
      listManage().then(res => {
        console.log(res)
        this.tableData = res.rows
        this.listTotal = Number(res.total)
      })
    }
  },
  created() {
    // 获取详细信息
    this.list.id = this.$route.query.id
    getApplyList(this.list).then(res => {
      // console.log(res)
      this.personInfo = res.rows[0]
      this.daIds = res.rows[0].daIds.split(',')
      getdamanage(this.daIds).then(res => {
        console.log(res)
        this.tableData = res.data
        this.listTotal = this.tableData.length
      })
    })
    getverifyInfo(this.$route.query.id).then(res => {
      // console.log(res)
      this.tablea = res.data
    })
    // this.personInfo.id = this.$route.query.id
    // console.log(this.$route.query.id);
    abc().then(res => {
      console.log(res)
    })
  },
  methods: {
    viewfile(arr) {
      this.$router.push('/viewfile' + '?' + `id=${arr.parentId}`)
    },
    headClass() {
      return 'text-align: center;background:#d7d7d7;'
    },
    rowClass() {
      return 'text-align: center;font-size: 10px;'
    },
    goback() {
      this.$router.back()
    },
    download() {
      addLookManage(this.personInfo).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message({
            message: '申请成功',
            type: 'success'
          })
        }
      })
    },
    log(val) {
      this.pageNum = val
    },
    handleSizeChange(val) {
      this.pagetotal = val
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped>
.downloadbox {
  border: 1px solid rgba(121, 121, 121, 0.1);
  width: 1200px;
  height: 1800px;
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
  margin: 0 20px 50px 40px;
}
.person-info {
    width: 98.7%;
    margin: 0.2% 0 1% 10px;
    color: #8e9fc2;
    border-top: 1px solid #D1CECE;
    border-left: 1px solid #D1CECE;
}

.person-info>>>.el-form-item__label{
  padding: 0;
  border-right: 1px solid #D1CECE;
  /* margin-bottom: 0px; */
}
.person-info>>>.el-col{
  border-bottom: 1px solid #D1CECE;
}
.label{
  /* padding-left: 20px; */
  text-align: left;
  /* background-color: #FAFAFA; */
  text-align: center;
  font-weight: 500;
  padding: 10px;
}
.person-info>>>.el-input{
  border-top: 0;
  height: 100%;
  border-right: 1px solid #D1CECE;
}
.person-info>>>el-input.is-disabled .el-input__inner{
  cursor: default !important;
}
.person-info>>>.el-input__inner{
  border: 0;
  border-radius: 0;
  border-top: 0;
  background-color: #fff;
  color: #606266;
  margin: 10px 10px 10px 0;
}

.el-form-item {
    margin-bottom: 0px;
}

.form-with-border {
  border: 1px solid #ccc;
  /* padding: 20px; */
  margin-top: 40px;
  margin-bottom: 80px;
}

.recordinp>>>.el-textarea__inner{
  /* height: 150px; */
  resize: none;
}

.yijian{
  margin: 30px 0 30px 0;
}

.recordinp > .tijiao{
  text-align: center;
}
.recordinp > .tablebiao{
  margin: 30px 0 30px 0;
}

.button-style{
  background-color: #169bd5;
  color: white;
  padding: 10px;
}

.fye{
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(121, 121, 121, 0.1);
  border-top: 0;
  padding: 15px;
}

</style>
