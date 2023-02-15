<template>
  <div class="common-layout">
    <el-container>
      <!-- 左边菜单栏 -->
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <h4 class="mb-2">视频管理系统</h4>
            <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
              default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose" router>
              <el-sub-menu index="1">

                <template #title>
                  <el-icon>
                    <UserFilled />
                  </el-icon>
                  <span>用户管理</span>
                </template>

                <el-menu-item-group>
                  <el-menu-item index="student">
                    <template #title>
                      <el-icon>
                        <UserFilled />
                      </el-icon>
                      <span>普通用户</span>
                    </template>
                  </el-menu-item>

                  <el-menu-item index="role">
                    <template #title>
                      <el-icon>
                        <Avatar />
                      </el-icon>
                      <span>管理员</span>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>

              </el-sub-menu>
            </el-menu>
            <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
              default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose" router>
              <el-sub-menu index="1">

                <template #title>
                  <el-icon>
                    <TrendCharts />
                  </el-icon>
                  <span>视频管理</span>
                </template>

                <el-menu-item-group>

                  <el-menu-item index="video">
                    <template #title>
                      <el-icon>
                        <DataBoard />
                      </el-icon>
                      <span>视频审核</span>
                    </template>
                  </el-menu-item>

                  <el-menu-item index="passvideo">
                    <template #title>
                      <el-icon>
                        <DataAnalysis />
                      </el-icon>
                      <span>过审视频</span>
                    </template>
                  </el-menu-item>

                  <el-menu-item index="reportvideo">
                    <template #title>
                      <el-icon>
                        <Opportunity />
                      </el-icon>
                      <span>举报管理</span>
                    </template>
                  </el-menu-item>

                </el-menu-item-group>

              </el-sub-menu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>

        <el-header>
          <h3>欢迎回来 {{ user.username }} </h3>
          <!-- <p>{{ user.time }}</p> -->
          <el-button type="info" @click="quit">退出登录</el-button>
        </el-header>

        <el-main><router-view /></el-main>
        <!-- <el-footer></el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>

import { HomeFilled } from '@element-plus/icons-vue';

export default {
  data() {
    return {
      time: '',
      menuList: [
        {
          fatherNodeID: '1', displayName: '用户管理', childList: [
            { childNodeID: '1', displayName: '用户管理', path: "users" },
            { childNodeID: '2', displayName: '学生管理', path: "students" }
          ]
        }
      ],
      iconsLsit: {
        1: '<HomeFilled />',
        2: '<Avatar />'
      },
      isCollapse: false, // 控制菜单是否折叠
      activePath: '', // 控制菜单是否被激活
      user: {
        username: '',
        state: '',
        time: ''
      },
    }
  },
  created() {
    this.getUser()
    // this.getTime()
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    quit() {
      localStorage.clear()
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    getUser() {
      let token = localStorage.getItem("stu_token");
      console.log(token);
      this.user.username = JSON.parse(token).username
      this.user.state = JSON.parse(token).state
      console.log(this.user);
    },
    // 获取当前时间
    getTime() {
      setInterval(() => {
        //new Date() new一个data对象，当前日期和时间
        //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
        this.user.time = new Date().toLocaleString();
      }, 1000)
    },
  }
}
</script>

<style lang="less" scoped>
.common-layout,
.el-container {
  min-height: 400px;
  height: 100%;
}

.el-header {
  // background: #373d41;
  display: flex; // 流式布局

  >button {
    display: flex;
    margin-left: 80%;
    margin-top: 15px;
  }
}

.el-aside {
  color: #fff;
  background: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background: #eaedf1;
  // background-image: url(../../public/admin/images/bg.jpg);
}

.iconfont {
  margin-right: 10px;
}
</style>