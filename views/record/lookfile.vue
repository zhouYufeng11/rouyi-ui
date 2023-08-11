<template>
  <div class="box">
    <div class="boxtop">
      <span>查看文件</span>
    </div>
    <div class="boxtablefrom">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        class="tablestyle"
        :header-cell-style="headClass"
        :cell-style="rowClass"
      >
        <el-table-column label="序号" width="90" type="index" />
        <el-table-column prop="fileType" label="文件类型" />
        <el-table-column prop="fileName" label="文件名称" show-overflow-tooltip />
        <el-table-column prop="fileLength" label="文件大小">
          <template slot-scope="scope">
            <div class="button-group">
              <span>{{ scope.row.fileLength }}MB</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="fileWeight" label="文件权重" width="90" />
        <el-table-column prop="createTime" label="上传时间" width="140" />
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <div class="button-group">
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="viewfile(scope.row.fileUrl)">查看</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationchange">
        <div>
          <span>合计:{{ total }}</span>
        </div>
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="prev, pager, next, sizes"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <!-- @size-change="handleSizeChange" -->
        <!-- :current-page.sync="currentPage2" -->
      </div>
      <div class="btn">
        <el-button type="primary" class="btn-color" size="mini" @click="onGoBack">返回著录信息</el-button>
        <el-button type="primary" class="btn-color" size="mini" @click="backAdministration">返回档案管理</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import { getFlieList } from '../../api/manage.js'
import { Base64 } from 'js-base64'

export default {
  data() {
    return {
      tableData: [],
      input3: '',
      options: {
        pageSize: 10,
        pageNum: 1,
        daId: 0
      },
      value: '',
      total: 0,
      pageNum: 1,
      pageSize: 10
    }
  },
  watch: {
    pageNum() {
      this.options.pageNum = this.pageNum
      getFlieList(this.options).then(res => {
        console.log(res)
        this.tableData = res.rows
        this.total = Number(res.total)
      })
    },
    pageSize() {
      this.options.pageSize = this.pageSize
      getFlieList(this.options).then(res => {
        console.log(res)
        this.tableData = res.rows
        this.total = Number(res.total)
      })
    }
  },
  created() {
    this.options.daId = this.$route.query.id
    getFlieList(this.options).then(res => {
      console.log(res)
      this.tableData = res.rows
      this.total = Number(res.total)
    })
  },
  methods: {
    viewfile(url) {
      // console.log('http://10.10.10.18:8012/onlinePreview?url=' + encodeURIComponent(Base64.encode(url)))
      this.$preView.show({ fileUrl: 'http://10.10.10.18:8012/onlinePreview?url=' + encodeURIComponent(Base64.encode(url)) })
      // window.open('http://10.10.10.18:8012/onlinePreview?url=' + encodeURIComponent(Base64.encode(url)))
    },
    headClass() {
      return 'text-align: center;background:#d7d7d7;'
    },
    rowClass() {
      return 'text-align: center;font-size: 10px;'
    },
    onGoBack() {
      this.$router.back()
    },
    backAdministration() {
      this.$router.push('/administration')
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageNum = val
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

.tablestyle .el-input__inner{
  border: 0px;
}

.boxtop {
  width: 100%;
  height: 60px;
  background-color: #f9f9f9;
  padding-top: 20px;
  padding-left: 20px;
  border-radius: 12px 12px 0 0;
  margin-bottom: 50px;
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

.boxtablefrom {
  margin-top: 50px;
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
  margin-right: -8px;
}

.btn{
  text-align: center;
  margin-top: 60px;
  margin-bottom: 50px;
}

.btn-color{
  background-color: #169bd5;
  color: white;
}

</style>
