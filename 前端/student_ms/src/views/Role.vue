<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">系统管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片布局 -->
        <el-card class="box-card">
            <!-- 搜索添加按钮区域 -->
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input v-model="queryObj.query" placeholder="请输入用户名" class="input-with-select">
                        <template #append>
                            <el-button icon="Search" @click="getUserList" />
                        </template>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="ShowaddDialogVisible()">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 表格数据区域 -->
            <el-table :data="UserList" border stripe>
                <el-table-column prop="username" label="用户姓名" />
                <!-- <el-table-column prop="password" label="用户密码" /> -->
                <el-table-column prop="role" label="角色名" />
                <el-table-column label="授权" width="180px">
                    <template #default="scope">
                        <el-switch v-model="scope.row.state" @change="userStateChanged(scope.row)" active-value="1"
                            inactive-value="0">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template #default="scope">
                        <el-button type="primary" icon="Edit" @click="showEditDialog(scope.row)"></el-button>
                        <el-button type="danger" icon="delete" @click="delStu(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleSizeChange" background
                layout="prev, pager, next" :total="total" :page-sizes="[3, 5, 10, 15, 20, 50]"
                :page-size="queryObj.limit" :current-page="queryObj.page" />
        </el-card>

        <!-- 添加用户 -->
        <el-dialog v-model="addDialogVisible" title="添加用户" width="50%" :before-close="handleClose">
            <span>
                <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addFormRef">
                    <el-form-item label="用户名" prop="stu_name">
                        <el-input v-model="addForm.username" />
                    </el-form-item>
                    <el-form-item label="密码" prop="stu_content">
                        <el-input v-model="addForm.password" />
                    </el-form-item>
                </el-form>
            </span>
            <span class="dialog-footer">
                <el-button type="" @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addUser">确定</el-button>
            </span>
        </el-dialog>

        <!-- 修改学生 -->
        <el-dialog v-model="editDialogVisible" title="修改用户" width="50%" :before-close="handleClose">
            <span>
                <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editFormRef">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="editForm.username" />
                    </el-form-item>
                    <el-form-item label="用户密码" prop="passwor">
                        <el-input v-model="editForm.password" />
                    </el-form-item>
                    <el-form-item label="角色名" prop="role">
                        <el-input v-model="editForm.role" />
                    </el-form-item>
                </el-form>
            </span>
            <span class="dialog-footer">
                <el-button type="" @click="editDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="updateUser()">确定</el-button>
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
                limit: 5,
                page: 1,
                query: ""
            },
            total: 0,
            UserList: [
                {
                    id: "1",
                    username: 'admin',
                    password: '123456',
                    role: '管理员',
                    state: ''
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
            // 修改的数据相关定义
            editDialogVisible: false,
            editForm: {
                id: 1,
                username: '',
                password: '',
                role: '0',
                state: '未分配',
            },
            //添加相关数据定义
            addDialogVisible: false,
            addForm: {
                username: "",
                password: '',
                state: '',
            },
        }
    },
    created() {
        this.getUserList();
    },

    methods: {
        // 获取用户列表的方法
        async getUserList() {
            const result = await this.$http.get('/getUserList', { params: this.queryObj });
            console.log(result);
            if (result.status == 200) {
                this.UserList = result.data.data;
                this.total = result.data.count;
            }
        },
        // 分页调用事件
        handleSizeChange(newPage) {
            this.queryObj.page = newPage;
            this.getUserList();
        },
        // 新增用户
        ShowaddDialogVisible() {
            let token = localStorage.getItem("stu_token");
            let state = JSON.parse(token).state
            console.log(state);
            if (state == '1') {
                this.addDialogVisible = true;
            } else {
                this.$message({ type: 'error', message: '您没有权限,请联系超级管理员' });
            }

        },
        // 修改页面
        // 获取单个用户信息,并渲染审核页面
        async showEditDialog(info) {
            let token = localStorage.getItem("stu_token");
            let state = JSON.parse(token).state
            console.log(state);
            if (state == '1') {
                console.log(info);
                this.editDialogVisible = true;
                // const result = await this.$http.get('/getStudent',{params: {id:info.id}});
                this.editForm = info;
            } else {
                this.$message({ type: 'error', message: '您没有权限,请联系超级管理员' });
            }

        },

        // 监听switch 开关状态的改变。
        async userStateChanged(userInfo) {
            let token = localStorage.getItem("stu_token");
            console.log(token);
            let state = JSON.parse(token).role
            console.log(state);
            console.log(userInfo.id, userInfo.state);
            if (state == "SPadmin") {
                if (userInfo.id != 1) {
                    const result = await this.$http.post('/userStateChanged', qs.stringify({ id: userInfo.id, state: userInfo.state }));
                    console.log(result);
                    if (result.status == 200) {
                        this.$message.success("授权成功! ");
                        // this.getUserList();

                    } else {
                        this.$message.success("授权失败! ");
                    }
                }
            } else {
                this.$message({ type: 'error', message: '您没有权限,请联系超级管理员' });
                this.getUserList();
            }


        },
        // 添加用户
        async addUser() {
            let token = localStorage.getItem("stu_token");
            console.log(token);
            let state = JSON.parse(token).role
            console.log(state);
            if (state == "SPadmin") {
                const result = await this.$http.post('/addUser', qs.stringify(this.addForm));
                console.log(666);
                console.log(result);
                if (result.status == 200) {
                    this.addDialogVisible = false;
                    this.getUserList();
                    this.$message.success("添加成功! ");
                } else {
                    this.$message.success("添加失败! ");
                }
            } else {
                this.$message({ type: 'error', message: '您没有添加用户权限' });

            }
        },
        //删除用户
        delStu(id) {
            let token = localStorage.getItem("stu_token");
            console.log(token);
            let state = JSON.parse(token).role
            console.log(state);
            if (state == "SPadmin") {
                //弹框询问用户是否删除数据
                this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const result = await this.$http.delete('/deleteUser/' + id);
                    console.log(result);
                    if (result.status !== 200) {
                        return this.$message.error('删除失败！');
                    } else if (result.status == 200 && result.data.code == "0000") {
                        this.$message({ type: 'success', message: '删除成功!' });
                        //重新获取用户列表数据
                        this.getUserList();
                    }
                })
            } else {
                this.$message({ type: 'error', message: '删除失败！您没有权限' });
            }

        },
        // 修改用户
        async updateUser() {
            let token = localStorage.getItem("stu_token");
            let state = JSON.parse(token).state
            console.log(state);
            if (state == 1) {
                console.log(this.editForm);
                const result = await this.$http.post('/updateUser', qs.stringify(this.editForm));
                console.log(result);
                if (result.status == 200) {
                    this.$message.success("修改成功! ");
                    this.editDialogVisible = false;
                    this.getUserList();

                } else {
                    this.$message.success("修改失败! ");
                }
            } else {
                this.$message({ type: 'error', message: '您没有修改用户权限' });
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
</style>