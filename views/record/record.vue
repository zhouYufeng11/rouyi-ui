<template>
  <div class="box">
    <div class="boxtop">
      <span>档案管理</span>
    </div>
    <div class="recordinp">
      <el-row :gutter="30">
        <el-col :span="4">
          <div class="grid-content">
            <el-input v-model="formfile.daNo" size="mini" placeholder="电子文件号/档案流水号" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-select v-model="formfile.status" placeholder="档案状态" size="mini">
              <el-option label="待补齐" value="0" />
              <el-option label="待审核" value="1" />
              <el-option label="待补正" value="2" />
              <el-option label="已完成" value="3" />
              <el-option label="整改中" value="4" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="formfile.adminName" size="mini" placeholder="行政相对人名称" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="formfile.adminCertNo" size="mini" placeholder="行政相对人号码" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-date-picker
              v-model="formfile.updateTime"
              type="date"
              placeholder="更新时间"
              style="width: 100%;"
              :clearable="false"
              value-format="timestamp"
              size="mini"
            />
          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="search ">查询</el-button>
          <el-button size="mini" icon="el-icon-refresh-left" @click="resetting">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="30" class="el-top">
        <el-col :span="4">
          <el-input v-model="formfile.title" size="mini" placeholder="题名" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="formfile.year" size="mini" placeholder="年度" />
        </el-col>
        <el-col :span="4">
          <el-select v-model="formfile.departId" placeholder="所属处室" size="mini">
            <el-option label="资源管理处" value="0" />
            <el-option label="登记注册处" value="1" />
            <el-option label="工程许可处" value="2" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="formfile.year" placeholder="所属年度" size="mini">
            <el-option label="2010" value="2010" />
            <el-option label="2011" value="2011" />
            <el-option label="2012" value="2012" />
            <el-option label="2013" value="2013" />
            <el-option label="2014" value="2014" />
            <el-option label="2015" value="2015" />
            <el-option label="2016" value="2016" />
            <el-option label="2017" value="2017" />
            <el-option label="2018" value="2018" />
            <el-option label="2019" value="2019" />
            <el-option label="2020" value="2020" />
            <el-option label="2021" value="2021" />
            <el-option label="2022" value="2022" />
            <el-option label="2023" value="2023" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="formfile.trackStatus" placeholder="是否有快递单号" size="mini">
            <el-option label="是" value="0" />
            <el-option label="否" value="1" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="formfile.status" placeholder="审核状态" size="mini">
            <el-option label="审核中" value="0" />
            <el-option label="已审核" value="1" />
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="boxtablefrom">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="headClass"
        :cell-style="rowClass"
        @selection-change="() => {}"
      >
        <el-table-column type="selection" />
        <el-table-column label="流水号" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="档案号" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.daId }}</template>
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
        <el-table-column prop="deptName" label="所处部门" show-overflow-tooltip />
        <el-table-column prop="daStatus" label="审核流水状态" width="100">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.daStatus === 0" class="el-icon-warning">待补齐</el-tag>
            <el-tag v-show="scope.row.daStatus === 1" type="success" class="el-icon-success">待审核</el-tag>
            <el-tag v-show="scope.row.daStatus === 2" type="success" class="el-icon-success">审核中</el-tag>
            <el-tag v-show="scope.row.daStatus === 3" type="success" class="el-icon-success">已完成</el-tag>
            <el-tag v-show="scope.row.daStatus === 4" type="success" class="el-icon-success">整改中</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="daCreator" label="著录人" show-overflow-tooltip />
        <el-table-column prop="createTime" label="更新时间" show-overflow-tooltip />
        <el-table-column prop="status" label="审核状态" width="100">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.status === null" class="el-icon-warning">未审核</el-tag>
            <el-tag v-show="scope.row.status === 1" class="el-icon-warning">通过</el-tag>
            <el-tag v-show="scope.row.status === 0" class="el-icon-warning">驳回</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div class="button-group">
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="message(scope.row.daId, scope.row.sort, scope.row.id, scope.row.status)">审核</el-button>
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="() => {}">查看</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationchange">
        <span>合计：{{ listTotal }}</span>
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagetotal"
          layout="prev, pager, next, sizes, jumper"
          :total="listTotal"
          :current-page="pageNum"
          @current-change="log"
          @size-change="handleSizeChange"
        />
        <!-- :current-page.sync="currentPage2" -->
        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
      </div>
      <FileReview ref="messageBox" @transfer="getUser" />
    </div>
  </div>
</template>

<script>
import FileReview from './fileReview.vue'
import { getverifyList, listManage, eventList, seachverifyList } from '../../api/manage.js'

export default {
  components: {
    FileReview
  },
  data() {
    return {
      options: [
        {
          value: 1,
          label: 2
        },
        {
          value: 2,
          label: 2
        },
        {
          value: 3,
          label: 2
        },
        {
          value: 4,
          label: 2
        }
      ],
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
        year: '',
        trackStatus: ''
      },
      tableData: [],
      listTotal: 0,
      pageNum: 1,
      pagetotal: 10,
      eventId: 0
    }
  },
  watch: {
    pageNum() {
      this.formfile.pageNum = this.pageNum
      listManage(this.formfile).then(response => {
        console.log(response)
        this.tableData = response.rows
        this.listTotal = Number(response.total)
      })
    },
    pagetotal() {
      this.formfile.pageSize = this.pagetotal
      listManage(this.formfile).then(response => {
        console.log(response)
        this.tableData = response.rows
        this.listTotal = Number(response.total)
      })
    },
    num() {
    }
  },
  created() {
    // getApplyList(this.formfile).then(response => {
    //   // console.log(response)
    //   this.tableData = response.rows
    //   this.listTotal = Number(response.total)
    // })
    eventList().then(res => {
      console.log(res.rows[1].id)
      this.eventId = res.rows[1].id
    })
    getverifyList(this.eventId).then(res => {
      this.tableData = res.rows
      this.listTotal = Number(res.total)
    })
  },
  methods: {
    headClass() {
      return 'text-align: center;background:#efefef;'
    },
    rowClass() {
      return 'text-align: center;font-size: 10px;'
    },
    resetting() {
      this.formfile = {
        pageNum: 1,
        pageSize: 10,
        departId: '',
        deptId: '',
        endTime: '',
        name: '',
        startTime: '',
        status: '',
        num: 10
      }
      getverifyList(this.formfile).then(response => {
        // console.log(response)
        this.tableData = response.rows
        this.listTotal = Number(response.total)
      })
    },
    log(val) {
      this.pageNum = val
    },
    handleSizeChange(val) {
      this.pagetotal = val
    },
    search() {
      console.log(this.formfile)
      seachverifyList(this.formfile).then(response => {
        console.log(response)
        this.tableData = response.rows
        this.listTotal = Number(response.total)
      })
    },
    message(daId, sort, id, status) {
      this.$refs.messageBox.flag = true
      this.$refs.messageBox.daId = daId
      this.$refs.messageBox.list.id = id
      this.$refs.messageBox.status = status
      // this.$refs.messageBox.list.sort = sort
      console.log(id)
    },
    getUser() {
      getverifyList(this.daId).then(res => {
        console.log(res)
        this.tablea = res.data
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
  justify-content: space-between;
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
