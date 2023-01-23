<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 文档管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>设置文件存储类型</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <p style="font-family: 幼圆;font-size: 20px;margin: 20px;font-weight: bold">设置文件存储类型时，请谨慎操作！</p>
    <p style="font-family: 幼圆;font-size: 20px;margin: 20px">
      该操作会在七牛云控制平台修改指定存储空间下文件的存储类型<br>
      存储类型有四种：<br>
      (1):标准存储<br>
      (2):低频存储<br>
      (3):归档存储<br>
      (4):深度归档存储<br>
      <b>提示:</b><br>
      (1):设置归档存储或深度归档存储后,若转换其他存储类型时需要对当前文件进行归档解冻<br>
      (2):低频访问存储、归档存储、深度归档存储有最短存储时间要求，修改为其他存储类型时可能会产生提前删除的计量计费。
    </p>
    <!--创建空间名的表单-->
    <el-form label-width="130px" class="demo-ruleForm">
      <el-form-item label="存储空间名:" prop="bucketName">
        <el-input v-model="bucketName"></el-input>
      </el-form-item>
      <el-form-item label="文件名:" prop="key">
        <el-input v-model="fileName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="mini" @click="submitForm0()">标准存储</el-button>
        <el-button type="primary" size="mini" @click="submitForm1()">低频存储</el-button>
        <el-button type="warning" size="mini" @click="submitForm2()">归档存储</el-button>
        <el-button type="danger" size="mini" @click="submitForm3()">深度归档存储</el-button>
        <el-button size="mini" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bucketName: '',
      fileName:''
    }
  },
  methods: {
    submitForm0(){
      if (this.bucketName == '') {
        this.$message.warning("请指定存储空间名称！")
      } else if (this.fileName == '') {
        this.$message.warning("请指定文件名称！")
      } else {
        let url = this.GLOBAL.systemUrl + 'file/'+this.bucketName+'/'+this.fileName+'/setBucketType0';
        this.axios
            .create({
              'headers': {
                'Authorization': localStorage.getItem('jwt')
              }
            }).post(url).then((response)=>{
          let responseBody = response.data;
          if (responseBody.state == 20000){
            if (responseBody.data == 200){
              this.$message.success("修改成功!")
              this.resetForm();
            }
          }else {
            this.$message.error(responseBody.message);
          }
        })
      }
    },
    submitForm1(){
      if (this.bucketName == '') {
        this.$message.warning("请指定存储空间名称！")
      } else if (this.fileName == '') {
        this.$message.warning("请指定文件名称！")
      } else {
        let url = this.GLOBAL.systemUrl + 'file/'+this.bucketName+'/'+this.fileName+'/setBucketType1';
        this.axios
            .create({
              'headers': {
                'Authorization': localStorage.getItem('jwt')
              }
            }).post(url).then((response)=>{
          let responseBody = response.data;
          if (responseBody.state == 20000){
            if (responseBody.data == 200){
              this.$message.success("修改成功!")
            }
          }else {
            this.$message.error(responseBody.message);
          }
        })
      }
    },
    submitForm2(){
      if (this.bucketName == '') {
        this.$message.warning("请指定存储空间名称！")
      } else if (this.fileName == '') {
        this.$message.warning("请指定文件名称！")
      } else {
        let url = this.GLOBAL.systemUrl + 'file/'+this.bucketName+'/'+this.fileName+'/setBucketType2';
        this.axios
            .create({
              'headers': {
                'Authorization': localStorage.getItem('jwt')
              }
            }).post(url).then((response)=>{
          let responseBody = response.data;
          if (responseBody.state == 20000){
            if (responseBody.data == 200){
              this.$message.success("修改成功!")
            }
          }else {
            this.$message.error(responseBody.message);
          }
        })
      }
    },
    submitForm3(){
      if (this.bucketName == '') {
        this.$message.warning("请指定存储空间名称！")
      } else if (this.fileName == '') {
        this.$message.warning("请指定文件名称！")
      } else {
        let url = this.GLOBAL.systemUrl + 'file/'+this.bucketName+'/'+this.fileName+'/setBucketType3';
        this.axios
            .create({
              'headers': {
                'Authorization': localStorage.getItem('jwt')
              }
            }).post(url).then((response)=>{
          let responseBody = response.data;
          if (responseBody.state == 20000){
            if (responseBody.data == 200){
              this.$message.success("修改成功!")
            }
          }else {
            this.$message.error(responseBody.message);
          }
        })
      }
    },
    resetForm() { // 该方法用来重置表单中的信息
     this.bucketName='';
     this.fileName='';
    }
  }
}
</script>