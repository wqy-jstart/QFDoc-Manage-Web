<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
      <el-breadcrumb-item :to="{ path: '/auth' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>分配权限</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%">
      <!-- prop必须是服务器绑定的属性名 -->
      <el-table-column prop="id" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
      <el-table-column prop="description" label="角色描述" align="center"></el-table-column>
      <el-table-column prop="sort" label="排序" align="center"></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="gmtModified" label="修改时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small"
                     @click="handleEdit(scope.row)">修改
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"
                     :disabled="true">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出的编辑相册的对话框 -->
    <el-dialog width="40%" title="修改角色信息:" :visible.sync="dialogFormVisibleToPermission">
      <el-form :model="ruleForm">
        <el-form-item label="角色名称:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.sort" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleToPermission = false">取 消</el-button>
        <el-button type="primary" @click="submitEditToPermission()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  data() {
    return {
      tableData: [],
      ruleForm: {
      },
      dialogFormVisibleToPermission:false,
      formLabelWidth: '120px',
    }
  },
  methods: {
    // 保存修改
    submitEditToPermission() {
      let url = this.GLOBAL.systemUrl + "roles/update";
      let formString = this.qs.stringify(this.ruleForm)
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwt')
            }
          }).post(url, formString).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.$message.success("修改成功！")
          this.dialogFormVisibleToPermission = false;
          this.loadAdminList();
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    // 编辑修改按钮
    handleEdit(role) {
      let url = this.GLOBAL.systemUrl + 'roles/' + role.id + '/selectById';
      console.log(url);
      this.axios
          .create(
              {
                'headers': {'Authorization': localStorage.getItem('jwt')}
              }
          )
          .post(url).then((response) => {
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.ruleForm = responseBody.data;
          this.dialogFormVisibleToPermission = true;
        } else {
          this.$message.error(responseBody.message);
          this.loadAdminList();
        }
      })
    },
    // 该方法用来请求相册的列表数据
    loadAdminList() {
      let url = this.GLOBAL.systemUrl + "roles" // 请求路径
      console.log('url=' + url);
      // .create方法会返回一个axios对象,可在其中配置请求头
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwt')
            }
          })
          .get(url).then((response) => {// 发送异步请求
        let responseBody = response.data;
        this.tableData = responseBody.data;//将获取响应的数据中的data数据赋值给tableData
      })
    }
  },
  // 生命周期方法(挂载)
  mounted() {
    console.log('mounted');
    this.loadAdminList();
  }
}
</script>