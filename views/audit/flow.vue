<template>
  <div class="box">
    <div class="boxtop">
      <span>审批记录</span>
    </div>
    <div class="recordinp">
      <el-row :gutter="30">
        <el-col :span="4">
          <div class="grid-content">
            <el-input v-model="formfile.id" size="mini" placeholder="事件编号" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <!-- <el-input v-model="formfile.eventType" size="mini" placeholder="事件名称" /> -->
            <el-select v-model="formfile.eventType" placeholder="事件名称" size="mini">
              <el-option label="档案审核" value="0" />
              <el-option label="借阅审批" value="1" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="formfile.eventDesc" size="mini" placeholder="事件说明" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-date-picker
              v-model="formfile.updateTime"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
              size="mini"
            />
          </div>
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
        <el-table-column label="事件编号" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="eventType" label="事件名称">
          <template slot-scope="scope">
            <span v-show="scope.row.eventType === 0">档案审核</span>
            <span v-show="scope.row.eventType === 1">借阅审批</span>
          </template>
        </el-table-column>
        <el-table-column prop="eventDesc" label="事件说明" show-overflow-tooltip />
        <el-table-column prop="createTime" label="编辑时间" />
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <div class="button-group">
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="gotoRedact">编辑审核流程</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationchange">
        <span>合计：{{ listTotal }}</span>
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next, jumper"
          :total="listTotal"
          :current-page="pageNum"
          @current-change="log"
        />
        <!-- :current-page.sync="currentPage2" -->
        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
      </div>
    </div>
  </div>
</template>

<script>
import { eventList } from '../../api/manage.js'

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
      eventList(this.formfile).then(response => {
        console.log(response)
        this.tableData = response.rows
        this.listTotal = Number(response.total)
      })
    }
  },
  created() {
    eventList().then(res => {
      console.log(res)
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
        status: ''
      }
      eventList(this.formfile).then(response => {
        console.log(response)
        this.tableData = response.rows
        this.listTotal = Number(response.total)
      })
    },
    log(val) {
      this.pageNum = val
    },
    search() {
      eventList(this.formfile).then(response => {
        console.log(response)
        this.tableData = response.rows
        this.listTotal = Number(response.total)
      })
    },
    gotoRedact() {
      this.$router.push('/redactFlow')
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
