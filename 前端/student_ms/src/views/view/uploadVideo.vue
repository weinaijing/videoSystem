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
                            <div class="active user_img" :model="video">
                                无头像
                                <img :src="video.up_img" alt="">
                            </div>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>
                                        <div style="margin: 0 auto;">
                                            <h3>{{ video.up_name }}</h3>
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
        
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;视频投稿</h3>

        <div style="width: 50%; margin: 0 auto;">
            <el-form :model="video" label-width="120px" :rules="video" ref="videoRef">
                <!-- <el-form-item label="用户姓名" prop="up_name">
                    <el-input v-model="video.up_name" />
                </el-form-item>
                <el-form-item label="用户头像" prop="up_img">
                    <img v-if="video.up_img" :src="video.up_img" class="avatar" />
                </el-form-item> -->
                <el-form-item label="视频名称" prop="video_name">
                    <el-input v-model="video.video_name" />
                </el-form-item>
                <el-form-item label="视频内容" prop="video_content">
                    <el-upload class="avatar-uploader" action="/api/uploadVideo" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <video v-if="video.video_content" :src="video.video_content" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="发布时间" prop="video_time">
                    <el-input v-model="video.video_time" />
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="addVideo" style="float: right;">提交</el-button>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            video: {
                up_name: "",
                up_img: "",
                video_name: "",
                video_content: "",
                video_time: "",
            },
            isShow:false,
        }
    },
    created() {
        this.gettoken();
        this.getTime();
    },
    methods: {
        // 视频提交
        async addVideo() {
            let token = localStorage.getItem("stu_token");
            console.log(token);
            if (token != undefined) {
                const result = await this.$http.post('/addVideo', qs.stringify(this.video));
                console.log(result);
                if (result.status == 200) {
                    this.addDialogVisible = false;
                    this.$message.success("上传成功!等待审核 "); 3
                } else {
                    this.$message.error("上传失败! ");
                }
            } else {
                this.$message({ type: 'error', message: '亲，请先登录哦' });
            }
        },
        // 上传头像相关方法
        handleAvatarSuccess(uploadFile) {
            console.log(123);
            console.log(uploadFile);
            this.video.video_content = uploadFile.src;
            // imageUrl.value = URL.createObjectURL("");
        },
        beforeAvatarUpload(rawFile) {
            console.log(444);
            if (rawFile.type !== 'video/mp4') {
                this.$message.error('视频格式不正确!')
                return false
            } else if (rawFile.size / 1024 / 1024 > 1024) {
                this.$message.error('视频太大了!')
                return false
            }
            return true
        },
        // 获取登录信息
        gettoken() {
            let token = localStorage.getItem("stu_token");
            console.log(token);
            if (token == null) {
                this.$message({ type: 'error', message: '亲，请先登录哦' });
            } else {
                let user = JSON.parse(token)
                console.log(user);
                this.video.up_name = user.username
                this.video.up_img = user.img
                this.isShow = true
                console.log(this.video);
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

    },


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

img {
    max-width: 100%;
    max-height: 100%;
}
.user{
    right: 3%;
}
.avatar-uploader {
    border: 1px dashed #8c939d;
}

.avatar-uploader .avatar {
    max-width: 100%;
    max-height: 100%;
    display: block;
    // text-align: center;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 615px;
    height: 360px;
    text-align: center;
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

</style>