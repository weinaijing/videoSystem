<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">系统管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>普通用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片布局 -->
        <el-card class="box-card">
            <!-- 搜索添加按钮区域 -->
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input v-model="queryObj.query" placeholder="根据用户名查找" class="input-with-select">
                        <template #append>
                            <el-button icon="Search" @click="getStudentList" />
                        </template>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="ShowaddDialogVisible()">添加用户</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="danger" icon="delete" @click="delAll" style="margin-left:15px;">
                        一键删除
                    </el-button>
                </el-col>

            </el-row>
            <!-- 表格数据区域 -->
            <el-table :data="studentList" border stripe v-loading="listLoading"
                @selection-change="handleSelectionChange" @row-click="handleRowClick" ref="handSelectTest_multipleTable"
                row-key="id">
                <el-table-column type='selection' label="全选" width="55" :reserve-selection="true" />
                <el-table-column prop="stu_name" label="用户姓名" />
                <el-table-column prop="stu_img" label="用户头像">
                    <template #default="scope">
                        <el-avatar shape="square" :size="80" :fit="fit" :src="scope.row.stu_img" />
                    </template>
                </el-table-column>
                <el-table-column prop="stu_phone" label="用户号码" />
                <el-table-column prop="stu_sex" label="用户姓名" />
                <el-table-column prop="stu_content" label="用户简介">
                    
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template #default="scope">
                        <el-button type="primary" icon="Edit" @click="showEditDialog(scope.row)"></el-button>
                        <el-button type="danger" icon="delete" @click="delStu(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleSizeChange" background
                layout="prev, pager, next" :total="total" :page-sizes="[3, 5, 10, 15, 20, 50]"
                :page-size="queryObj.limit" :current-page="queryObj.page" />
        </el-card>
        <!-- 添加用户 -->
        <el-dialog v-model="addDialogVisible" title="添加用户" width="50%" :before-close="handleClose">
            <span>
                <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addFormRef">
                    <el-form-item label="用户姓名" prop="stu_name">
                        <el-input v-model="addForm.stu_name" />
                    </el-form-item>
                    <el-form-item label="用户头像" prop="stu_img">
                        <!-- <el-input v-model="addForm.stu_img" /> -->

                        <el-upload class="avatar-uploader" action="/api/upload" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="addForm.stu_img" :src="addForm.stu_img" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="用户电话" prop="stu_phone">
                        <el-input v-model="addForm.stu_phone" />
                    </el-form-item>
                    <el-form-item label="用户性别" prop="stu_sex">
                        <el-input v-model="addForm.stu_sex" />
                    </el-form-item>
                    <el-form-item label="用户简介" prop="stu_content">
                        <Editor v-model="addForm.stu_content" placeholder="请输入简介" @change="handleContentChange"></Editor>
                    </el-form-item>
                </el-form>
            </span>
            <span class="dialog-footer">
                <el-button type="" @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addStudent">确定</el-button>
            </span>
        </el-dialog>


        <!-- 修改学生 -->
        <el-dialog v-model="editDialogVisible" title="修改用户" width="50%" :before-close="handleClose">
            <span>
                <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editFormRef">
                    <el-form-item label="用户姓名" prop="stu_name">
                        <el-input v-model="editForm.stu_name" />
                    </el-form-item>
                    <el-form-item label="用户头像" prop="stu_img">
                        <!-- <el-input v-model="editForm.stu_img" /> -->
                        <el-upload class="avatar-uploader" action="/api/upload" :show-file-list="false"
                            :on-success="updatehandleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="editForm.stu_img" :src="editForm.stu_img" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="用户电话" prop="stu_phone">
                        <el-input v-model="editForm.stu_phone" />
                    </el-form-item>
                    <el-form-item label="用户性别" prop="stu_sex">
                        <el-input v-model="editForm.stu_sex" />
                    </el-form-item>
                    <el-form-item label="用户简介" prop="stu_content">
                        <!-- <el-input v-model="editForm.stu_content" /> -->
                        <Editor v-model="editForm.stu_content" placeholder="请输入简介" @change="handleContentChange"></Editor>
                    </el-form-item>
                </el-form>
            </span>
            <span class="dialog-footer">
                <el-button type="" @click="editDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="updateStudent()">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import qs from "qs"
import Editor from "../components/Editor/Editor.vue"
export default {
    components:{
        Editor
    },
    data() {
        return {
            queryObj: {
                limit: 4,
                page: 1,
                query: ""
            },
            total: 0,
            checked: false,
            checkedData: [],
            studentList: [
                {
                    stu_name: '',
                    stu_img: '',
                    stu_phone: '',
                    stu_sex: '',
                    stu_content: ''
                }
            ],
            //添加相关数据定义
            addDialogVisible: false,
            addForm: {
                stu_name: "",
                stu_img: '',
                stu_phone: '',
                stu_sex: '',
                stu_content: ''
            },

            editFormRules: {
                addDialogVisible: false,
                stu_name: [
                    { required: true, message: "请输入帐号", "trigger": "blur" },
                    { min: 2, max: 11, message: "请输入长度在2到11额字符", "trigger": "blur" },
                ],
                stu_phone: [
                    { required: true, message: "请输入电话号码", "trigger": "blur" },
                    { min: 6, max: 12, message: "请输入长度在6到12额字符", "trigger": "blur" },
                ]
            },
            // 修改的数据相关定义
            editDialogVisible: false,
            editForm: {
                id: 0,
                stu_name: '',
                stu_img: '',
                stu_phone: '',
                stu_sex: '',
                stu_content: ''
            },
            eidtFormRules: {
                stu_name: [
                    { required: true, message: "请输入帐号", "trigger": "blur" },
                    { min: 2, max: 11, message: "请输入长度在2到11额字符", "trigger": "blur" },
                ],
                stu_phone: [
                    { required: true, message: "请输入电话号码", "trigger": "blur" },
                    { min: 6, max: 12, message: "请输入长度在6到12额字符", "trigger": "blur" },
                ]
            }

        }
    },
    created() {
        this.getStudentList();
    },
    methods: {
        handleContentChange(dd){
            this.addForm.stu_content = dd
        },
        // 获取用户列表的方法
        async getStudentList() {
            const result = await this.$http.get('/getStudents', { params: this.queryObj });
            console.log(result);
            if (result.status == 200 && result.data.code == "0000") {
                this.studentList = result.data.data;
                this.total = result.data.count;
            }
        },
        // 分页调用事件
        handleSizeChange(newPage) {
            this.queryObj.page = newPage;
            this.getStudentList();
        },
        ShowaddDialogVisible() {
            let token = localStorage.getItem("stu_token");
            let state = JSON.parse(token).state
            console.log(state);
            if (state == '1') {
                this.addDialogVisible = true
            } else {
                this.$message({ type: 'error', message: '您没有添加用户权限' });
            }
        },
        // 添加学生
        async addStudent() {
            let token = localStorage.getItem("stu_token");
            let state = JSON.parse(token).state
            console.log(state);
            if (state == '1') {
                const result = await this.$http.post('/addStudent', qs.stringify(this.addForm));
                console.log(666);
                console.log(result);
                if (result.status == 200) {
                    this.addDialogVisible = false;
                    this.getStudentList();
                    this.$message.success("添加成功! ");
                } else {
                    this.$message.error("添加失败! ");
                }
            } else {
                this.$message({ type: 'error', message: '您没有添加用户权限' });

            }
        },
        // 上传头像相关方法
        handleAvatarSuccess(uploadFile) {
            console.log(123);
            console.log(uploadFile);
            this.addForm.stu_img = uploadFile.src;
            // imageUrl.value = URL.createObjectURL("");
        },
        updatehandleAvatarSuccess(uploadFile) {
            console.log(123);
            console.log(uploadFile);
            this.editForm.stu_img = uploadFile.src;
            // imageUrl.value = URL.createObjectURL("");
        },
        beforeAvatarUpload(rawFile) {
            console.log(444);
            if (rawFile.type !== 'image/jpeg') {
                this.$message.error('图片格式不正确!')
                return false
            } else if (rawFile.size / 1024 / 1024 > 2) {
                this.$message.error('图片太大了!')
                return false
            }
            return true
        },

        //获取单个学生信息,并渲染修改页面
        async showEditDialog(info) {
            console.log(info);
            let token = localStorage.getItem("stu_token");
            let state = JSON.parse(token).state
            console.log(state);
            if (state == '1') {
                this.editDialogVisible = true;
                this.editForm = info;
            } else {
                this.$message({ type: 'error', message: '您没有修改用户权限' });
            }
        },

        // 修改学生
        async updateStudent() {
            let token = localStorage.getItem("stu_token");
            let state = JSON.parse(token).state
            console.log(state);
            if (state == 1) {
                console.log(this.editForm);
                const result = await this.$http.post('/updateStudent', qs.stringify(this.editForm));
                console.log(result);
                if (result.status == 200) {
                    this.$message.success("修改成功! ");
                    this.editDialogVisible = false;
                    this.getStudentList();

                } else {
                    this.$message.success("修改失败! ");
                }
            } else {
                this.$message({ type: 'error', message: '您没有修改用户权限' });
            }

        },

        // 删除用户
        delStu(id) {
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
                    const result = await this.$http.delete('/deleteStudent/' + id);
                    console.log(result);
                    if (result.status !== 200) {
                        return this.$message.error('删除失败！');
                    } else if (result.status == 200 && result.data.code == "0000") {
                        this.$message({ type: 'success', message: '删除成功!' });
                        //重新获取用户列表数据
                        this.getStudentList();
                    }
                }).catch(() => {
                    // this.$message({ type: 'info', message: '已取消删除' });
                });
            } else {
                this.$message({ type: 'error', message: '您没有删除权限' });
            }
        },
        // 批量删除用户
        //点击复选框触发，复选框样式的改变
        handleSelectionChange(val) {
            console.log(val)  //打印选中的行集合
            this.multipleSelection = val;
        },
        //点击行触发，选中或不选中复选框
        handleRowClick(row, column, event) {
            // this.$refs.handSelectTest_multipleTable.toggleRowSelection(row);
            // console.log(row)  //打印的时当前选中的行
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
                    console.log(arr);
                    const result = await this.$http.delete('/deleteStudents/' + arr);
                    console.log(result);
                    if (result.status !== 200) {
                        return this.$message.error('删除失败！');
                    } else if (result.status == 200 && result.data.code == "0000") {
                        this.$message({ type: 'success', message: '删除成功!' });
                        //重新获取用户列表数据
                        this.getStudentList();
                    }
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消删除' });
                });
            } else {
                this.$message({ type: 'error', message: '您没有删除权限' });
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
</style>