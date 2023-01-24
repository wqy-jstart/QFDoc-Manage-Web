<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 文档管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>设置Bucket访问权限</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <p style="font-family: 幼圆;font-size: 20px;margin: 20px;font-weight: bold">设置存储空间访问权限时，请谨慎操作！</p>
    <p style="font-family: 幼圆;font-size: 20px;margin: 20px">
      该操作会在七牛云控制平台修改指定存储空间的访问权限<br>
      访问权限有两种：<br>
      (1):公开权限<br>
      (2):私有权限<br>
      以下提供两种操作分别修改两种访问权限！
    </p>
    <!--创建空间名的表单-->
    <span style="font-size: 20px;font-family: 方正姚体">请输入空间名称:</span>
    <el-input style="width: 300px" type="text" v-model="bucketName" placeholder="请输入空间名：" maxlength="10"
              show-word-limit></el-input>
    <el-button style="margin-left: 10px" type="primary" @click="setPublic()">设置公开
    </el-button>
    <el-button style="margin-left: 10px" type="warning" @click="setPrivate()">设置私有
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
    setPublic() {
      if (this.bucketName == '') {
        this.$message.warning("请指定存储空间名称！")
      } else {
        let url = this.GLOBAL.systemUrl + 'bucket/' + this.bucketName + '/setBucketPublic';
        this.axios
            .create({
              'headers': {
                'Authorization': localStorage.getItem('jwt')
              }
            }).post(url).then((response) => {
          let responseBody = response.data;
          if (responseBody.state == 20000) {
            if (responseBody.data == 200) {
              this.$message.success("设置成功！")
            } else if (responseBody.data == 631) {
              this.$message.error("该存储空间不存在！")
            } else if (responseBody.data == 401) {
              this.$message.error("操作无效！")
            }
          }
        })
      }
    },
    setPrivate() {
      if (this.bucketName == '') {
        this.$message.warning("请指定存储空间名称！")
      } else {
        let url = this.GLOBAL.systemUrl + 'bucket/' + this.bucketName + '/setBucketPrivate';
        this.axios
            .create({
              'headers': {
                'Authorization': localStorage.getItem('jwt')
              }
            }).post(url).then((response) => {
          let responseBody = response.data;
          if (responseBody.state == 20000) {
            if (responseBody.data == 200) {
              this.$message.success("设置成功！")
            } else if (responseBody.data == 631) {
              this.$message.error("该存储空间不存在！")
            } else if (responseBody.data == 401) {
              this.$message.error("操作无效！")
            }
          }
        })
      }
    }
  }
}
</script>