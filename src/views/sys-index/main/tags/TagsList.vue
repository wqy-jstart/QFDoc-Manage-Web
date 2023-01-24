<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 文档管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>Bucket文件列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <p style="font-family: 幼圆;font-size: 20px;margin: 20px;font-weight: bold">查询七牛云Bucket标签数据时，需注意！</p>
    <p style="font-family: 幼圆;font-size: 20px;margin: 20px">
      该操作会根据您输入的存储空间名称对其进行设置标签<br>
      标签可标识空间,便于检索、查找、区分！
    </p>

    <!--创建空间名的表单-->
    <span style="font-size: 20px;font-family: 方正姚体">请输入空间名称:</span>
    <el-input style="width: 300px" type="text" v-model="bucketName" placeholder="请输入空间名：" maxlength="10"
              show-word-limit></el-input>
    <el-button style="margin-left: 10px" type="primary" @click="submitForm()">查询
    </el-button>
    <!--创建空间名的表单-->
    <el-table :data="tagData"
              border
              style="width: 50%;margin: 0 auto;margin-top: 20px">
      <!-- prop必须是服务器绑定的属性名 -->
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="key" label="标签名" align="center"></el-table-column>
      <el-table-column prop="value" label="标签值" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bucketName: '',
      tagData: []
    }
  },
  methods: {
    submitForm() {
      this.tagData = [];
      let url = this.GLOBAL.systemUrl + 'bucket/' + this.bucketName + '/selectToTags';
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwt')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        console.log(responseBody)
        if (responseBody.state == 20000){
          this.tagData = responseBody.data;
        }else {
          this.$message.error(responseBody.message);
        }
      })
    }
  }
}
</script>