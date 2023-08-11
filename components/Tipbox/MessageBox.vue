<template>
    <div>    
      <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="500px"
    >

    <el-form label-width="100px" class="demo-ruleForm">
      <el-form-item label="申请信息">
        <el-input 
          v-model.trim="message"
          :placeholder="messagePlaceholder"
          autocomplete="off">
        </el-input>
      </el-form-item>
    </el-form>
        

      <span slot="footer" class="dialog-footer">
          <el-button @click="optionMessageBox('cancel', $event)">取 消</el-button>
          <el-button @click="optionMessageBox('access', $event)" type="primary">确 定</el-button>
      </span>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'MessageBox',
    data() {
      return {
        title: "text",
        message: "",
        pre: "",
        prePlaceholder: "请输入编号前缀",
        messagePlaceholder: "请输入申请信息",
        dialogVisible: false
      };
    },
    emits: ['option-message-box'],
    methods: {
        optionMessageBox(status, ev) {
            if(status == 'access') {
                this.$emit('option-message-box', {
                  message: this.message
                });
            } else {
              this.dialogVisible = false;
            }

            
            this.message = '';
        }
    }
  };
</script>
