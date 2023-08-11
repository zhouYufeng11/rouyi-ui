<template>
  <transition name="modal">
    <div v-show="flag" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <span>{{ title }}</span>
            <i class="el-icon-close" @click="thisQuxiao" />
          </div>
          <div class="modal-body">
            <el-select v-model="input" placeholder="请选择审核块类型" size="mini" style="margin: 0 0 20px 20px;">
              <el-option label="会签" :value="1" />
              <el-option label="或签" :value="0" />
            </el-select>
            <el-select v-model="formfile.reviewerName" placeholder="选择审核人" size="mini" style="margin: 0 0 20px 20px;">
              <el-option label="张三" value="张三" />
              <el-option label="李四" value="李四" />
              <el-option label="王五" value="王五" />
            </el-select>
          </div>
          <div class="modal-footer">
            <el-button size="mini" class="btncolor" @click="thisQuxiao">取消</el-button>
            <el-button v-show="title === '新增审核流程'" type="primary" size="mini" @click="thisOk">确定</el-button>
            <el-button v-show="title === '编辑审核流程'" type="primary" size="mini" @click="changeOk">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import { addFlow, changeFlow } from '../../api/manage.js'

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
      formfile: {
        deptId: 0,
        deptName: 'string',
        // 审核事件id
        eventId: 0,
        // 审核id
        reviewerId: 0,
        // 审核人名称
        reviewerName: '',
        // 层级
        sort: ''
      },
      input: '',
      num: 0,
      title: '',
      list: {
        id: '',
        reviewerName: ''
      }
    }
  },
  watch: {
  },
  created() {},
  methods: {
    thisOk() {
      addFlow(this.formfile).then(res => {
        if (res.code === 200) {
          this.$emit('num')
          // this.flag = !this.flag
        }
      })
      this.$emit('num')
      this.formfile.reviewerName = ''
      this.flag = !this.flag
    },
    thisQuxiao() {
      this.formfile.reviewerName = ''
      this.flag = !this.flag
    },
    changeOk() {
      this.list.reviewerName = this.formfile.reviewerName
      changeFlow(this.list).then(res => {
        if (res.code === 200) {
          this.formfile.reviewerName = ''
          this.$emit('num')
          // this.flag = !this.flag
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

.modal-container{
  width: 350px;
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
</style>
