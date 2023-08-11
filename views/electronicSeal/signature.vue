<template>
  <div class="box">
    <div class="boxtop">
      <span>审批记录</span>
    </div>
    <div class="recordinp">
      <el-row :gutter="30">
        <el-col :span="4">
          <div class="grid-content">
            <el-input v-model="formfile.userId" size="mini" placeholder="档案系统用户" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="formfile.phone" size="mini" placeholder="用户手机号" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="formfile.eMail" size="mini" placeholder="电子邮箱" />
          </div>
        </el-col>
        <el-col :span="4">
          <el-input v-model="formfile.userName" size="mini" placeholder="姓名" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="formfile.certType" size="mini" placeholder="证件类型" />
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="search ">查询</el-button>
          <el-button size="mini" icon="el-icon-refresh-left" @click="resetting">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="30" class="el-top">
        <el-col :span="4">
          <el-input v-model="formfile.certNo" size="mini" placeholder="证件号码" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="formfile.userId" size="mini" placeholder="userId" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="formfile.eAccount" size="mini" placeholder="随e签账号" />
        </el-col>
        <el-col :span="4">
          <el-date-picker
            v-model="formfile.validityStart"
            type="date"
            placeholder="有效期开始时间"
            size="mini"
            style="width: 100%;"
          />
        </el-col>
        <el-col :span="4">
          <el-date-picker
            v-model="formfile.validityEnd"
            type="date"
            placeholder="有效期结束时间"
            size="mini"
            style="width: 100%;"
          />
        </el-col>
      </el-row>
    </div>
    <div>
      <el-button type="primary" size="mini" class="btn" @click="xinz">新增签名用户</el-button>
      <el-button type="primary" size="mini" class="btn" @click="apply">申请印章</el-button>
    </div>
    <div class="boxtablefrom">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- :header-cell-style="headClass"
        :cell-style="rowClass" -->
        <el-table-column type="selection" />
        <el-table-column label="档案系统用户" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.userId }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="用户手机号" show-overflow-tooltip />
        <el-table-column prop="email" label="电子邮箱" show-overflow-tooltip />
        <el-table-column prop="userName" label="姓名" />
        <el-table-column prop="userType" label="用户类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="button-group">
              <span v-show="scope.row.userType === 1">个人用户</span>
              <span v-show="scope.row.userType === 2">企业用户</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="certType" label="证件类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="button-group">
              <span v-show="scope.row.certType === 0">身份证</span>
              <span v-show="scope.row.certType === 1">警官证</span>
              <span v-show="scope.row.certType === 2">护照</span>
              <span v-show="scope.row.certType === 3">军官证</span>
              <span v-show="scope.row.certType === 4">营业执照</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="certNo" label="证件号码" show-overflow-tooltip />
        <el-table-column prop="eaccount" label="随e签账号" show-overflow-tooltip />
        <el-table-column prop="issuer" label="颁发者" show-overflow-tooltip />
        <el-table-column prop="certInfo" label="证书信息" show-overflow-tooltip />
        <el-table-column prop="validityStart" label="有效期开始时间" show-overflow-tooltip />
        <el-table-column prop="validityEnd" label="有效期结束时间" show-overflow-tooltip />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="button-group">
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="changeSignature(scope.row.id)">编辑</el-button>
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
        />
        <!-- :current-page.sync="currentPage2" -->
        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
      </div>
    </div>
  </div>
</template>

<script>

import { getSignature } from '../../api/manage.js'

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
      // departId: '',
      // deptId: '',
      formfile: {
        pageNum: 1,
        pageSize: 10,
        userId: '',
        eMail: '',
        validityEnd: '',
        userName: '',
        validityStart: '',
        certType: '',
        certNo: '',
        eAccount: '',
        phone: ''
      },
      tableData: [],
      listTotal: 0,
      pageNum: 1,
      pagetotal: 10,
      list: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      multipleSelection: []
    }
  },
  watch: {
  },
  created() {
    getSignature(this.list).then(res => {
      console.log(res)
      this.tableData = res.rows
      this.listTotal = Number(res.total)
    })
  },
  methods: {
    changeSignature(id) {
      this.$router.push('/newSignature' + `?id=${id}`)
    },
    xinz() {
      this.$router.push('/newSignature')
    },
    apply() {
      if (this.multipleSelection.length > 0) {
        this.$router.push('/apply' + `?id=${this.multipleSelection[0].id}`)
      } else {
        this.$message({
          message: '请选择要申请',
          type: 'warning'
        })
      }
    },
    search() {
      getSignature(this.formfile).then(res => {
        console.log(res)
        this.tableData = res.rows
        this.listTotal = Number(res.total)
      })
    },
    resetting() {
      getSignature(this.list).then(res => {
        console.log(res)
        this.tableData = res.rows
        this.listTotal = Number(res.total)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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

.btn{
  margin: 20px 0 30px 40px;
}

</style>
