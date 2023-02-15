<template>
    <div>
        <el-row justify="space-between" class="header">
            <el-col :span="10">
                <div class="active">
                    <a href="#">番剧</a>
                </div>
                <div class="active">
                    <a href="#">直播</a>
                </div>
                <div class="active">
                    <a href="#">游戏中心</a>
                </div>
                <div class="active">
                    <a href="#">会员购</a>
                </div>
                <div class="active">
                    <a href="#">漫画</a>
                </div>
                <div class="active">
                    <a href="#">赛事</a>
                </div>
                <div class="active">
                    <a href="">世界杯</a>
                </div>
            </el-col>
            <el-col :span="5" style="line-height: 50px;">
                <!-- <el-input v-model="queryObj.query" placeholder="搜你想看" class="input-with-select">
                    <template #append>
                        <el-button icon="Search" @click="getHotVideo()" />
                    </template>
                </el-input> -->
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
            <el-col :span="8" style="margin-top: 10px;">
                <!-- 直播栏下拉框 -->
                <el-dropdown>
                    <el-button type="default">
                        直播
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>Action 1</el-dropdown-item>
                            <el-dropdown-item>Action 2</el-dropdown-item>
                            <el-dropdown-item>Action 3</el-dropdown-item>
                            <el-dropdown-item>Action 4</el-dropdown-item>
                            <el-dropdown-item>Action 5</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-button type="primary" @click="uploadVideo">
                    投稿&nbsp;<el-icon>
                        <Position />
                    </el-icon>
                </el-button>
            </el-col>
        </el-row>
        <!-- <h2>个人中心</h2> -->
        <div class="PersonTop">
            <div class="PersonTop_img">
                <img v-image-preview :src="user.user_img" />
            </div>
            <div class="PersonTop_text">
                <div class="user_text">
                    <div class="user_name">
                        <span> {{ user.username }} </span>
                    </div>
                    <div class="user-v" v-if="v === 3">
                        <img :src="user.user_img" class="user-v-img">
                        <span class="user-v-font">优质媒体作者</span>
                    </div>
                    <div class="user_qianming">
                        <span> {{ design }}</span>
                    </div>
                    <div class="user_anniu">
                        <el-button class="el-icon-edit" v-if="this.$route.params.id === this.$store.state.id"
                            type="primary" size="medium" plain @click="edit">编辑</el-button>
                        <el-button v-else @click="follow" type="primary" size="medium" icon="el-icon-check" v-text="
                            isfollowid.indexOf(this.$route.params.id) > -1
                                ? '已关注'
                                : '关注'
                        "></el-button>
                    </div>
                </div>
                <div class="user_num">
                    <div style="cursor: pointer" @click="myfan">
                        <div class="num_number">{{ fanCounts }}</div>
                        <span class="num_text">粉丝</span>
                    </div>
                    <div style="cursor: pointer" @click="myfollow">
                        <div class="num_number">{{ followCounts }}</div>
                        <span class="num_text">关注</span>
                    </div>
                    <div>
                        <div class="num_number">{{ goodCounts }}</div>
                        <span class="num_text">获赞</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="person_body">
            <div class="person_body_left">
                <el-card class="box-card" :body-style="{ padding: '0px' }">
                    <div slot="header" class="clearfix">
                        <span class="person_body_list" style="border-bottom: none">个人中心</span>
                    </div>
                    <el-menu router active-text-color="#00c3ff" class="el-menu-vertical-demo">
                        <el-menu-item index="info" :route="{ name: 'info', params: $route.params.id }">
                            <i class="el-icon-user"></i>
                            <span slot="title">个人简介</span>
                        </el-menu-item>
                        <el-menu-item index="myarticle" :route="{ name: 'myarticle', params: $route.params.id }">
                            <i class="el-icon-edit-outline"></i>
                            <span slot="title">发帖</span>
                        </el-menu-item>
                        <el-menu-item index="mycollect" :route="{ name: 'mycollect', params: $route.params.id }">
                            <i class="el-icon-document"></i>
                            <span slot="title">收藏</span>
                        </el-menu-item>
                        <el-menu-item index="myfan" :route="{ name: 'myfan', params: $route.params.id }">
                            <i class="el-icon-tableware"></i>
                            <span slot="title">粉丝</span>
                        </el-menu-item>
                        <el-menu-item index="myfollow" :route="{ name: 'myfollow', params: $route.params.id }">
                            <i class="el-icon-circle-plus-outline"></i>
                            <span slot="title">关注</span>
                        </el-menu-item>
                    </el-menu>
                </el-card>
            </div>
            <div class="person_body_right">
                <router-view></router-view>
            </div>
        </div>
        <personal-dia ref="dia" @flesh="reload" />
    </div>
</template>
<script>
import Editor from "../../components/Editor/Editor.vue"
export default {
    data() {
        return {
            user: {
                id: "",
                username: "",
                user_img: "",
                user_phone: "",
                user_sex: "",
                user_content: "",
            },
            isShow: false,
        }
    },
    created() {
        this.gettoken();
        // this.getUser();
    },
    methods: {
        // 获取登录信息
        gettoken() {

            let token = localStorage.getItem("stu_token");
            console.log(token);
            if (token == null) {
                this.$message({ type: 'error', message: '亲，请先登录哦' });
            } else {
                let user = JSON.parse(token)
                console.log(user);
                this.user.username = user.username
                this.user.user_img = user.img
                this.user.id = user.id
                this.user.user_phone = user.phone
                this.user.user_sex = user.sex
                this.user.user_content = user.content
                this.isShow = true
                console.log(this.user);
            }
        },
        // 获取当前时间
        getTime() {
            setInterval(() => {
                //new Date() new一个data对象，当前日期和时间
                //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
                this.video.video_time = new Date().toLocaleString();
            }, 1000)
        },
        // 获取用户的方法
        async getUser() {
            const result = await this.$http.get('/getStudent', { params: this.user.id });
            console.log(result);
            if (result.status == 200 && result.data.code == "0000") {
                this.studentList = result.data.data;
                this.total = result.data.count;
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

.header {
    background-color: white;

}

.active {
    display: flex;
    padding: 10px;
    float: left;
}

.user {
    right: 3%;
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
        max-width: 100%;
        max-height: 100%;
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

.me-video-player {
    background-color: transparent;
    width: 100%;
    height: 100%;
    object-fit: fill;
    display: block;
    position: fixed;
    left: 0;
    z-index: 0;
    top: 0;
}

.PersonTop {
    width: 1000px;
    height: 140px;
    padding-top: 20px;
    background-color: white;
    margin-top: 30px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    border-radius: 5px;
}

.PersonTop_img {
    width: 150px;
    height: 120px;
    background-color: #8c939d;
    margin-right: 24px;
    margin-left: 20px;
    overflow: hidden;
    border-radius: 20px;
}

.PersonTop_img img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
}

.PersonTop_text {
    height: 120px;
    width: 880px;
    display: flex;
}

.user_text {
    width: 60%;
    height: 100%;
    line-height: 30px;
}

.user_name {
    font-weight: bold;
}

.user-v {
    margin-bottom: -5px;
}

.user-v-img {
    width: 15px;
    height: 15px;
}

.user-v-font {
    font-size: 15px;
    color: #00c3ff;
}

.user_qianming {
    font-size: 14px;
    color: #999;
}

.user_num {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
}

.user_num>div {
    text-align: center;
    border-right: 1px dotted #999;
    box-sizing: border-box;
    width: 80px;
    height: 40px;
    line-height: 20px;
}

.num_text {
    color: #999;
}

.num_number {
    font-size: 20px;
    color: #333;
}

.el-menu-item>span {
    font-size: 16px;
    color: #999;
}

/*下面部分样式*/
.person_body {
    width: 1000px;
    margin-top: 210px;
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
}

.person_body_left {
    width: 27%;
    height: 600px;
    border-radius: 5px;
    margin-right: 3%;
    text-align: center;
}

.person_body_list {
    width: 100%;
    height: 50px;
    margin-top: 25px;
    font-size: 22px;
    border-bottom: 1px solid #f0f0f0;
    background-image: -webkit-linear-gradient(left,
            rgb(42, 134, 141),
            #e9e625dc 20%,
            #3498db 40%,
            #e74c3c 60%,
            #09ff009a 80%,
            rgba(82, 196, 204, 0.281) 100%);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation 4s linear infinite;
}

.el-menu-item {
    margin-top: 22px;
}

.person_body_right {
    width: 70%;
    /* height: 500px; */
    border-radius: 5px;
    background-color: white;
}

.box-card {
    height: 500px;
}

/*ui样式*/
.el-button {
    width: 84px;
}
</style>