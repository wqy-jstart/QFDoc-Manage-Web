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
      <el-breadcrumb-item>解冻归档文件</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <p style="font-family: 幼圆;font-size: 20px;margin: 20px;font-weight: bold">解冻七牛云空间的归档文件时，需注意！</p>
    <p style="font-family: 幼圆;font-size: 20px;margin: 20px">
      该操作会在七牛云控制平台中按照您的指令进行解冻归档后的文件,可设置解冻有效期1-7天。<br>
      您需要输入空间名、文件名以及选择有效期！<br>
      归档存储文件完成解冻通常需要1-5分钟，深度归档存储文件完成解冻需要5-12小时。<br>
    </p>
    <!--创建空间名的表单-->
    <el-form label-width="130px" class="demo-ruleForm">
      <el-form-item label="存储空间名:" prop="bucketName">
        <el-input v-model="bucketName"></el-input>
      </el-form-item>
      <el-form-item label="文件名:" prop="fileName">
        <el-input v-model="fileName"></el-input>
      </el-form-item>
      <el-form-item prop="time">
        <template>
          <el-radio v-model="time" label="1">1天</el-radio>
          <el-radio v-model="time" label="2">2天</el-radio>
          <el-radio v-model="time" label="3">3天</el-radio>
          <el-radio v-model="time" label="4">4天</el-radio>
          <el-radio v-model="time" label="5">5天</el-radio>
          <el-radio v-model="time" label="6">6天</el-radio>
          <el-radio v-model="time" label="7">7天</el-radio>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm()">解冻</el-button>
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
      fileName: '',
      time: '',
    }
  },
  methods: {
    submitForm() {
      if (this.bucketName == '') {
        this.$message.warning("请指定存储空间名称！")
      } else if (this.fileName == '') {
        this.$message.warning("请指定文件名称！")
      } else if (this.time == '') {
        this.$message.warning("请选择解冻有效期!")
      } else {
        let url = this.GLOBAL.systemUrl + 'file/' + this.bucketName + '/' + this.fileName + '/' + this.time + '/fileToThaw';
        this.axios
            .create({
              'headers': {
                'Authorization': localStorage.getItem('jwt')
              }
            }).post(url).then((response) => {
          let responseBody = response.data;
          if (responseBody.state == 20000) {
            if (responseBody.data == 200) {
              this.$message.success("解冻成功!请耐心等待...")
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
      this.fileName = '';
    }
  }
}
</script>