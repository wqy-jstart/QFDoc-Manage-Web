<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 文档管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>Bucket文件列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <p style="font-family: 幼圆;font-size: 20px;margin: 20px;font-weight: bold">查询七牛云Bucket文件列表时，需注意！</p>
    <p style="font-family: 幼圆;font-size: 20px;margin: 20px">
      该操作会根据您输入的存储空间名称进行查询该名称下的文件列表<br>
      下面列表会列举文件的信息，其中type类型("0"代表公开/"1"代表私有)！
    </p>

    <!--创建空间名的表单-->
    <span style="font-size: 20px;font-family: 方正姚体">请输入空间名称:</span>
    <el-input style="width: 300px" type="text" v-model="bucketName" placeholder="请输入空间名：" maxlength="10"
              show-word-limit></el-input>
    <el-button style="margin-left: 10px" type="primary" @click="submitForm()">查询
    </el-button>
    <!--创建空间名的表单-->
    <el-table :data="bucketData"
              border
              :row-class-name="tableRowClassName"
              style="width: 100%;margin-top: 20px">
      <!-- prop必须是服务器绑定的属性名 -->
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="key" label="文件名" align="center"></el-table-column>
      <el-table-column prop="hash" label="文件哈希值" width="260" align="center"></el-table-column>
      <el-table-column prop="size" label="文件大小" width="80" align="center"></el-table-column>
      <el-table-column prop="putTime" label="上传时间" width="200" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.putTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mimeType" label="MIME类型" width="180" align="center"></el-table-column>
      <el-table-column prop="type" label="访问权限" width="80" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bucketName: '',
      bucketData: []
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3){
        return 'success-row';
      }
    },
    submitForm() {
      let url = this.GLOBAL.systemUrl + 'bucket/' + this.bucketName + '/bucketList';
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwt')
            }
          }).get(url).then((response) => {
        let responseBody = response.data;
        console.log(responseBody)
        if (responseBody.state == 20000){
          this.bucketData = responseBody.data;
        }else {
          this.$message.error(responseBody.message);
        }
      })
    }
  }
}
</script>