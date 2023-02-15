<template>
    <div>
        <div class="content">
            <!-- header -->
            <el-header class="headerBG">
                <!-- <el-container animated> -->
                <!-- 顶部导航栏 -->
                <!-- 将导航栏固定在content里 -->
                <el-affix target=".content" :offset="0">
                    <el-row justify="space-between" class="header">
                        <el-col :span="8">
                            <div class="active">
                                <a href="/home">番剧</a>
                            </div>
                            <div class="active">
                                <a href="/home">直播</a>
                            </div>
                            <div class="active">
                                <a href="/home">游戏中心</a>
                            </div>
                            <div class="active">
                                <a href="/home">会员购</a>
                            </div>
                            <div class="active">
                                <a href="/home">漫画</a>
                            </div>
                            <div class="active">
                                <a href="/home">赛事</a>
                            </div>
                            <div class="active">
                                <a href="/home">世界杯</a>
                            </div>
                        </el-col>
                        <el-col :span="5" style="line-height: 50px;">
                            <el-input v-model="queryObj.query" placeholder="搜你想看" class="input-with-select">
                                <template #append>
                                    <el-button icon="Search" @click="SearchVideo()" />
                                </template>
                            </el-input>
                        </el-col>

                        <el-col :span="8" style="margin-top: 10px;">
                            <!-- 直播栏下拉框 -->
                            <el-dropdown>
                                <el-button type="default">
                                    直播
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <a href="#" style="margin: 0 auto;">热门直播</a>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <a href="#" style="margin: 0 auto;">英雄联盟</a>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <a href="#" style="margin: 0 auto;">王者荣耀</a>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <a href="#" style="margin: 0 auto;">和平精英</a>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <a href="#" style="margin: 0 auto;">更多</a>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-button type="primary" @click="uploadVideo">
                                投稿&nbsp;<el-icon>
                                    <Position />
                                </el-icon>
                            </el-button>
                        </el-col>

                        <!-- 用户头像 -->
                        <div class="user">
                            <section v-if="isShow"> <!-- isShow 为 true 时，显示下面的div -->
                                <div>
                                    <el-dropdown>
                                        <div class="active user_img" :model="user">
                                            无头像
                                            <img :src="user.user_img" alt="">
                                        </div>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item>
                                                    <div style="margin: 0 auto;">
                                                        <h3>{{ user.username }}</h3>
                                                    </div>
                                                </el-dropdown-item>
                                                <el-dropdown-item class="item">

                                                    <a href="/personal" style="margin: 0 auto;">个人中心</a>

                                                </el-dropdown-item>
                                                <!-- <el-dropdown-item>Action 3</el-dropdown-item> -->
                                                <!-- <el-dropdown-item>Action 4</el-dropdown-item> -->
                                                <hr style="width: 80%;">
                                                <el-dropdown-item>
                                                    <el-button @click="loginout">退出登录</el-button>
                                                </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </div>
                            </section>
                            <section v-else> <!-- isShow 为 false 时，显示下面的div -->
                                <div class="weidenglu">
                                    <a href="/clientLogin">登录</a>
                                </div>
                            </section>
                        </div>

                    </el-row>

                </el-affix>
                <el-row class="row-bg" justify="space-evenly">

                    <el-col :span="6">

                    </el-col>
                    <el-col :span="6">

                    </el-col>
                    <el-col :span="6">

                    </el-col>
                </el-row>
            </el-header>
        </div>
        <el-footer>
            <!-- 懒加载视频部分 Footer -->
            <hr>
            <p>以下是搜索到的视频</p>
            <el-row>
                <el-col :span="3" v-for="(item) in video" :key="item.id" :offset="1">
                    <div style="margin-top:15px" @click="this.id = item.id, toVideoContent()">
                        <el-card :body-style="{ padding: '0px' }" shadow="hover" class="videoCard" lazy>
                            <video :src="item.video_content" class="video" />
                            <div>
                                <span>{{ item.video_name }}</span><br><br>
                                <el-button text class="button">{{ item.up_name }}</el-button>
                                <!-- <span>{{ item.up_name }}</span><br> -->
                                <div class="bottom clearfix">
                                    <time class="time">
                                        <p class="VideoTime">{{ item.video_time }}</p>
                                    </time>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </el-footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryObj: {
                limit: 4,
                page: 1,
                query: ""
            },
            video: [
                {
                    video_name: '',
                    video_content: '',
                    video_time: '',
                    up_name: '',
                    up_img: ''
                }
            ],
            total: 0,
            user: {
                username: "",
                user_img: '',
                user_content: '',
                user_sex: '',
                user_phone: '',
            },
            isShow:false,

        }
    },
    created() {
        this.queryObj.query = this.$route.query.video_name
        console.log(this.queryObj.query);
        // this.queryObj = this.$route.query.video_name; 
        this.getSearchVideo();
        this.gettoken();
    },
    methods: {
         // 获取登录信息
         gettoken() {
            let token = localStorage.getItem("stu_token");
            if (token == null) {
                this.$message({ type: 'info', message: '您还没有登录哦~' });
            } else {
                console.log(token);
                let user = JSON.parse(token)
                console.log(user);
                this.user.username = user.username
                this.user.user_img = user.img
                this.user.user_phone = user.phone
                this.user.user_sex = user.sex
                this.user.user_content = user.content
                this.isShow = true
                console.log(this.user);
            }
        },
        // 根据搜索内容获取视频的方法
        async getSearchVideo() {
            console.log("上个页面传递过来的数据" + this.queryObj);
            const result = await this.$http.get('/getPassVideos', { params: this.queryObj });
            console.log(result);
            if (result.status == 200) {
                this.video = result.data.data;
                this.total = result.data.count;
            }
        },
        async toVideoContent() {
            console.log(this.id);
            this.$router.push({
                name: "videoContent",
                params: {
                    id: this.id,
                },
            });
        },
        // 获取视频列表的方法用于搜索
        async SearchVideo() {
            if (this.queryObj.query == "") {
                const result = await this.$http.get('/getPassVideo');
                console.log(result);
                if (result.status == 200) {
                    this.video = result.data.data;
                    this.total = result.data.count;
                }
            } else {
                console.log(this.queryObj.query);
                this.$router.push({
                    name: "Search",
                    query: { video_name: this.queryObj.query }
                });
            }
        },
        loginout() {
            localStorage.clear()
            window.sessionStorage.clear()
            location.reload();
            // this.$router.push('/login')
        },
    }
}
</script>

<style lang="less" scoped>
a {
    text-decoration: none;
    color: black;
}

.common-layout {
    margin: 0 auto;
    width: 95%;
}

.header {
    width: 100%;
    background-color: white;
}

.active {
    display: flex;
    padding: 10px;
    float: left;
}

img {
    max-width: 100%;
    max-height: 100%;
}

video {
    max-width: 100%;
    max-height: 100%;
}

.user {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 100px;
}

.user_img {
    padding: 0;
    text-align: center;
    width: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0 10px;
    border: 1px solid black;
    border-radius: 50%;

    img {
        position: absolute;
        border-radius: 50%;
    }
}

.weidenglu {
    padding: 0;
    text-align: center;
    width: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0 10px;
    border: 1px solid black;
    border-radius: 50%;
    background-color: ghostwhite;
}

.item {
    text-align: center !important;
}

.videoCard {
    min-height: 260px;
    max-height: 330px;
}
</style>