<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">系统管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>视频管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片布局 -->
        <el-card class="box-card">
            <!-- 搜索添加按钮区域 -->
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input v-model="queryObj.query" placeholder="请输入视频名称" class="input-with-select">
                        <template #append>
                            <el-button icon="Search" @click="getVideoList" />
                        </template>
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="danger" icon="delete" @click="delAll" style="margin-left:15px;">
                        一键删除
                    </el-button>
                </el-col>
            </el-row>

            <!-- 表格数据区域 -->
            <el-table :data="videoList" border stripe v-loading="listLoading" @selection-change="handleSelectionChange"
                @row-click="handleRowClick" ref="handSelectTest_multipleTable" row-key="id">
                <el-table-column type='selection' label="全选" width="55" :reserve-selection="true" />
                <el-table-column prop="up_name" label="up名称" />
                <el-table-column prop="up_img" label="up头像">
                    <template #default="scope">
                        <el-avatar shape="square" :size="80" :fit="fit" :src="scope.row.up_img" />
                    </template>
                </el-table-column>

                <el-table-column prop="video_name" label="视频名称" />
                <el-table-column prop="video_content" label="视频内容">
                    <template #default="scope">
                        <video shape="square" :size="80" :fit="fit" :src="scope.row.video_content" class="tablevideo" />
                    </template>
                </el-table-column>
                <el-table-column prop="video_time" label="发布时间" />
                <el-table-column label="操作" width="180px">
                    <template #default="scope">
                        <el-button type="primary" icon="Edit" @click="showAuditDialog(scope.row)"></el-button>
                        <el-button type="danger" icon="delete" @click="deleteVideo(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleSizeChange" background
                layout="prev, pager, next" :total="total" :page-sizes="[3, 5, 10, 15, 20, 50]"
                :page-size="queryObj.limit" :current-page="queryObj.page" />
        </el-card>

        <!-- 视频审核 -->

        <el-dialog v-model="AuditDialogVisible" title="视频审核" width="50%" :before-close="handleClose">
            <span>
                <el-form :model="AuditvideoList" label-width="120px">
                    <el-form-item label="up名称" prop="up_name">
                        <el-input v-model="AuditvideoList.video_name" />
                    </el-form-item>
                    <el-form-item label="up头像" prop="up_img">
                        <el-upload class="avatar-uploader" action="/api/upload" :show-file-list="false">

                            <img v-if="AuditvideoList.up_img" :src="AuditvideoList.up_img" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="视频名称" prop="video_name">
                        <el-input v-model="AuditvideoList.video_name" />
                    </el-form-item>
                    <el-form-item label="视频内容" prop="video_content">
                        <video v-if="AuditvideoList.video_content" :src="AuditvideoList.video_content" class="video"
                            controls="controls" />
                    </el-form-item>
                    <el-form-item label="发布时间" prop="video_time">
                        <el-input v-model="AuditvideoList.video_time" />
                    </el-form-item>
                </el-form>
            </span>
            <span class="dialog-footer">
                <el-button type="" @click="AuditDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="PassAudit()">通过审核</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import qs from "qs"
export default {
    data() {
        return {
            queryObj: {
                limit: 4,
                page: 1,
                query: ""
            },
            total: 0,
            videoList: [
                {
                    video_name: '',
                    video_content: '',
                    video_time: '',
                    up_name: '',
                    up_img: ''
                }
            ],
            AuditDialogVisible: false,
            AuditvideoList: [
                {
                    video_name: '',
                    video_content: '',
                    video_time: '',
                    up_name: '',
                    up_img: ''
                }
            ],
        }
    },
    created() {
        this.getVideoList();
    },
    methods: {
        // 获取视频列表的方法
        async getVideoList() {
            const result = await this.$http.get('/getVideos', { params: this.queryObj });
            console.log(result);
            if (result.status == 200) {
                this.videoList = result.data.data;
                this.total = result.data.count;
            }
        },
        // 分页调用事件
        handleSizeChange(newPage) {
            this.queryObj.page = newPage;
            this.getVideoList();
        },
        // 审核页面
        // 获取单个视频信息,并渲染审核页面
        async showAuditDialog(info) {
            console.log(info);
            this.AuditDialogVisible = true;
            this.AuditvideoList = info;
        },

        //删除视频
        deleteVideo(id) {
            let token = localStorage.getItem("stu_token");
            let state = JSON.parse(token).state
            console.log(state);
            if (state == '1') {
                //弹框询问用户是否删除数据
                this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const result = await this.$http.delete('/deleteVideo/' + id);
                    console.log(result);
                    if (result.status !== 200) {
                        return this.$message.error('删除失败！');
                    }
                    this.$message({ type: 'success', message: '删除成功!' });
                    //重新获取视频列表数据
                    this.getVideoList();
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消删除' });
                });
            } else {
                this.$message({ type: 'error', message: '您没有删除用户权限' });
            }
        },
        // 批量删除视频
        //点击复选框触发，复选框样式的改变
        handleSelectionChange(val) {
            console.log(val)  //打印选中的行集合
            this.multipleSelection = val;
        },
        //点击行触发，选中或不选中复选框
        handleRowClick(row, column, event) {
            this.$refs.handSelectTest_multipleTable.toggleRowSelection(row);
            console.log(row)  //打印的时当前选中的行
        },
        //点击批量删除
        async delAll() {
            let token = localStorage.getItem("stu_token");
            let state = JSON.parse(token).state
            console.log(state);
            if (state == '1') {
                var arr = []
                //遍历点击选择的对象集合，拿到每一个对象的id添加到新的集合中
                this.multipleSelection.forEach(row => arr.push(row.id))
                this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const result = await this.$http.delete('/deleteVideos/' + arr);
                    console.log(result);
                    if (result.status !== 200) {
                        return this.$message.error('删除失败！');
                    }
                    this.$message({ type: 'success', message: '删除成功!' });
                    //重新获取视频列表数据
                    this.getVideoList();
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消删除' });
                });
            } else {
                this.$message({ type: 'error', message: '您没有删除权限' });
            }
        },

        // 视频通过审核
        async PassAudit() {
            let token = localStorage.getItem("stu_token");
            let state = JSON.parse(token).state
            console.log(state);
            if (state == '1') {
                const result = await this.$http.post('/PassAudit', qs.stringify(this.AuditvideoList));
                console.log(666);
                console.log(result);
                if (result.status == 200) {
                    this.AuditDialogVisible = false;
                    this.$message.success("审核通过! ");
                    this.getVideoList();
                } else {
                    this.$message.success("审核失败! ");
                }
            } else {
                this.$message({ type: 'error', message: '您没有审核权限' });
            }

        },
    }
}

</script>

<style lang="less" scoped>
.box-card {
    margin-top: 15px;
}

.el-table {
    margin-top: 15px;
}

.avatar-uploader {
    border: 1px dashed #8c939d;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
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
    width: 178px;
    height: 178px;
    text-align: center;
}

.video {
    width: 100%;
}

.tablevideo {
    width: 80px;
}

.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
}
</style>