<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 文档管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>存储空间</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

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
          if (responseBody.data == '614') {
            this.$message.error("该空间名已存在！")
          } else if (responseBody.data == '400') {
            this.$message.error("不符合命名规范！")
          } else if (responseBody.data == '401') {
            this.$message.error("认证信息有误！")
          } else if (responseBody.data == '630') {
            this.$message.error("超过最大创建数！")
          } else {
            this.$message.success("创建成功！")
            this.bucketName = '';
          }
        })
      }
    }
  }
}
</script>