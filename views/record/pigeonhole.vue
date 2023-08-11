<template>
  <transition name="modal">
    <div v-show="flag" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <span v-show="numb === 1">容缺归档</span>
            <span v-show="numb === 2">发起整改</span>
            <i class="el-icon-close" @click="thisQuxiao" />
          </div>
          <div class="modal-body">
            <div class="modal-box">
              <el-input
                v-model="list.reason"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 6}"
                :placeholder="teitle"
                class="borderNone"
              />
            </div>
          </div>
          <div class="modal-footer">
            <el-button size="mini" class="btncolor" @click="thisQuxiao">取消</el-button>
            <el-button v-show="numb === 1" type="primary" size="mini" @click="rongOk">确定</el-button>
            <el-button v-show="numb === 2" type="primary" size="mini" @click="thisOk">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import { addRectify, addDafile } from '../../api/manage.js'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    num: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      flag: false,
      numb: 1,
      teitle: '',
      // list: {
      //   // 发起整改
      //   createBy: '',
      //   createTime: 1690790732000,
      //   daId: 0,
      //   deptId: 0,
      //   deptName: '',
      //   params: {},
      //   rectifyReason: '',
      //   remark: '',
      //   updateBy: 'string',
      //   updateTime: 1690790732000
      // },
      list: {
        // 发起整改
        daId: '',
        reason: ''
      },
      list2: {
        daId: 0,
        status: ''
      }
    }
  },
  methods: {
    thisOk() {
      // console.log(this.list);
      addRectify(this.list).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '发起整改成功',
            type: 'success'
          })
          this.$emit('transfer', this.user)
        }
      })
      this.list.rectifyReason = ''
      this.flag = !this.flag
    },
    thisQuxiao() {
      this.list.rectifyReason = ''
      this.flag = !this.flag
    },
    rongOk() {
      this.list2.rectifyReason = this.list.rectifyReason
      addDafile(this.list2).then(res => {
        if (res.data.code) {
          if (res.data.code === 500) {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
            this.list.rectifyReason = ''
            this.$emit('transfer', this.user)
          }
        } else {
          this.$message({
            message: '容缺归档成功',
            type: 'warning'
          })
          this.list.rectifyReason = ''
          this.$emit('transfer', this.user)
        }
      })
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
.modal-box>>>.el-textarea__inner{
  /* height: 150px; */
  border: 0;
  resize: none;
}

.btncolor{
  color: #0097fe;
}

.modal-wrapper {
  width: 350px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.modal-box{
  margin: 0 10px;
  border: 1px solid rgba(121, 121, 121, 0.1);
}

.modal-container{
  width: 350px;
  height: 210px;
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
</style>
