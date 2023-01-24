<style>
body {
  background-color: #dcf1e8;
}

.layout-header {
  background: #2c71b4 !important;
  text-align: left;
  line-height: 60px;
}

.layout-header h1 {
  color: #fff;
  text-align: left;
  line-height: 60px;
}

.layout-body {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
}

.layout-aside {
  background: #29343e !important;
  font-family: 微软雅黑;
  font-weight: bolder;
  color: aliceblue;
}

.layout-aside i {
  color: #fff !important;
}

.layout-main1 {
}

.el-menu-item.is-active {
  background: #262424 !important;
}

span {
  font-size: 15px;
}
</style>
<template>
  <div>
    <!-- 最外层容器 -->
    <el-container>
      <!-- 上半部分：顶栏 -->
      <el-header class="layout-header">
        <el-page-header style="color: white;line-height: 60px; font-weight: bold" @back="goBack" content="清风文档后台管理平台">
        </el-page-header>
      </el-header>
      <!-- 下半部分：容器 -->
      <el-container class="layout-body">
        <!-- 下半部分的左侧边栏 -->
        <el-aside class="layout-aside">
          <el-menu
              router
              :default-active="$router.currentRoute.path"
              class="el-menu-vertical-demo"
              background-color="rgba(255, 255, 255, 0)"
              text-color="#fff"
              active-text-color="#ba6049">
            <!-- 首页 -->
            <el-menu-item index="/auth">
              <i class="el-icon-loading"></i>
              <span style="color: aliceblue;font-size: 18px;font-weight: bold">首页</span>
            </el-menu-item>

            <el-menu-item index="/sys-admin/user/userAddNew">
              <i class="el-icon-circle-plus"></i>
              <span>添加用户</span>
            </el-menu-item>
            <el-menu-item index="/sys-admin/user/userList">
              <i class="el-icon-user-solid"></i>
              <span>用户列表</span>
            </el-menu-item>
            <el-menu-item index="/sys-admin/user/userList1">
              <i class="el-icon-user-solid"></i>
              <span>角色管理</span>
            </el-menu-item>
            <el-menu-item index="/sys-admin/main/banner/add-new">
              <i class="el-icon-s-platform"></i>
              <span slot="title">权限管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 下半部分的右侧主体部分 -->
        <el-main class="layout-main1">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeMenuItemPath: '',
    }
  },
  methods: {
    goBack(){
      location.href = '/';
    },
  },
  mounted() {
    let path = this.$router.currentRoute.path;
    if (path.endsWith('/sys-admin/product/spu-add-new')) {
      this.activeMenuItemPath = '/sys-admin/product/spu-add-new';
    } else {
      this.activeMenuItemPath = path;
    }
  }
}
</script>
