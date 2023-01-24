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
      <el-breadcrumb-item>设置文件过期时间</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <p style="font-family: 幼圆;font-size: 20px;margin: 20px;font-weight: bold">设置七牛云指定存储空间中的标签时，需注意！</p>
    <p style="font-family: 幼圆;font-size: 20px;margin: 20px">
      该操作会在七牛云控制平台中按照您的指令进行设置标签!<br>
      标签（tag）是 Key-Value的结构，同一个Bucket下，Key必须是唯一的, 且一个Key只能有1个Value，Key设置重复时服务端会返回400: tag contain duplicate key。<br>
      每个Bucket最多可以设置10对标签，超出限制时服务端会返回400: tag num exceed limit。<br>
      API是覆盖语义，调用时会替换整个Bucket的标签，比如：原来Bucket有10对标签, 想更新其中1对，request.body应该包含9对old tag + 1对 new tag。
    </p>
    <!--创建空间名的表单-->
    <el-form label-width="130px" class="demo-ruleForm">
      <el-form-item label="存储空间名:" prop="bucketName">
        <el-input v-model="bucketName"></el-input>
      </el-form-item>
      <el-form-item label="标签名:" prop="fileName">
        <el-input v-model="key"></el-input>
      </el-form-item>
      <el-form-item label="标签值:" prop="days">
        <el-input v-model="value"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">设置</el-button>
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
      value: '',
    }
  },
  methods: {
    submitForm() {
      if (this.bucketName == '') {
        this.$message.warning("请指定存储空间名称！")
      } else if (this.key == '') {
        this.$message.warning("请指定标签名称！")
      } else if (this.value == '') {
        this.$message.warning("请指定标签值！")
      } else {
        let url = this.GLOBAL.systemUrl + 'bucket/' + this.bucketName + '/' + this.key + '/' + this.value + '/setBucketTags';
        this.axios
            .create({
              'headers': {
                'Authorization': localStorage.getItem('jwt')
              }
            }).post(url).then((response) => {
          let responseBody = response.data;
          if (responseBody.state == 20000) {
            if (responseBody.data == 200) {
              this.$message.success("设置成功!")
              this.resetForm();
            }
          } else {
            this.$message.error(responseBody.message);
          }
        })
      }
    },
    resetForm() { // 该方法用来重置表单中的信息
      this.bucketName = '';
      this.key = '';
      this.value = '';
    }
  }
}
</script>