<template>
  <transition name="modal">
    <div v-show="flag" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <span>档案审核</span>
            <i class="el-icon-close" @click="thisQuxiao" />
          </div>
          <div class="modal-body">
            <div class="modal-box">
              <el-table
                ref="multipleTable"
                border
                :data="tablea"
                tooltip-effect="dark"
                style="width: 100%"
                :header-cell-style="headClass"
                :cell-style="rowClass"
                class="tablebiao"
              >
                <el-table-column label="审批环节" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.sort }}</template>
                </el-table-column>
                <el-table-column prop="status" label="意见类型">
                  <template slot-scope="scope">
                    <div class="button-group">
                      <span v-show="scope.row.status === 1">同意</span>
                      <span v-show="scope.row.status === 0">驳回</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="failReason" label="意见内容" show-overflow-tooltip />
                <el-table-column prop="reviewerName" label="审批人" />
                <el-table-column prop="updateTime" label="审批时间" />
              </el-table>
              <el-select v-model="list.status" placeholder="请选择" size="mini" class="yangshi" :disabled="!!status">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <div class="yijian">
                <el-input
                  v-model="list.failReason"
                  :disabled="!!status"
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 6}"
                  placeholder="请输入审批意见"
                  class="borderNone"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <el-button size="mini" class="btncolor" @click="thisQuxiao">取消</el-button>
            <el-button type="primary" size="mini" @click="thisOk">确定</el-button>
            <!-- <el-button type="primary" size="mini" @click="thisOk">确定</el-button> -->
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import { getverifyInfo, changeverify } from '../../api/manage.js'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      kdihao: '',
      flag: false,
      list: {
        status: '',
        failReason: '',
        sort: 3,
        id: ''
      },
      textareatext: '',
      options: [{
        value: '1',
        label: '同意'
      }, {
        value: '2',
        label: '驳回'
      }],
      value: '',
      daId: '',
      tablea: [],
      status: ''
    }
  },
  watch: {
    // flag() {
    //   if (this.flag) {
    //     listManage(this.list).then(res => {
    //       console.log(res)
    //       this.tiankd = res.rows[0]
    //     })
    //     console.log(this.list)
    //   }
    // }
    daId() {
      // this.list.id = this.daId
      getverifyInfo(this.daId).then(res => {
        console.log(res)
        this.tablea = res.data
      })
    }
  },
  created() {
  },
  methods: {
    headClass() {
      return 'text-align: center;background:#d7d7d7;'
    },
    rowClass() {
      return 'text-align: center;font-size: 10px;'
    },
    thisOk() {
      if (!this.status) {
        this.list.daId = this.daId
        changeverify(this.list).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.$message({
              message: '档案审核成功',
              type: 'success'
            })
          }
        })
        this.$emit('transfer')
      }
      this.flag = !this.flag
    },
    thisQuxiao() {
      this.list.trackNo = ''
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
.modal-box>>>.el-input__inner{
  /* height: 150px; */
  /* border: 0; */
  resize: none;
  /* margin: 50px 50px 40px 20px ; */
  /* width: 400px; */
}
.modal-header > span {
  font-size: 14px;
  color: #666666;
  font-weight: 800;
}

.modal-header > i {
  color: #666666;
  font-weight: 800;
}

.btncolor{
  color: #0097fe;
}

.modal-wrapper {
  width: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.modal-box{
  margin: 10px;
  border: 1px solid rgba(121, 121, 121, 0.1);
}

.modal-container{
  width: 500px;
  /* height: 210px; */
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

.yangshi{
  margin: 20px 0;
}
</style>
