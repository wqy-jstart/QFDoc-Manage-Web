<style>
body {
  background-image: url("../../public/background.png");
  background-size: cover; /*设置封面*/
}

.layout-header {
  background: rgba(255, 255, 255, 0.5) !important;
  color: #fff;
  text-align: left;
  line-height: 60px;
}

.layout-main {
  text-align: center !important;
}

a {
  text-decoration: none;
  font-size: 25px;
}
</style>

<template>
  <div>
    <el-container>
      <el-header class="layout-header">
        <div class="block">
          <h1 style="color: black;font-size: 40px;font-family: 方正姚体">清风文档管理系统
          </h1>
        </div>
      </el-header>
      <el-main class="layout-main">
        <!--创建空间名的表单-->
        <span style="font-size: 20px;font-family: 方正姚体">请输入空间名称:</span>
        <el-input style="width: 300px" type="text" v-model="bucketName" placeholder="请输入空间名：" maxlength="10"
                  show-word-limit></el-input>
        <el-button style="margin-left: 10px" type="primary" @click="submitForm()">创建
        </el-button>

        <!--上传图片的表单-->
        <p style="font-size: 20px;font-family: 方正姚体">请选择要上传的图片:</p>
        <el-upload
            class="upload-demo"
            ref="upload"
            name="file"
            action="http://localhost:9801/upload/image"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: '',
      bucketName: '',
      dialogImageUrl: '', // 绑定图片路径
      dialogVisible: false,
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      if (file.response == null){
        this.$message.warning("文件暂未上传，删除失败！")
      }
      let url = this.GLOBAL.systemUrl + 'upload/remove?url=' + file.response.data;
      console.log("发送删除图片的请求")
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwt')
            }
          }).get(url).then((response) => {
        console.log("删除服务器图片完成!")
      })
    },
    handleSuccess(response, file, fileList) {//调用后可直接接收响应过来的数据
      console.log(response)
    },
    submitForm() {

    }
  }
}
</script>
