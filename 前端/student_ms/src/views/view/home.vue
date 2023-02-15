<template>
    <div class="common-layout">

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
            <!-- main -->
            <el-main class="main">
                <!-- <img src="component/images/01.jpg" alt=""> -->
                <!-- 轮播图/走马灯 -->
                <el-carousel :interval="3000" type="card" height="300px" style="background-color: white;">
                    <el-carousel-item v-for="item in imgs" :key="item">
                        <!-- <h3 text="2xl" justify="center"></h3> -->
                        <img :src="item" alt="">
                        <p>{{ item }}</p>
                    </el-carousel-item>
                </el-carousel>
                <!-- 热门推荐视频部分 -->
                <el-button @click="NextPage()" class="NextPage">换一批</el-button>
                <el-row style="position: relative;">
                    <el-col :span="5" v-for="(item) in HotVideo" :key="item.id" :offset="1">

                        <div style="margin-top:15px" @click="this.id = item.id, toVideoContent()">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="HotvideoCard">
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

            </el-main>
        </div>

        <el-footer>
            <!-- 懒加载视频部分 Footer -->
            <hr>
            <p>热门视频</p>
            <el-row>
                <el-col :span="3" v-for="(item) in PassVideo" :key="item.id" :offset="1">
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
            <hr style="margin-top: 15px; ">
            <p>猜你喜欢</p>
            <el-row>
                <el-col :span="3" v-for="(item) in PassVideo" :key="item.id" :offset="1">
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

        <!-- 返回顶部 -->
        <el-backtop :bottom="130" :right="65">
            <div class="flownav">

            </div>
        </el-backtop>

    </div>
</template>
<script>

export default {
    data() {
        return {
            id: 0,
            isShow: false,
            imgs: [
                'component/images/lunbotu1.webp',
                'component/images/lunbotu2.webp',
                'component/images/lunbotu3.webp',
                'component/images/lunbotu4.webp',
                'component/images/lunbotu5.webp',
                'component/images/lunbotu6.webp',
            ],
            queryObj: {
                limit: 4,
                page: 1,
                query: ""
            },
            HotVideototal: 0,
            HotVideo: {
                up_name: "",
                up_img: "",
                video_name: "",
                video_content: "",
                video_time: "",
            },

            PassVideo: {
                up_name: "",
                up_img: "",
                video_name: "",
                video_content: "",
                video_time: "",
            },
            user: {
                username: "",
                user_img: '',
                user_content: '',
                user_sex: '',
                user_phone: '',
            }
        }
    },
    created() {
        this.getHotVideo();
        this.gettoken();
        this.getPassVideo();
    },
    methods: {
        async getHotVideo() {
            const result = await this.$http.get('/getHotVideo', { params: this.queryObj });
            console.log(result);
            if (result.status == 200) {
                this.HotVideo = result.data.data;
                this.HotVideototal = result.data.count;
            }
        },
        // 获取视频列表的方法用于搜索
        async SearchVideo() {
            console.log(this.queryObj.query);
            this.$router.push({
                name: "Search",
                query: {video_name:this.queryObj.query}
            });
        },
        NextPage() {
            let cn = Math.ceil(this.HotVideototal / 4);
            console.log(cn);
            if (this.queryObj.page == cn) {
                this.queryObj.page = 1
                this.getHotVideo()
            } else {
                this.queryObj.page += 1
                this.getHotVideo()
            }
        },
        async getPassVideo() {
            const result = await this.$http.get('/getPassVideo');
            console.log(result);
            if (result.status == 200) {
                this.PassVideo = result.data.data;
                console.log(this.PassVideo);
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
        uploadVideo() {
            console.log("111");
            this.$router.push({ name: 'UploadVideo' })
        },
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
// .headerBG{
//     position: relative;
//     width: 100%;
//     height: 180px;
//     background: url(../../../public/component/images/navbarBG.png);
// }
.active {
    display: flex;
    padding: 10px;
    float: left;
}

.channel {
    width: 100%;
    position: relative;
    text-align: center;
    margin-top: 30px;
}

.channel-icon {
    float: left;
    margin-right: 30px;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    // background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    // background-color: #d3dce6;
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

.HotvideoCard {
    min-height: 280px;
    max-height: 350px;
}

.videoCard {
    min-height: 260px;
    max-height: 330px;
}

.VideoTime {
    color: gray;
}

.main {}

.NextPage {
    overflow: hidden;
    vertical-align: middle;
    position: absolute;
    display: flex;
    margin-top: 15px;
    width: 80px;
    height: 40px;
    left: 25px;
}

.flownav {
    background-image: url(../../../public/component/images/backtop1.png);
    background-position: 0 0;
    background-repeat: no-repeat;
    bottom: 50px;
    cursor: pointer;
    height: 174px;
    position: fixed;
    text-align: center;
    width: 150px;
    z-index: 101;
    right: 10px;
}

.flownav:hover {
    /* bottom: 10%;
    right: 2%;
    position: fixed; */
    /* display: flex; */
    /* width: 40px; */
    z-index: 100;
    animation: launch .5s step-start infinite;
    background-image: url(../../../public/component/images/backtop.png);

}

@keyframes launch {
    0% {
        background-position: 0 0;
    }

    25% {
        background-position: -150px 0;
    }

    50% {
        background-position: -300px 0;
    }

    75% {
        background-position: -450px 0;
    }

    100% {
        background-position: -600px 0;
    }
}

.flownavBOX {
    border: 2px solid skyblue;
    border-radius: 5px;
}
</style>