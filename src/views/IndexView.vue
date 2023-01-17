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
.layout-main{
  text-align: center;
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
        <el-form>
          <p style="font-size: 30px;font-family: 方正姚体">请选择要上传的图片:</p>
          <el-form-item prop="url" style="margin: 10px">
            <el-upload
                action="http://localhost:9801/upload/image"
                name="file"
                list-type="picture-card"
                :on-success="handleSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '', // 绑定图片路径
      dialogVisible: false,
      url:'',
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let url = this.GLOBAL.systemUrl+'upload/remove?url=' + file.response.data;
      console.log("发送删除图片的请求")
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwt')
            }
          }).get(url).then((response)=>{
        console.log("删除服务器图片完成!")
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {//调用后可直接接收响应过来的数据
      this.url = response;//将响应的"唯一文件名图片路径"添加到weibo对象中
      console.log(response)
    },
  }
}
</script>
