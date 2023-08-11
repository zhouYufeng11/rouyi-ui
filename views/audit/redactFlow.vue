<template>
  <div class="box">
    <div class="boxtop">
      <span>审批流程管理</span>
    </div>
    <div v-for="item in flowList" :key="item.id" class="redact">
      <div class="redactTop">
        <span>审核</span>
      </div>
      <div class="redactBox" @click="tianc(1, item.id, item.reviewerName)">
        <p>审核人：{{ item.reviewerName }}</p>
        <p>审核层级：{{ item.sort }}</p>
      </div>
      <i class="el-icon-bottom" />
    </div>
    <el-button class="btn" @click="tianc(2)">添加流程</el-button>
    <Message ref="childMes" @num="changenum" />
  </div>
</template>

<script>
import { geflowList } from '../../api/manage.js'
import Message from './message.vue'

export default {
  components: {
    Message
  },
  data() {
    return {
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
      pagetotal: 10,
      num: 1,
      flowList: []
    }
  },
  watch: {},
  created() {
    geflowList().then(res => {
      console.log(res)
      this.flowList = res.rows
      this.num = Number(res.total) + 1
    })
  },
  methods: {
    tianc(status, id, reviewerName) {
      if (status === 1) {
        this.$refs.childMes.title = '编辑审核流程'
        this.$refs.childMes.list.id = id
        this.$refs.childMes.formfile.reviewerName = reviewerName
      } else {
        this.$refs.childMes.title = '新增审核流程'
      }
      this.$refs.childMes.formfile.sort = this.num
      this.$refs.childMes.flag = true
    },
    changenum() {
      this.num++
      geflowList().then(res => {
        console.log(res)
        this.flowList = res.rows
        this.num = Number(res.total) + 1
      })
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
  /* padding-top: 20px; */
  padding-left: 20px;
  border-radius: 12px 12px 0 0;
}

.boxtop span {
  /* align-items: 60px; */
  font-weight: 800;
  color: #666666
}
.redact {
  margin: 0 0 0 100px ;
}

.redactTop {
  width: 400px;
  height: 50px;
  background-color: #f2f2f2;
  box-shadow: 1px 1px 1px 1px rgba(0,0,0,.2);
  line-height: 50px;
  padding-left: 10px;
}

.redactTop span {
  font-weight: 800;
}

.redactBox {
  width: 400px;
  height: 200px;
  padding: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0,0,0,.2);
  color: #666666;
}

.redact i {
  margin: 30px 170px;
  font-size: 50px;
}

.btn {
  margin: 0 0 100px 250px;
}

</style>
