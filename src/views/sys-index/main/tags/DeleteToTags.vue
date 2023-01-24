<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 文档管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>删除Bucket标签</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <p style="font-family: 幼圆;font-size: 20px;margin: 20px;font-weight: bold">删除七牛云存储空间标签时，请谨慎操作！</p>
    <p style="font-family: 幼圆;font-size: 20px;margin: 20px">该操作在七牛云控制平台删除你所指定的空间标签！</p>
    <!--创建空间名的表单-->
    <span style="font-size: 20px;font-family: 方正姚体">请输入空间名称:</span>
    <el-input style="width: 300px" type="text" v-model="bucketName" placeholder="请输入空间名：" maxlength="10"
              show-word-limit></el-input>
    <el-button style="margin-left: 10px" type="danger" @click="submitForm()">删除
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
      let url = this.GLOBAL.systemUrl + 'bucket/' + this.bucketName + '/deleteToTags';
      if (this.bucketName == '') {
        this.$message.warning("存储空间名不能为空！")
      } else {
        this.axios
            .create({
              'headers': {
                'Authorization': localStorage.getItem('jwt')
              }
            }).delete(url).then((response) => {
          let responseBody = response.data;
          if (responseBody.state == 20000){
            if (responseBody.data == '200') {
              this.$message.success("删除成功！")
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