<template>
  <div class="downloadbox">
    <div class="boxtop">
      <span>上传文件</span>
    </div>
    <div class="recordinp">
      <div class="tpl-box" style="width: 0; height: 0; overflow: hidden;" ref="tplBox" />
      <message-box
        ref="messageBox"
        @option-message-box="optionMessageBox"
      />
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="headClass"
        :cell-style="rowClass"
      >
        <el-table-column
          type="index"
          width="50"
        />
        <el-table-column prop="templateName" label="模板名称" />

        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              class="button-style"
              @click="handleShowMessageBox(scope.row)"
            >
              快速生成
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="fye">
        <div>合计：</div>
        <div>
          <el-pagination
            layout="prev, pager, next, jumper"
            :total="400"
            :current-page="shangPage"
            :page-size="10"
            @size-change="() => {}"
            @current-change="() => {}"
          />
        </div>
      </div>
      <div>
        <el-upload
          ref="upload"
          class="upload"
          action=""
          :file-list="fileList"
          :auto-upload="false"
          :http-request="uploadFile"
          :on-preview="handlePictureCardPreview"
          :on-change="handleChange"
          multiple="multiple"
          :show-file-list="false"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
          >选取文件</el-button>
        </el-upload>
      </div>
      <el-table
        ref="multipleTable"
        border
        :data="file"
        style="width: 100%"
        :header-cell-style="headClass"
        :cell-style="rowClass"
      >
        <el-table-column
          type="index"
          width="50"
        />
        <el-table-column prop="fileName" label="文件名称" />
        <el-table-column prop="b" label="传输状态">
          <el-progress :percentage="100" status="success" />
        </el-table-column>
        <el-table-column prop="fileLength" label="文件大小">
          <template slot-scope="scope">
            <div class="button-group">
              <span>{{ scope.row.fileLength }}MB</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="上传时间" />
        <el-table-column prop="fileType" label="文件类型">
          <template slot-scope="scope">
            <div class="button-group">
              <input v-model="scope.row.fileType" type="text" style="border: 0;" @blur="changeType(scope.row.id,scope.row.fileType)">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <div class="button-gro up">
              <el-button type="primary" size="mini" class="button-style" @click="viewfile(scope.row)">查看</el-button>
              <el-button type="primary" size="mini" class="button-style" @click="deleteFile(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="fye">
        <div>合计：{{ total }}</div>
        <div>
          <el-pagination
            layout="prev, pager, next, jumper"
            :total="total"
            :current-page="xiaPage"
            :page-size="10"
            @size-change="() => {}"
            @current-change="pageChange"
          />
        </div>
      </div>
      <div class="tijiao">
        <el-button type="primary" class="button-style" size="small" @click="goback">返回档案管理</el-button>
        <el-button type="primary" class="button-style" size="small" @click="toExamine">发布审核</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import { upfile } from '../../api/manage.js'
import { uploadFiles } from '../../api/manage.js'
import { getInfo } from '../../api/login'
import { getFlieList } from '../../api/manage.js'
import { listManage, addverify, changefile, delDile } from '../../api/manage.js'
import { Base64 } from 'js-base64'
// import { getTemplateList } from '@/api/applyMessage/index.js'
//  row data
import MessageBox from '@/components/TipBox/MessageBox.vue'
import { getGenInfo, getTemplateList, uploadTemplate, generate } from '@/api/applyMessage/index.js';
const applyMessage = {}

export default {
  components: {
    MessageBox
  },
  data() {
    return {
      tableData: [{ a: 1 }],
      shangPage: 1,
      xiaPage: 1,
      fileList: [],
      file: [],
      // 不支持多选
      multiple: false,
      formData: '',
      list: {
        fileName: 'string',
        fileType: '无',
        fileUrl: 'string',
        daId: 0,
        deptId: 0,
        fileLength: '',
        fileWeight: 0
      },
      options: {
        pageSize: 10,
        pageNum: 1,
        daId: 0
      },
      list2: {
        pageSize: 10,
        pageNum: 1,
        id: 0
      },
      total: 0,
      info: {},
      list3: {
        id: 0,
        fileType: ''
      },
      imgUrl: ''
    }
  },
  computed: {
    filetotal() {
      return this.fileList.length
    }
  },
  created() {
    console.log(this.$store.state)
    getInfo().then(res => {
      console.log(res)
      this.list.deptId = res.user.dept.deptId
    })
    this.list.daId = this.$route.query.daId
    this.options.daId = this.$route.query.daId
    this.list2.id = this.$route.query.daId
    getFlieList(this.options).then(res => {
      console.log(res)
      this.file = res.rows
      this.total = Number(res.total)
    })
    listManage(this.list2).then(res => {
      this.info = res.rows[0]
      console.log(this.info)
    })
    // 1、  根据 项目的No 去查询该项目所对应的模板
    getTemplateList({
      itemNo: '1688401782642978818',
      pageNum: 0,
      pageSize: 10
    }).then(res => {
      this.tableData = res.rows
      this.total = Number(res.total)
    })
  },
  methods: {
    pageChange(val) {
      this.options.pageNum = val
      getFlieList(this.options).then(res => {
        console.log(res)
        this.file = res.rows
        this.total = Number(res.total)
      })
    },
    // successChange(file) {
    //   console.log(file)
    // },
    async deleteFile(id) {
      await delDile(id).then(res => {
        console.log(res)
      })
      await getFlieList(this.options).then(res => {
        console.log(res)
        this.file = res.rows
        this.total = Number(res.total)
      })
    },
    changeType(id, fileType) {
      this.list3.id = id
      this.list3.fileType = fileType
      changefile(this.list3).then(res => {
        console.log(res)
      })
    },
    headClass() {
      return 'text-align: center;background:#d7d7d7;'
    },
    rowClass() {
      return 'text-align: center;font-size: 10px;'
    },
    goback() {
      this.$router.push('/administration')
    },
    async handleChange(file, fileList) {
      this.fileList = fileList
      // console.log(this.fileList, "sb");
      console.log(file)
      // console.log(URL.createObjectURL(file.raw))
      this.list.fileName = file.name
      // this.list.fileType = file.name.split('.')[file.name.split('.').length - 1]
      // console.log(fileList)
      // console.log(file)
      // console.log(file.raw)
      this.list.fileLength = (file.size / 1024 / 1024).toFixed(2)
      // this.list.fileWeight =
      await uploadFiles(file.raw).then(res => {
        this.list.fileUrl = res.url
      })
      // console.log(this.list.fileUrl)
      await upfile(this.list).then(res => {
        if (res.code === 200) {
          getFlieList(this.options).then(res => {
            // console.log(res)
            this.file = res.rows
            this.total = Number(res.total)
          })
        }
      })
    },
    viewfile(list) {
      console.log(list)
      // this.flag = true
      // const url = list.fileUrl + '&fullfilename=test.txt'
      // this.imgUrl = 'http://10.10.10.18:8012/picturesPreview?urls=' + encodeURIComponent(url)
      // const url = list.fileUrl
      // this.imgUrl = 'http://10.10.10.18:8012/picturesPreview?urls=' + encodeURIComponent(Base64.encode(url))
      // // window.open('http://10.10.10.18:8012/picturesPreview?urls=' + encodeURIComponent(Base64.encode(url)))
      // this.$alert(`<img src="${this.imgUrl}" alt="">`, 'HTML 片段', {
      //   dangerouslyUseHTMLString: true
      // })
      const originUrl = list.fileUrl // 要预览文件的访问地址
      // var previewUrl = originUrl + '&fullfilename=test.txt'
      // console.log('http://10.10.10.18:8012/onlinePreview?url=' + encodeURIComponent(Base64.encode(originUrl)))
      // eslint-disable-next-line no-undef
      // window.open('http://10.10.10.18:8012/onlinePreview?url=' + encodeURIComponent(Base64.encode(originUrl)))
      this.$preView.show({ fileUrl: 'http://10.10.10.18:8012/onlinePreview?url=' + encodeURIComponent(Base64.encode(originUrl)) })
    },
    // 自定义上传文件
    uploadFile(file) {
      this.formData.append('file', file.file)
      // console.log(file.file, "sb2");
    },
    // 删除文件
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url
      // this.dialogVisible = true
      console.log(file.url)
    },
    // 发布审核
    toExamine() {
      if (this.info.trackNo) {
        this.$confirm('是否要发布审核?', '提示', {
          confirmButtonText: '继续发布',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.list3.daId = this.info.id
          addverify(this.list3.daId).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '发布审核成功!'
              })
              this.$router.push('/administration')
            }
          })
        }).catch(() => {
        })
      } else {
        this.$confirm('该档案尚无快递单号，请核查?', '提示', {
          confirmButtonText: '继续发布',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.list3.daId = this.info.id
          addverify(this.list3.daId).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '发布审核成功!'
              })
              this.$router.push('/administration')
            } else {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
            }
          })
        }).catch(() => {
        })
      }
    },
    async optionMessageBox(data, ev) { // 点击确认 => 整合数据，并将整合的数据传递给后端
      const { message } = data
      // 判断是 message 的值是否为空
      if (!message) {
        this.$message({
          message: '输入内容不能为空',
          type: 'warning'
        })
        return
      }

      let { daId, itemNo, template: tpl, templateId } = applyMessage

      console.log(templateId)
      // 2、  查询模板数据
      const result = await getGenInfo({
        daId: '1689599017142472706'
      })

      //  获取模板渲染数据
      const templateData = result.data
      templateData.message = message
      // 将申请信息追加进去
      console.log('data', result)

      //  进行模板字符串替换 拼接成真正的模板
      tpl = tpl.replace(/\{\{(.*?)\}\}/g, (node, key) => {
        console.log(key)
        return templateData[key.trim()]
      })

      //  获取容器，并将 template 放入里面, 为了求 签章位置的坐标
      const tplBox = this.$refs.tplBox
      tplBox.innerHTML = tpl

      //  添加之后获取元素，并获取位置
      const oTpl = tplBox.getElementsByClassName('tpl')[0]
      const sealBox = tplBox.getElementsByClassName('seal-box')[0]
      const tplHeight = parseInt(getComputedStyle(oTpl, null)['height'])
      const { offsetLeft, offsetTop } = sealBox
      const position = {
        x: offsetLeft,
        y: tplHeight - offsetTop
      }

      tplBox.innerHTML = '' //  清空 或者 tplBox.remove() 删除元素

      const fill = await generate({
        daId: '1689599017142472706',
        template: tpl,
        templateName: '11111',
        sealRule: {
          page: 1,
          x: position.x,
          y: position.y
        }
      })

      this.$refs.messageBox.dialogVisible = false

      console.log(fill)
    },
    async handleShowMessageBox(data) { //  点击快速生成 => 操作 messagebox 页面显示
      const daId = this.$route.query.daId
      const messageBox = this.$refs.messageBox
      messageBox.dialogVisible = true
      //  对后端数据进行缓存，便于后期数据整合
      applyMessage.daId = daId
      applyMessage.templateId = data.id
      applyMessage.template = data.template
      applyMessage.itemNo = data.itemNo
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped>
.downloadbox {
  border: 1px solid rgba(121, 121, 121, 0.1);
  width: 1200px;
  height: 1400px;
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

.recordinp {
  height: 100px;
  margin: 0 20px 50px 40px;
}

.recordinp>>>.el-textarea__inner{
  /* height: 150px; */
  resize: none;
}

.recordinp > .tijiao{
  text-align: center;
}
.recordinp > .tablebiao{
  margin: 30px 0 30px 0;
}

.button-style{
  background-color: #169bd5;
  color: white;
  padding: 10px;
}

.fye{
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(121, 121, 121, 0.1);
  border-top: 0;
  padding: 15px;
}
.upload{
  margin-top: 80px;
  margin-bottom: 30px;
  /* background-color: #169bd5; */
  color: white;
  padding: 10px;
}

.tijiao{
  margin-top: 40px;
}
</style>
