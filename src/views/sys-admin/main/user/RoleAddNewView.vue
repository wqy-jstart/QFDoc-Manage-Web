<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/auth' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加角色</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="角色排序" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
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
        name: '测试管理员',
        description: '用于调试管理员添加描述',
        sort: '99',
      },
      rules: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入描述', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ],
        sort: [
          {required: true, message: '请输入排序', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    // 添加用户事件
    submitForm(formName) {
      // 对表单进行检查
      this.$refs[formName].validate((valid) => {
        if (valid) { // 满足条件则通过验证
          let url = this.GLOBAL.systemUrl+'roles/insert'
          console.log('url = ' + url);
          //将formData对象转换成FormData格式,当后端不添加@RequestBody注解时接收    {indices、brackets、repeat}数组格式
          let formData = this.qs.stringify(this.ruleForm,{arrayFormat:'repeat'});
          console.log('formData=' + formData);
          this.axios
              .create({
                'headers':{
                  'Authorization':localStorage.getItem('jwt')
                }
              })
              .post(url, formData).then((response) => {//箭头函数
            let responseBody = response.data;
            if (responseBody.state == 20000) {
              this.$message({
                message: '添加角色成功！',
                type: 'success'
              });
              this.resetForm(formName);// 调用该函数重置表单中的信息
            } else {
              this.$message.error(responseBody.message);
            }
          });
        } else { // 否则表单格式有误,不会通过
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) { // 该方法用来重置表单中的信息
      this.$refs[formName].resetFields();
    }
  },
}
</script>
