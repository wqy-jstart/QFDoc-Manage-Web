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

    <p style="font-family: 幼圆;font-size: 20px;margin: 20px;font-weight: bold">复制七牛云指定存储空间中的文件时，需注意！</p>
    <p style="font-family: 幼圆;font-size: 20px;margin: 20px">
      该操作会在七牛云控制平台中按照您的指令进行拷贝文件<br>
      您需要输入空间名、源文件名、目标文件名以及单选框内选择需要复制的类型！<br>
      不覆盖(默认)：当目标文件存在时复制会失败！<br>
      覆盖：目标文件无论是否存在都会被此次复制直接覆盖！
    </p>
    <!--创建空间名的表单-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="存储空间名" prop="bucketName">
        <el-input v-model="ruleForm.bucketName"></el-input>
      </el-form-item>
      <el-form-item label="源文件名" prop="nowFileKey">
        <el-input v-model="ruleForm.nowFileKey"></el-input>
      </el-form-item>
      <el-form-item label="目标文件名" prop="lastFileKey">
        <el-input v-model="ruleForm.lastFileKey"></el-input>
      </el-form-item>
      <el-form-item prop="isCover">
        <template>
          <el-radio v-model="ruleForm.isCover" label="false">不覆盖</el-radio>
          <el-radio v-model="ruleForm.isCover" label="true">覆盖</el-radio>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">复制</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        bucketName: '',
        nowFileKey: '',
        lastFileKey: '',
        isCover: '',
      },
      rules: {
        bucketName: [
          {required: true, message: '请输入存储空间名称', trigger: 'blur'},
        ],
        nowFileKey: [
          {required: true, message: '请输入源文件', trigger: 'blur'},
        ],
        lastFileKey: [
          {required: true, message: '请输入目标文件', trigger: 'blur'},
        ],
        isCover: [
          {required: true, message: '请选择是否覆盖文件', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      // 对表单进行检查
      this.$refs[formName].validate((valid) => {
        if (valid) { // 满足条件则通过验证
          let url = this.GLOBAL.systemUrl + "file/copyToFile";
          let formJSON = this.qs.stringify(this.ruleForm);
          console.log("传递的对象："+formJSON);
          this.axios
              .create({
                'headers': {
                  'Authorization': localStorage.getItem('jwt')
                }
              }).post(url, formJSON).then((response) => {
            let responseBody = response.data;
            if (responseBody.state == 20000) {
              if (responseBody.data == 200) {
                this.$message.success("复制成功！")
                this.resetForm('ruleForm');
              }
            } else {
              this.$message.error(responseBody.message);
            }
          })
        }
      })
    },
    resetForm(formName) { // 该方法用来重置表单中的信息
      this.$refs[formName].resetFields();
    }
  }
}
</script>