<template>
  <transition name="modal">
    <div v-show="flag" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <span>整改记录</span>
            <i class="el-icon-close" @click="thisQuxiao" />
          </div>
          <div class="table-box">
            <el-table
              ref="multipleTable"
              border
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column type="index" />
              <el-table-column prop="rectifyReason" label="整改原因" show-overflow-tooltip />
              <el-table-column prop="c" label="要求整改人员" width="100" />
              <el-table-column prop="d" label="是否通过" width="100" />
              <el-table-column prop="createTime" label="整改时间" width="140" />
            </el-table>
          </div>
          <div class="modal-footer">
            <el-button size="mini" class="btncolor" @click="thisQuxiao">取消</el-button>
            <el-button type="primary" size="mini" @click="thisOk">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import { rectify } from '../../api/manage.js'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flag: false,
      personInfo: {
        no: null,
        sex: '',
        birthday: '',
        name: '',
        nation: '',
        politicsStatus: '',
        nativePlace: '',
        idCard: null
      },
      tableData: [],
      daId: 0
    }
  },
  watch: {
    daId() {
      console.log(this.daId)
      rectify(this.daId).then(res => {
        console.log(res)
        this.tableData = res.rows
      })
    }
  },
  methods: {
    thisOk() {
      this.flag = !this.flag
    },
    thisQuxiao() {
      this.textarea2 = ''
      this.flag = !this.flag
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btncolor{
  color: #0097fe;
}

.modal-wrapper {
  width: 800px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  /* font-size: 12px; */
}

.modal-box{
  margin: 0 10px;
  border: 1px solid rgba(121, 121, 121, 0.1);
}

.modal-container{
  width: 800px;
  /* height: 450px; */
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
  border-bottom: 1px solid rgba(121, 121, 121, 0.1);
}

.modal-footer {
  text-align: right;
  padding: 15px 10px;
  border-top: 1px solid rgba(121, 121, 121, 0.1);
}

.table-box{
  margin: 30px;
}

</style>
