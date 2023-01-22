<style>
.demo-ruleForm {
  width: 500px;
  margin: 0 auto;
}
</style>
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 文档管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>删除指定文件</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <p style="font-family: 幼圆;font-size: 20px;margin: 20px;font-weight: bold">删除七牛云指定存储空间中的文件时，请谨慎操作！</p>
    <p style="font-family: 幼圆;font-size: 20px;margin: 20px">该操作会在七牛云控制平台删除你指定的存储空间下的文件，删除后文件数据将会丢失！</p>
    <!--创建空间名的表单-->
    <el-form label-width="130px" class="demo-ruleForm">
      <el-form-item label="存储空间名" prop="bucketName">
        <el-input v-model="bucketName"></el-input>
      </el-form-item>
      <el-form-item label="文件名" prop="key">
        <el-input v-model="key"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">删除</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bucketName: '',
      key: '',
    }
  },
  methods: {
    submitForm() {
      if (this.bucketName == '') {
        this.$message.warning("请指定存储空间名称！")
      } else if (this.key == '') {
        this.$message.warning("请指定文件名称！")
      } else {
        let url = this.GLOBAL.systemUrl + 'file/' + this.bucketName + '/' + this.key + '/deleteToFile';
        console.log('url = ' + url);
        this.axios
            .create({
              'headers': {
                'Authorization': localStorage.getItem('jwt')
              }
            })
            .post(url).then((response) => {//箭头函数
          let responseBody = response.data;
          if (responseBody.state == 20000) {
            if (responseBody.data == 200) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.resetForm();// 调用该函数重置表单中的信息
            } else if (responseBody.data == 612) {
              this.$message.error("指定资源不存在或已被删除！")
            }
          } else {
            this.$message.error(responseBody.message);
          }
        });
      }
    },
    resetForm() { // 该方法用来重置表单中的信息
      this.bucketName = "";
      this.key = "";
    }
  }
}
</script>