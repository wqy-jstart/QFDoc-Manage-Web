<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 文档管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>文件上传</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <p style="font-family: 幼圆;font-size: 20px;margin: 20px;font-weight: bold">上传文件到七牛云指定存储空间时，需注意！</p>
    <p style="font-family: 幼圆;font-size: 20px;margin: 20px">
      该操作会在七牛云控制平台中按照您的指令进行添加文件<br>
      您需要选择本地指定路径的图片，最终选择上传服务器即可完成上传过程，并会在本地指定路径生成一份拷贝文件！
    </p>
    <!--上传图片的表单-->
    <p style="font-size: 20px;font-family: 方正姚体;margin: 20px">请选择要上传的图片:</p>
    <el-upload
        class="upload-demo"
        ref="upload"
        name="file"
        action="http://localhost:9801/file/image"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :auto-upload="false">
      <el-button slot="trigger" size="medium" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="medium" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: '',
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
      if (file.response == null) {
        this.$message.warning("文件暂未上传，删除失败！")
      }
      let url = this.GLOBAL.systemUrl + 'file/remove?url=' + file.response.data;
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
  }
}
</script>