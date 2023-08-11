<template>
  <div class="box">
    <div class="boxtop">
      <span>事项管理</span>
    </div>
    <div class="recordinp">
      <el-row :gutter="30">
        <el-col :span="4">
          <div class="grid-content">
            <el-input v-model="fileList.itemNo" size="mini" placeholder="子项代码" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="fileList.itemName" size="mini" placeholder="子项名称" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="fileList.dictValue" size="mini" placeholder="主项代码" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="fileList.dictLabel" size="mini" placeholder="主项名称" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="fileList.phone" size="mini" placeholder="事项类型" />
          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="seach">查询</el-button>
          <el-button size="mini" icon="el-icon-refresh-left" @click="resetting">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="30" class="el-top">
        <el-col :span="4">
          <div class="grid-content">
            <el-input v-model="fileList.departId" size="mini" placeholder="部门代码" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="fileList.departtName" size="mini" placeholder="部门名称" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-select v-model="fileList.level" placeholder="密级" size="mini">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
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
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="fileList.years" size="mini" placeholder="目录代码" />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="boxtablefrom">
      <div class="tablebtn">
        <el-button type="primary" size="mini" @click="xinz(1, '')">新建事项</el-button>
      </div>
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="headClass"
        :cell-style="rowClass"
        row-key="id"
        :expand-row-keys="expands"
        :reserve-selection="true"
        @expand-change="rowClick"
      >
        <!-- :row-key="row => row.id"
        :expand-row-keys="expandRows"
        @expand-change="handleExpandChange" -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              ref="multipleTable"
              border
              :data="minList"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="headClass"
              :cell-style="rowClass"
              :show-header="false"
              class="tablepad"
            >
              <el-table-column
                :label="props.row.name"
                prop="value"
              />
              <el-table-column label="操作" width="180">
                <div class="button-group">
                  <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="handlePreView">预览</el-button>
                  <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style">生成签章文件</el-button>
                </div>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          label="子项代码"
          prop="itemNo"
        />
        <el-table-column
          label="子项名称"
          prop="itemName"
          show-overflow-tooltip
        />
        <el-table-column
          label="主项代码"
          prop="dictValue"
        />
        <el-table-column
          label="主项名称"
          prop="dictLabel"
        />
        <el-table-column
          label="处室名称"
          prop="departtName"
        />
        <el-table-column
          label="部门名称"
          prop="deptName"
          width="150"
        />
        <el-table-column label="密级">
          <template slot-scope="scope">
            <span v-show="scope.row.level === 0">公开级</span>
            <span v-show="scope.row.level === 1">国内级</span>
            <span v-show="scope.row.level === 2">内部级</span>
            <span v-show="scope.row.level === 3">秘密级</span>
            <span v-show="scope.row.level === 4">机密级</span>
            <span v-show="scope.row.level === 5">绝密级</span>
          </template>
        </el-table-column>
        <el-table-column label="保管期限" prop="retenPeriod">
          <template slot-scope="scope">
            <span v-show="scope.row.retenPeriod === 'D10'">10年</span>
            <span v-show="scope.row.retenPeriod === 'D20'">20年</span>
            <span v-show="scope.row.retenPeriod === 'D30'">30年</span>
            <span v-show="scope.row.retenPeriod === 'Y'">永久</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <div class="button-group">
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="xinz(2, scope.row.id)">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationchange">
        <span>合计：{{ total }}</span>
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="fileList.pageSize"
          layout="prev, pager, next, sizes"
          :current-page="fileList.pageNum"
          :total="total"
          @current-change="changePage"
          @size-change="changeSize"
        />
        <!-- :current-page.sync="currentPage2" -->
        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
      </div>
      <Newmatter ref="childNew" @transfer="getUser" />
    </div>
  </div>
</template>

<script>

import Newmatter from './newmatter.vue'
import { getlistManage } from '../../api/manage.js'
import { getTemplateList } from '../../api/applyMessage/index.js'

export default {
  components: {
    Newmatter
  },
  data() {
    return {
      expandRows: [],
      tableData: [],
      // formfile: {
      //   electronic: '',
      //   state: '',
      //   name: '',
      //   phone: '',
      //   startTime: '',
      //   endTime: '',
      //   title: '',
      //   years: '',
      //   department: '',
      //   newYear: '',
      //   courier: ''
      // },
      options: [{
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
      value: '',
      total: 0,
      list: {
        pageSize: 10,
        pageNum: 1
      },
      fileList: {
        deptId: '',
        deptName: '',
        dictValue: '',
        dictLabel: '',
        itemName: '',
        itemNo: '',
        level: '',
        pageNum: 1,
        pageSize: 10,
        retenPeriod: ''
      },
      minList: [
        {
          value: '受理通知书',
          template: ''
        },
        {
          value: 'EMS邮寄表',
          template: ''
        }
      ],
      expands: []
    }
  },
  created() {
    getlistManage(this.fileList).then(res => {
      this.tableData = res.rows
      this.total = Number(res.total)
    })
  },
  methods: {
    viewfile() {
      // 1、  根据 项目的No 去查询该项目所对应的模板
      getTemplateList({
        itemNo: '1688401782642978818',
        pageNum: 0,
        pageSize: 10
      }).then(res => {
        this.tableData = res.rows
        this.total = Number(res.total)
      })
    },
    handlePreView() {
      const template = this.minList[0].template
      if (template) {
        this.$preView.show({ status: 'html', fileUrl: this.minList[0].template })
      }
    },
    // handleExpandChange(row, expandedRows) {
    //   if (expandedRows.length > 1) {
    //     this.$refs.multipleTable.toggleRowExpansion(expandedRows[0])
    //   }
    // },
    changePage(val) {
      this.fileList.pageNum = val
      getlistManage(this.fileList).then(res => {
        this.tableData = res.rows
        this.total = Number(res.total)
      })
    },
    changeSize(val) {
      this.fileList.pageSize = val
      getlistManage(this.fileList).then(res => {
        this.tableData = res.rows
        this.total = Number(res.total)
      })
    },
    getUser() {
      getlistManage(this.list).then(res => {
        this.tableData = res.rows
        this.total = Number(res.total)
      })
    },
    headClass() {
      return 'text-align: center;background:#efefef;'
    },
    rowClass() {
      return 'text-align: center;font-size: 10px;'
    },
    resetting() {
      this.fileList = {
        deptId: '',
        deptName: '',
        dictValue: '',
        dictLabel: '',
        itemName: '',
        itemNo: '',
        level: '',
        pageNum: 1,
        pageSize: 10,
        retenPeriod: ''
      }
      getlistManage(this.list).then(res => {
        this.tableData = res.rows
        this.total = Number(res.total)
      })
    },
    xinz(num, id) {
      if (num === 1) {
        this.$refs.childNew.title = '新建事项'
        this.$refs.childNew.num++
      } else {
        this.$refs.childNew.title = '编辑事项'
        this.$refs.childNew.id = id
        this.$refs.childNew.num++
      }
      this.$refs.childNew.flag = true
    },
    seach() {
      getlistManage(this.fileList).then(res => {
        this.tableData = res.rows
        this.total = Number(res.total)
      })
    },
    // rowClick(row) {
    //   this.expands = []
    //   this.expands.push(row.id)
    //   console.log(this.expands)
    // },
    async rowClick(data) {
      const { itemNo } = data
      this.expands = []
      this.expands.push(data.id)
      console.log(this.expands)

      const res = await getTemplateList({
        itemNo,
        pageNum: 0,
        pageSize: 10
      })

      if (!res.rows.length) {
        this.minList[0].value = '受理通知书'
        this.minList[0].template = ''
        return
      }
      const { template, templateName } = res.rows[0]

      this.minList[0].value = templateName
      this.minList[0].template = template

      console.log(this.minList)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
  color: #409eff;
  margin: 0px 0px 0px 0px;
  padding: 4px;
}

.button-group .el-button {
  margin-right: 4px;
}

.el-table--medium .el-table__cell{
  padding: 0;
}

</style>
