<style>
body {
  background-image: url("../../public/background.png");
  background-size: cover; /*设置封面*/
}

.layout-header {
  background: rgba(255, 255, 255, 0.5);
  color: #fff;
  text-align: left;
  line-height: 60px;
}

a {
  text-decoration: none;
  font-size: 25px;
}

.layout-main {
  text-align: center;
}
</style>
<template>
  <div>
    <el-page-header style="background: rgba(255, 255, 255, 0.5); color: white;
    line-height: 60px; font-weight: bold" @back="goBack" content="返回文档登录页面">
    </el-page-header>
    <el-container>
      <el-main class="layout-main">
        <el-card style="width: 600px;height: 400px;margin: 300px auto;padding: 40px;
                background-color: rgba(255,255,255,0.3)">
          <!--label-width设置用户名这一列所占的宽度,如果不设置会显示在上面-->
          <h1 style="font-size: 35px;color: #2c3e50">Sign Up</h1>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                   style="width: 450px;margin-left: 20px;margin-top: 50px">
            <el-form-item label="昵称" prop="nickname">
              <el-input type="nickname" v-model="ruleForm.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input type="username" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="position: relative;right: 30px"
                         type="primary" @click="submitForm('ruleForm')">注册
              </el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>

export default {
  data() {
    return {
      ruleForm: {// 初始化ruleForm对象
        nickname: '',
        username: '',
        password: '',
      },
      rules: { // 制定规则
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ],
      },
    };
  },
  methods: {
    // 处理登录事件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = this.GLOBAL.systemUrl + 'users/insert';
          let formData = this.qs.stringify(this.ruleForm)
          this.axios.post(url, formData).then((response) => {
            let responseBody = response.data;
            if (responseBody.state == 20000) {
              location.href = "/login";
            } else {
              this.$message.error(responseBody.message);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack() {
      location.href = '/login';
    }
  },
}
</script>
