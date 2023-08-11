<template>
  <transition name="modal">
    <div v-show="flag" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <span>填写快递单号</span>
            <i class="el-icon-close" @click="thisQuxiao" />
          </div>
          <div class="modal-body">
            <div class="modal-box">
              <el-input
                v-model="list.trackNo"
                size="mini"
                placeholder="请输入快递单号"
              />
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

import { updateManage } from '../../api/manage.js'

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
        id: 0,
        trackNo: ''
      }
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
  },
  created() {},
  methods: {
    thisOk() {
      // this.tiankd.id = this.id
      // this.tiankd.trackNo = this.kdihao
      updateManage(this.list).then(res => {
        if (res.code === 200) {
          this.list.trackNo = ''
          this.flag = !this.flag
          this.$message({
            message: '快递单号填写成功',
            type: 'success'
          })
          this.$emit('transfer', this.user)
        }
      })
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
  border: 0;
  resize: none;
  /* margin: 50px 50px 40px 20px ; */
  width: 250px;
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
  width: 350px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.modal-box{
  margin: 50px 50px 40px 20px;
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
