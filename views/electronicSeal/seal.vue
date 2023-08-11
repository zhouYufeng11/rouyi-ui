<template>
  <div class="box">
    <div class="boxtop">
      <span>印章管理</span>
    </div>
    <div class="recordinp">
      <el-row :gutter="30">
        <el-col :span="4">
          <div class="grid-content">
            <el-input v-model="formfile.userId" size="mini" placeholder="档案系统用户id" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="formfile.phone" size="mini" placeholder="用户手机号" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="formfile.email" size="mini" placeholder="电子邮箱" />
          </div>
        </el-col>
        <el-col :span="4">
          <el-input v-model="formfile.userName" size="mini" placeholder="姓名" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="formfile.eaccount" size="mini" placeholder="随e签账号" />
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="seach">查询</el-button>
          <el-button size="mini" icon="el-icon-refresh-left" @click="resetting">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="30" class="el-top">
        <el-col :span="4">
          <el-select v-model="formfile.sealType" placeholder="印章类型" size="mini">
            <el-option label="个人签名" value="1" />
            <el-option label="机构印章" value="2" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="formfile.sealHeight" size="mini" placeholder="印章高度" />
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
        @selection-change="() => {}"
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
        <el-table-column prop="eAccount" label="随e签账号" show-overflow-tooltip />
        <el-table-column prop="sealType" label="印章类型">
          <template slot-scope="scope">
            <div class="button-group">
              <span v-show="scope.row.sealType === 1">个人签名</span>
              <span v-show="scope.row.sealType === 2">机构印章</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sealHeight" label="印章高度" />
        <el-table-column prop="sealId" label="印章id" show-overflow-tooltip />
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <div class="button-group">
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="lookpng(scope.row.fileUrl)">查看图片</el-button>
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="gotoApply(scope.row.id)">编辑</el-button>
              <el-button type="primary" size="mini" icon="el-icon-edit" class="button-style" @click="delSeal(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationchange">
        <span>合计：{{ listTotal }}</span>
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-num="1"
          :page-size="pagetotal"
          layout="prev, pager, next, sizes, jumper"
          :total="listTotal"
          :current-page="pageNum"
        />
      </div>
    </div>
  </div>
</template>

<script>

import { getSigapplyList, delSealid } from '../../api/manage.js'
import { Base64 } from 'js-base64'

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
        userId: '',
        phone: '',
        email: '',
        userName: '',
        eAccount: '',
        sealType: '',
        sealHeight: ''
      },
      tableData: [],
      listTotal: 0,
      pageNum: 1,
      pagetotal: 10,
      list: {
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      imgUrl: ''
    }
  },
  watch: {
  },
  created() {
    getSigapplyList(this.list).then(res => {
      console.log(res)
      this.tableData = res.rows
      this.listTotal = Number(res.total)
    })
  },
  methods: {
    lookpng(img) {
      // this.dialogVisible = true
      // this.imgUrl = img
      this.$preView.show({ fileUrl: 'http://10.10.10.18:8012/onlinePreview?url=' + encodeURIComponent(Base64.encode(img)) })
    },
    gotoApply(id) {
      this.$router.push('/bianApply' + `?id=${id}`)
    },
    delSeal(id) {
      delSealid(id).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          getSigapplyList(this.list).then(res => {
            console.log(res)
            this.tableData = res.rows
            this.listTotal = Number(res.total)
          })
        }
      })
    },
    seach() {
      getSigapplyList(this.formfile).then(res => {
        console.log(res)
        this.tableData = res.rows
        this.listTotal = Number(res.total)
      })
    },
    resetting() {
      this.formfile = {
        pageNum: 1,
        pageSize: 10,
        userId: '',
        phone: '',
        email: '',
        userName: '',
        eAccount: '',
        sealType: '',
        sealHeight: ''
      }
      getSigapplyList(this.list).then(res => {
        console.log(res)
        this.tableData = res.rows
        this.listTotal = Number(res.total)
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

.imgSpan {
  display: flex;
  justify-content: space-evenly;
}
</style>
