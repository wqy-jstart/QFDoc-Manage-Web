<style>
body {
  background-image: url("../../public/background.png");
  background-size: cover; /*设置封面*/
}

.layout-header {
  background: rgba(255, 255, 255, 0.5) !important;
  color: #fff;
  text-align: left;
  line-height: 60px;
}

.layout-main {
  text-align: center !important;
}

a {
  text-decoration: none;
  font-size: 25px;
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
  background: rgba(255, 255, 255, 0.3) !important;
  font-family: 微软雅黑;
  font-weight: bolder;
  color: aliceblue;
}

.layout-aside i {
  color: #fff !important;
}

.layout-main {
}

.el-menu-item.is-active {
  background: #262424 !important;
}
</style>
<template>
  <div>
    <!-- 最外层容器 -->
    <el-container>
      <!-- 上半部分：顶栏 -->
      <el-header class="layout-header">
        <div class="block">
          <h1 style="color: black;font-size: 40px;font-family: 方正姚体">清风云文档管理</h1>
        </div>
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
              text-color="#262424"
              active-text-color="#ba6049">
            <!-- 首页 -->
            <el-menu-item index="/">
              <i class="el-icon-s-home"></i>
              <span>首页</span>
            </el-menu-item>
            <!-- 临时页面 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>存储空间</span>
              </template>
              <el-menu-item index="/sys-index/bucket/createBucket">
                <i class="el-icon-loading"></i>
                <span style="font-size: 15px;font-weight: bold">创建存储空间</span>
              </el-menu-item>

              <el-menu-item index="/sys-index/bucket/dropBucket">
                <i class="el-icon-circle-plus"></i>
                <span style="font-size: 15px;font-weight: bold">删除存储空间</span>
              </el-menu-item>
              <el-menu-item index="/sys-index/bucket/bucketList">
                <i class="el-icon-user-solid"></i>
                <span style="font-size: 15px;font-weight: bold">Bucket文件列表</span>
              </el-menu-item>
              <el-menu-item index="/sys-index/bucket/setBucketPrivate">
                <i class="el-icon-s-platform"></i>
                <span style="font-size: 15px;font-weight: bold">设置Bucket访问权限</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>空间标签</span>
              </template>
              <el-menu-item index="/sys-admin/main/banner/add-new">
                <i class="el-icon-s-platform"></i>
                <span style="font-size: 15px;font-weight: bold">设置空间标签</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/main/banner/add-new">
                <i class="el-icon-s-platform"></i>
                <span style="font-size: 15px;font-weight: bold">查询空间标签</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/main/banner/add-new">
                <i class="el-icon-s-platform"></i>
                <span style="font-size: 15px;font-weight: bold">删除空间标签</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>资源管理</span>
              </template>
              <el-menu-item index="/sys-index/file/fileUpload">
                <i class="el-icon-s-platform"></i>
                <span style="font-size: 15px;font-weight: bold">文件上传</span>
              </el-menu-item>
              <el-menu-item index="/sys-index/file/fileToDelete">
                <i class="el-icon-s-platform"></i>
                <span style="font-size: 15px;font-weight: bold">删除文件</span>
              </el-menu-item>
              <el-menu-item index="/sys-index/file/setFileStatus">
                <i class="el-icon-s-platform"></i>
                <span style="font-size: 15px;font-weight: bold">存储状态</span>
              </el-menu-item>
              <el-menu-item index="/sys-index/file/copyToFile">
                <i class="el-icon-s-platform"></i>
                <span style="font-size: 15px;font-weight: bold">文件复制</span>
              </el-menu-item>
              <el-menu-item index="/sys-index/file/setBucketType">
                <i class="el-icon-s-platform"></i>
                <span style="font-size: 15px;font-weight: bold">修改存储类型</span>
              </el-menu-item>
              <el-menu-item index="/sys-index/file/fileToThaw">
                <i class="el-icon-s-platform"></i>
                <span style="font-size: 15px;font-weight: bold">解冻归档文件</span>
              </el-menu-item>
              <el-menu-item index="/sys-admin/main/banner/add-new">
                <i class="el-icon-s-platform"></i>
                <span style="font-size: 15px;font-weight: bold">修改过期时间</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 下半部分的右侧主体部分 -->
        <el-main class="layout-main">
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
  methods: {},
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
