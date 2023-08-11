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
            <div class="modal-box">
              <el-timeline :reverse="reverse">
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :timestamp="activity.timestamp"
                  :color="activity.color"
                >
                  {{ activity.content }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      textarea2: '',
      flag: false,
      title: '新建事项',
      reverse: false,
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15',
        color: '#0bbd87'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]
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
.modal-box>>>.el-input__inner{
  /* margin-bottom: 20px; */
  margin: 10px 0 10px 10px;
  width: 200px;
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
  margin: 50px 50px 40px 20px;
  /* border: 1px solid rgba(121, 121, 121, 0.1); */
}

.modal-container{
  width: 500px;
  /* height: 410px; */
  max-height: 500px;
  overflow-y: scroll;
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
