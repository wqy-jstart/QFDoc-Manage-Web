<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 文档管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>创建存储空间</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <p style="font-family: 幼圆;font-size: 20px;margin: 20px;font-weight: bold">创建七牛云存储空间时，请谨慎操作！</p>
    <p style="font-family: 幼圆;font-size: 20px;margin: 20px">该操作会在七牛云控制平台开辟新的存储空间，该空间可以存储任意指定的文件！</p>
    <!--创建空间名的表单-->
    <span style="font-size: 20px;font-family: 方正姚体">请输入空间名称:</span>
    <el-input style="width: 300px" type="text" v-model="bucketName" placeholder="请输入空间名：" maxlength="10"
              show-word-limit></el-input>
    <el-button style="margin-left: 10px" type="primary" @click="submitForm()">创建
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bucketName: '',
    }
  },
  methods: {
    submitForm() {
      let url = this.GLOBAL.systemUrl + 'bucket/' + this.bucketName + '/create';
      if (this.bucketName == '') {
        this.$message.error("存储空间名不能为空！")
      } else {
        this.axios
            .create({
              'headers': {
                'Authorization': localStorage.getItem('jwt')
              }
            }).post(url).then((response) => {
          let responseBody = response.data;
          if (responseBody.state == 20000){
            if (responseBody.data == '200') {
              this.$message.success("创建成功！")
              this.bucketName = '';
            }
          }else {
            this.$message.error(responseBody.message);
          }
        })
      }
    }
  }
}
</script>