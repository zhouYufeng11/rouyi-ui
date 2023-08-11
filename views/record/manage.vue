<template>
  <div class="box">
    <div class="boxtop">
      <span>审批记录</span>
    </div>
    <div class="recordinp">
      <el-row :gutter="30">
        <el-col :span="4">
          <div class="grid-content">
            <el-input v-model="formfile.id" size="mini" placeholder="申请流水" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="formfile.name" size="mini" placeholder="申请人姓名" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="formfile.responsiblePerson" size="mini" placeholder="责任人" />
          </div>
        </el-col>
        <el-col :span="4">
          <el-select v-model="formfile.applyType" placeholder="申请类型" size="mini">
            <el-option label="借阅" value="0" />
            <el-option label="下载" value="1" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="formfile.status" placeholder="申请状态" size="mini">
            <el-option label="待审核" value="0" />
            <el-option label="审核中" value="1" />
            <el-option label="通过" value="2" />
            <el-option label="驳回" value="3" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="search ">查询</el-button>
          <el-button size="mini" icon="el-icon-refresh-left" @click="resetting">重置</el-button>
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
        <el-table-column label="申请流水" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="applyNum" label="申请档案数量" show-overflow-tooltip />
        <el-table-column prop="departName" label="所属单位" />
        <el-table-column prop="applyType" label="申请类型" width="100">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.applyType === 0" class="el-icon-warning">借阅</el-tag>
            <el-tag v-show="scope.row.applyType === 1" type="success" class="el-icon-success">下载</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="申请人姓名" />
        <el-table-column prop="responsiblePerson" label="责任人" />
        <el-table-column prop="status" label="申请状态" width="100">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.status === null" type="info">待审核</el-tag>
            <el-tag v-show="scope.row.status === 0" type="info">待审核</el-tag>
            <el-tag v-show="scope.row.status === 1">审核中</el-tag>
            <el-tag v-show="scope.row.status === 2" type="success">通过</el-tag>
            <el-tag v-show="scope.row.status === 3" type="danger">驳回</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="examStatus" label="审核状态" width="100">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.examStatus === null" type="info">未审核</el-tag>
            <el-tag v-show="scope.row.examStatus === 0" type="info">未审核</el-tag>
            <el-tag v-show="scope.row.examStatus === 1" type="success">通过</el-tag>
            <el-tag v-show="scope.row.examStatus === 2" type="danger">驳回</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间" show-overflow-tooltip />
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <div class="button-group">
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="gotoSq(scope.row.id)">审批</el-button>
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="gotolook(scope.row.id)">查看</el-button>
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
    </div>
  </div>
</template>

<script>
import { getApplyList, flowList, getdamanage } from '../../api/manage.js'

export default {
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
        departId: '',
        deptId: '',
        endTime: '',
        name: '',
        startTime: '',
        status: ''
      },
      tableData: [],
      listTotal: 0,
      pageNum: 1,
      pagetotal: 10
    }
  },
  watch: {
    pageNum() {
      this.formfile.pageNum = this.pageNum
      getApplyList(this.formfile).then(response => {
        console.log(response)
        this.tableData = response.rows
        this.listTotal = Number(response.total)
      })
    },
    pagetotal() {
      this.formfile.pageSize = this.pagetotal
      getApplyList(this.formfile).then(response => {
        console.log(response)
        this.tableData = response.rows
        this.listTotal = Number(response.total)
      })
    }
  },
  created() {
    getApplyList(this.formfile).then(response => {
      // console.log(response)
      this.tableData = response.rows
      this.listTotal = Number(response.total)
    })
    // flowList().then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    gotolook(id) {
      this.$router.push('/lookmanage' + `?id=${id}`)
    },
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
        status: ''
      }
      getApplyList(this.formfile).then(response => {
        console.log(response)
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
      getApplyList(this.formfile).then(response => {
        console.log(response)
        this.tableData = response.rows
        this.listTotal = Number(response.total)
      })
    },
    gotoSq(id) {
      this.$router.push('/examine' + `?id=${id}`)
      // console.log(id)
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
