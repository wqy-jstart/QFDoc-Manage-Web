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
          <el-button type="warning" icon="el-icon-s-help" size="small"
                     @click="setPassport(scope.row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出的编辑相册的对话框 -->
    <el-dialog width="40%" title="修改角色信息:" :visible.sync="dialogFormVisibleToPermission">
      <el-form :model="ruleForm">
        <el-form-item label="用户名:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" :label-width="formLabelWidth">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像url:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.avatar" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.gender" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleToPermission = false">取 消</el-button>
        <el-button type="primary" @click="submitEditToPermission()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 弹出的编辑相册的对话框 -->
    <el-dialog width="40%" title="分配权限" :visible.sync="dialogFormVisibleToAssign">
      <el-form :model="ruleForm">
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限列表" :label-width="formLabelWidth">
          <template>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <div style="margin: 15px 0;"></div>
            <!--label标签对应选择的多选框Id-->
            <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="role in roles" :label="role.id">{{ role.name }}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleToAssign = false">取 消</el-button>
        <el-button type="primary" @click="submitEditToAssign()">保存</el-button>
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
        username: '',
        role: ''
      },
      roleIds:[], // 传递选中的角色id
      oldRoleIds:[],
      dialogFormVisibleToPermission:false,
      dialogFormVisibleToAssign: false,
      formLabelWidth: '120px',
      checkAll: false,
      checkedRoles: [], // 勾选过的角色
      roles: [],// 显示全部角色
      isIndeterminate: true
    }
  },
  methods: {
    // 保存修改
    submitEditToPermission() {
      let url = this.GLOBAL.systemUrl + "users/update";
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
    // 保存权限
    submitEditToAssign() {
      // 将选择的角色传递给后端插入到用户角色关联表中
      let object = {username:this.ruleForm.username,roleIds:this.checkedRoles,oldRoleIds:this.oldRoleIds};
      console.log("角色："+this.checkedRoles)
      let url = this.GLOBAL.systemUrl + "userRoles/assignToRole";
      let formString = this.qs.stringify(object);
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwt')
            }
          }).post(url,formString).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000){
          this.$message.success("分配成功！")
          this.oldRoleIds = [];
          this.dialogFormVisibleToAssign = false;
        }else {
          this.$message.error(responseBody.message);
        }
      })
    },
    // 点击弹框分配权限
    setPassport(admin) {
      this.dialogFormVisibleToAssign = true;
      this.ruleForm.username = admin.name;
      // 查询所有角色，赋值给cities
      let url = this.GLOBAL.systemUrl + "roles" // 请求路径
      console.log('url=' + url);
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwt')
            }
          })
          .get(url).then((response) => {// 发送异步请求
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.roles = responseBody.data;//将获取响应的数据中的data数据赋值给tableData
        } else {
          this.$message.error(responseBody.message);
        }
      })
      // 查询当前角色
      let url1 = this.GLOBAL.systemUrl + 'roles/' + admin.id + '/selectToUserId';
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwt')
            }
          })
          .post(url1).then((response) => {// 发送异步请求
        let responseBody = response.data;
        if (responseBody.state == 20000) {
          this.checkedRoles = responseBody.data;//将获取响应的数据中的data数据赋值给tableData
          this.oldRoleIds = responseBody.data; //记录原来分配的角色
          console.log("原来："+this.oldRoleIds)
        } else {
          this.$message.error(responseBody.message);
        }
      })
    },
    // 全选的事件
    handleCheckAllChange(val) {
      console.log("点击全选")
      this.checkedRoles = val ? this.roles : [];
      this.isIndeterminate = false;
      let url = this.GLOBAL.systemUrl + "roles/selectRoleIds";
      this.axios
          .create({
            'headers': {
              'Authorization': localStorage.getItem('jwt')
            }
          }).get(url).then((response)=>{
        let responseBody = response.data;
        if (responseBody.state == 20000){
          this.checkedRoles = responseBody.data;
        }
      })
    },
    // 勾选的事件
    handleCheckedCitiesChange(value) {
      console.log("点击勾选")
      console.log(value)
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.roles.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length;
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