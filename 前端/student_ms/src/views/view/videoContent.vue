<template>
    <div class="body">
        <el-container>
            <el-header class="videoHeader">
                <el-row>
                    <el-col :span="14">
                        <!-- 视频名称 -->
                        <p>{{ video.video_name }}</p>
                        <!-- 视频发布时间 -->
                        <p>{{ video.video_time }}</p>
                    </el-col>
                    <el-col :span="10">
                        <div class="up">
                            <img :src="`../${video.up_img}`" alt="">
                            <p>{{ video.up_name }}</p>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <video :src="`../${video.video_content}`" controls></video>
            </el-main>
            <el-footer class="videoFooter">
                <div class="toolbar-left">
                    <el-button v-on:click="dianzan += 1">
                        <p>{{ dianzan }}</p>点赞
                    </el-button>

                    <el-button v-on:click="toubi += 1">
                        <p>{{ toubi }}</p>投币
                    </el-button>
                </div>
                <div class="toolbar-right">
                    <el-button @click="ShowreportVideo()">
                        <el-icon>
                            <WarnTriangleFilled />
                        </el-icon>举报
                    </el-button>

                </div>
            </el-footer>
        </el-container>
        <!-- 举报视频 -->
        <el-dialog v-model="reportVideoDialogVisible" title="举报视频" width="50%" :before-close="handleClose">
            <span>
                <el-form :model="reportvideo" label-width="120px" :rules="addFormRules" ref="addFormRef">
                    <el-form-item label="up" prop="up_name">
                        <el-input v-model="reportvideo.up_name" />
                    </el-form-item>
                    <el-form-item label="up头像" prop="up_img">
                        <el-upload class="avatar-uploader" action="/api/upload" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="reportvideo.up_img" :src="`../${reportvideo.up_img}`" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="视频名称" prop="video_name">
                        <el-input v-model="reportvideo.video_name" />
                    </el-form-item>
                    <el-form-item label="视频内容" prop="video_content">
                        <el-input v-model="reportvideo.video_content" />
                    </el-form-item>
                    <el-form-item label="发布时间" prop="video_time">
                        <el-input v-model="reportvideo.video_time" />
                    </el-form-item>
                    <el-form-item label="举报理由" prop="reason">
                        <el-input v-model="reportvideo.reason" />
                    </el-form-item>
                </el-form>
            </span>
            <span class="dialog-footer">
                <el-button type="" @click="reportVideoDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="reportVideo()">确定</el-button>
            </span>
        </el-dialog>

        <!-- 评论区 -->
        <div class="comments">
            <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
                <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
                <div class="reply-info">
                    <div tabindex="0" contenteditable="true" id="replyInput" spellcheck="false" placeholder="输入评论..."
                        class="reply-input" @focus="showReplyBtn" @input="onDivInput($event)">
                    </div>
                </div>
                <div class="reply-btn-box" v-show="btnShow">
                    <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">发表评论</el-button>
                </div>
            </div>
            <section v-if="isShow">
                <div style="height: 50px; width: 70%;">
                    <h3>还没有人评论，快抢沙发吧~</h3>
                </div>
            </section>
            <div v-for="(item, i) in comments" :key="i" class="author-title reply-father">

                <el-avatar class="header-img" :size="40" :src="item.headImg"></el-avatar>
                <div class="author-info">
                    <span class="author-name">{{ item.name }}</span>
                    <span class="author-time">{{ item.time }}</span>
                </div>
                <div class="icon-btn">
                    <span @click="showReplyInput(i, item.name, item.id)">
                        <el-icon>
                            <ChatDotRound />
                        </el-icon>{{ item.commentNum }}</span>
                    <el-icon>
                        <!-- <CaretTop /> -->
                    </el-icon>{{ item.like }}
                </div>
                <div class="talk-box">
                    <p>
                        <span class="reply">{{ item.comment }}</span>
                    </p>
                </div>
                <div class="reply-box">
                    <div v-for="(reply, j) in item.reply" :key="j" class="author-title">
                        <el-avatar class="header-img" :size="40" :src="reply.fromHeadImg"></el-avatar>
                        <div class="author-info">
                            <span class="author-name">{{ reply.from }}</span>
                            <span class="author-time">{{ reply.time }}</span>
                        </div>
                        <div class="icon-btn">
                            <span @click="showReplyInput(i, reply.from, reply.id)"><el-icon>
                                    <ChatDotRound />
                                </el-icon>{{ reply.commentNum }}</span>
                            <el-icon>
                                <!-- <CaretTop /> -->
                            </el-icon>{{ reply.like }}
                        </div>
                        <div class="talk-box">
                            <p>
                                <span>回复 {{ reply.to }}:</span>
                                <span class="reply">{{ reply.comment }}</span>
                            </p>
                        </div>
                        <div class="reply-box">

                        </div>
                    </div>
                </div>
                <div v-show="_inputShow(i)" class="my-reply my-comment-reply">
                    <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
                    <div class="reply-info">
                        <div tabindex="0" contenteditable="true" spellcheck="false" placeholder="输入评论..."
                            @input="onDivInput($event)" class="reply-input reply-comment-input"></div>
                    </div>
                    <div class=" reply-btn-box">
                        <el-button class="reply-btn" size="medium" @click="sendCommentReply(i, j)"
                            type="primary">发表评论</el-button>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
import qs from "qs"
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.vueClickOutside = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update() { },
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.vueClickOutside);
        delete el.vueClickOutside;
    },
};

export default {
    // name: 'ArticleComment',
    data() {
        return {
            id: null,
            video: {
                up_name: "",
                up_img: "",
                video_name: "",
                video_content: "",
                video_time: "",
            },
            reportvideo: {
                id: 0,
                up_name: "",
                up_img: "",
                video_name: "",
                video_content: "",
                video_time: "",
                reason: ""
            },
            dianzan: 0,
            toubi: 0,
            reportVideoDialogVisible: false,
            btnShow: false,
            isShow: false,
            index: '0',
            replyComment: '',
            myName: 'Lana Del Rey',
            myHeader: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
            myId: 19870621,
            to: '',
            toId: -1,
            comments: [
                {
                    uid: 19870621,
                    name: 'Lana Del Rey',
                    headImg: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                    comment: '我发布一张新专辑Norman Fucking Rockwell,大家快来听啊',
                    time: '2019年9月16日 18:43',
                    commentNum: 2,
                    like: 15,
                    inputShow: false,
                    reply: [
                        {
                            from: '张郃',
                            fromUid: 5,
                            fromHeadImg: 'http://localhost:9999//upload/1194820221205200633fil.jpg',
                            to: '赵云',
                            toUid: 4,
                            comment: '你好',
                            time: '2024年9月16日 18:43',
                            commentNum: 1,
                            like: 15,
                            inputShow: false
                        },
                    ]
                },

            ]
        }
    },
    created() {
        this.id = this.$route.params.id;    //接收上个页面传过来的参数。
        this.getVideoById();
        this.gettoken();
        this.getComments()
    },
    directives: { clickoutside },
    methods: {
        async getVideoById() {
            console.log("上个页面传递过来的ID" + this.id);
            const result = await this.$http.get('/getVideoById/' + this.id);
            console.log(result);
            if (result.status == 200) {
                this.video = result.data.data;
            }
        },
        // 举报视频
        async ShowreportVideo() {
            this.reportVideoDialogVisible = true
            console.log("举报视频");
            console.log("上个页面传递过来的ID" + this.id);
            const result = await this.$http.get('/getVideoById/' + this.id);
            console.log(result);
            console.log(result.data.data);
            if (result.status == 200) {
                this.reportvideo = result.data.data;
                console.log(this.reportvideo);
            }
        },
        async reportVideo() {
            let token = localStorage.getItem("stu_token");
            if (token != undefined) {
                console.log(token);
                const result = await this.$http.post('/ReportVideo', qs.stringify(this.reportvideo));
                console.log(666);
                console.log(result);
                if (result.status == 200) {
                    this.reportVideoDialogVisible = false;
                    this.$message.success("举报成功! ");
                } else {
                    this.$message.error("举报失败! ");
                }
            } else {
                this.$message({ type: 'info', message: '您没还没有登录,请先登录' });
            }
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
                this.myName = user.username
                this.myHeader = user.img
                this.myId = user.id
                console.log(this.user);
            }
        },

        // 获取视频评论
        async getComments() {
            const result = await this.$http.get('/getComments', { params: { id: this.id } });
            console.log(result.data);
            const id = result.data.id
            this.comments = result.data
            console.log(this.comments.length)
            if (this.comments.length == 0) {
                this.isShow = true
                console.log(1111);
            }
            // if (result.status == 200) {
            //     this.videoList = result.data.data;
            //     this.total = result.data.count;
            // }
        },
        inputFocus() {
            var replyInput = document.getElementById('replyInput');
            replyInput.style.padding = "8px 8px"
            replyInput.style.border = "2px solid blue"
            replyInput.focus()
        },
        showReplyBtn() {
            this.btnShow = true
        },
        hideReplyBtn() {
            this.btnShow = false
            replyInput.style.padding = "10px"
            replyInput.style.border = "none"
        },
        showReplyInput(i, name, id) {
            this.comments[this.index].inputShow = false
            this.index = i
            this.comments[i].inputShow = true
            this.to = name
            this.toId = id
        },
        _inputShow(i) {
            return this.comments[i].inputShow
        },
        async sendComment() {
            if (!this.replyComment) {
                this.$message({
                    showClose: true,
                    type: 'warning',
                    message: '评论不能为空'
                })
            } else {
                let a = {}
                let input = document.getElementById('replyInput')
                let timeNow = new Date().getTime();
                let time = this.dateStr(timeNow);
                a.name = this.myName
                a.comment = this.replyComment
                a.headImg = this.myHeader
                a.time = time
                a.commentNum = 0
                a.like = 0
                this.comments.push(a)
                this.replyComment = ''
                input.innerHTML = ''

                let newcomment = a;
                newcomment.uid = this.myId
                newcomment.vid = this.id
                newcomment.time = new Date().toLocaleString()
                console.log(newcomment)
                let token = localStorage.getItem("stu_token");
                console.log(token);
                if (token != undefined) {
                    const result = await this.$http.post('/addComment', qs.stringify(newcomment));
                    console.log(result);
                    if (result.status == 200) {
                        this.addDialogVisible = false;
                        this.$message.success("评论成功 "); 3
                    } else {
                        this.$message.error("评论失败 ");
                    }
                } else {
                    this.$message({ type: 'error', message: '亲，请先登录哦' });
                }
            }
        },
        sendCommentReply(i, j) {
            if (!this.replyComment) {
                this.$message({
                    showClose: true,
                    type: 'warning',
                    message: '评论不能为空'
                })
            } else {
                let a = {}
                let timeNow = new Date().getTime();
                let time = this.dateStr(timeNow);
                a.from = this.myName
                a.to = this.to
                a.fromHeadImg = this.myHeader
                a.comment = this.replyComment
                a.time = time
                a.commentNum = 0
                a.like = 0
                this.comments[i].reply.push(a)
                this.replyComment = ''
                document.getElementsByClassName("reply-comment-input")[i].innerHTML = ""
            }
        },
        onDivInput: function (e) {
            this.replyComment = e.target.innerHTML;
        },
        dateStr(date) {
            //获取js 时间戳
            var time = new Date().getTime();
            //去掉 js 时间戳后三位，与php 时间戳保持一致
            time = parseInt((time - date) / 1000);
            //存储转换值 
            var s;
            if (time < 60 * 10) {//十分钟内
                return '刚刚';
            } else if ((time < 60 * 60) && (time >= 60 * 10)) {
                //超过十分钟少于1小时
                s = Math.floor(time / 60);
                return s + "分钟前";
            } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
                //超过1小时少于24小时
                s = Math.floor(time / 60 / 60);
                return s + "小时前";
            } else if ((time < 60 * 60 * 24 * 30) && (time >= 60 * 60 * 24)) {
                //超过1天少于30天内
                s = Math.floor(time / 60 / 60 / 24);
                return s + "天前";
            } else {
                //超过30天ddd
                var date = new Date(parseInt(date));
                return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
            }
        },


    }

}

</script>

<style lang="less" scoped>
.body {
    a {
        text-decoration: none;
        color: black;
    }
}

video {
    width: 70%;
    max-width: 1600px;
    max-height: 900px;
    background: gray;
    margin-top: 50px;
}

.videoHeader {
    .up {
        // text-align: center;
        display: flex;

        img {
            max-width: 80px;
            max-height: 80px;
            margin-right: 15px;
        }

    }
}

.toolbar-left {
    position: absolute;
    left: 15%;
    margin-left: 15px;
}

.toolbar-right {
    position: absolute;
    right: 15%;
    margin-right: 15px;
}

.avatar {
    max-width: 150px;
}

// 评论区
.comments {
    max-width: 70%;
    margin: 0 auto;
}

.my-reply {
    padding: 10px;
    background-color: #fafbfc;

    .header-img {
        display: inline-block;
        vertical-align: top;
    }

    .reply-info {
        display: inline-block;
        margin-left: 5px;
        width: 90%;

        @media screen and (max-width:1200px) {
            width: 80%;
        }
    }

    .reply-input {
        min-height: 20px;
        line-height: 22px;
        padding: 10px 10px;
        color: #ccc;
        background-color: #fff;
        border-radius: 5px;

        &:empty:before {
            content: attr(placeholder);
        }

        &:focus:before {
            content: none;
        }

        &:focus {
            padding: 8px 8px;
            border: 2px solid blue;
            box-shadow: none;
            outline: none;
        }
    }

    .reply-btn-box {
        height: 25px;
        margin: 10px 0;
    }

    .reply-btn {
        position: relative;
        float: right;
        margin-right: 25px;
    }
}

.my-comment-reply {
    margin-left: 50px;

    .reply-input {
        width: flex;
    }
}

.author-title:not(:last-child) {
    border-bottom: 1px solid rgba(178, 186, 194, .3)
}

.author-title {
    padding: 10px;

    .header-img {
        display: inline-block;
        vertical-align: top;
    }

    .author-info {
        display: inline-block;
        margin-left: 5px;
        width: 60%;
        height: 40px;
        line-height: 20px;
        text-align: left;

        >span {
            display: block;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .author-name {
            color: #000;
            font-size: 18px;
            font-weight: bold;

        }

        .author-time {

            font-size: 14px;
        }
    }

    .icon-btn {
        width: 30%;
        padding: 0 !important;
        float: right;

        @media screen and (max-width : 1200px) {
            width: 20%;
            padding: 7px;
        }

        >span {
            cursor: pointer;
        }

        .iconfont {
            margin: 0 5px;
        }
    }

    .talk-box {
        margin: 0 50px;

        >p {
            margin: 0;
        }

        .reply {
            font-size: 16px;
            color: #000;
        }
    }

    .reply-box {
        margin: 10px 0 0 50px;
        background-color: #efefef;
    }
}
</style>