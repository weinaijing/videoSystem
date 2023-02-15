<template>
    <div class="loginbg">
        <div id="login">
            <h2>登录or注册</h2>
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form"
                label-position="right" >
                <el-form-item label-width="0px" prop="username">
                    <el-input v-model="form.username" placeholder="请输入帐号" prefix-icon="User" />
                </el-form-item>
                <el-form-item label-width="0px" prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" prefix-icon="Lock" />
                </el-form-item>
                <el-form-item label-width="0px" prop="sendToEmail">
                    <el-input v-model="form.sendToEmail" placeholder="请输入邮箱" prefix-icon="Message" />
                </el-form-item>
                <el-form-item label-width="0px" prop="captcha">
                    <el-input v-model="form.captcha" placeholder="请输入验证码" prefix-icon="Connection" />
                    <el-button round @click="getCaptcha" class="captchaBtn">获取验证码</el-button>
                </el-form-item>

                <el-button round @click="login">登录</el-button>
                <el-button round @click="registeredDialogVisible = true">注册</el-button>
            </el-form>
        </div>
    </div>

    <!-- 注册 -->
    <el-dialog v-model="registeredDialogVisible" title="注册" width="350px" :before-close="handleClose">
        <el-form :model="registeredForm" label-width="120px" :rules="registeredFormRules" ref="addFormRef">
            <el-form-item label-width="0px" prop="username">
                <el-input v-model="registeredForm.username" placeholder="请输入帐号" prefix-icon="User" />
            </el-form-item>
            <el-form-item label-width="0px" prop="password">
                <el-input v-model="registeredForm.password" placeholder="请输入密码" prefix-icon="Lock" />
            </el-form-item>
            <el-form-item label-width="0px" prop="sendToEmail">
                <el-input v-model="registeredForm.sendToEmail" placeholder="请输入邮箱" prefix-icon="Message" />
            </el-form-item>
            <el-form-item label-width="0px" prop="captcha">
                <el-input v-model="registeredForm.captcha" placeholder="请输入验证码" prefix-icon="Connection" />
                <el-button round @click="getRegisteredCaptcha" class="captchaBtn">获取验证码</el-button>
            </el-form-item>
        </el-form>
        <span class="dialog-footer">
            <el-button type="" @click="registeredDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="registered">注册并登录</el-button>
        </span>
    </el-dialog>

</template>

<script>
// npm install svg-sprite-loader --save-dev
import qs from 'qs'
export default {
    data() {
        return {

            form: {
                username: 'admin',
                password: '123456',
                sendToEmail: "2680080659@qq.com",
                captcha: "请输入验证码",
                getcaptcha: ""
            },

            registeredDialogVisible: false,
            registeredForm: {
                username: '',
                password: '',
                sendToEmail: "",
                captcha: "",
                getcaptcha: ""
            },

            rules: {
                username: [
                    { required: true, message: '请输入帐号', trigger: 'blur' },
                    { min: 2, max: 11, message: '长度在2到11个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在3到12个字符', trigger: 'blur' }
                ],
                sendToEmail: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min: 6, max: 6, message: '需6位验证码', trigger: 'blur' }
                ],
            },
            registeredFormRules: {
                username: [
                    { required: true, message: '请输入帐号', trigger: 'blur' },
                    { min: 2, max: 11, message: '长度在2到11个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在3到12个字符', trigger: 'blur' }
                ],
                sendToEmail: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min: 6, max: 6, message: '需6位验证码', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        // 获取登录验证码
        async getCaptcha() {
            console.log(this.form.sendToEmail);
            const results = await this.$http.post('/sendEmail', qs.stringify(this.form));
            console.log(results);
            if (results.status == 200) {
                this.form.getcaptcha = results.data.Captcha
                console.log(this.form);
                this.$message.success("发送成功！")
            } else {
                this.$message.error("操作频繁")
            }
        },
        // 获取注册验证码
        async getRegisteredCaptcha() {
            console.log(this.form.sendToEmail);
            const results = await this.$http.post('/sendEmail', qs.stringify(this.registeredForm));
            console.log(results);
            if (results.status == 200) {
                this.registeredForm.getcaptcha = results.data.Captcha
                console.log(this.form);
                this.$message.success("发送成功！")
            } else {
                this.$message.error("操作频繁")
            }
 
        },
        // 登录
        async login() {

            if (this.form.getcaptcha != this.form.captcha) {
                this.$message.error("验证码错误 ")
            } else if (this.form.getcaptcha == this.form.captcha) {
                const results = await this.$http.post('/login', qs.stringify(this.form));
                console.log(results);
                console.log(results.data);
                if (results.status == 200 && results.data.code == "0000" && this.form.getcaptcha == this.form.captcha) {
                    localStorage.setItem("stu_token", JSON.stringify(results.data.token));
                    this.$router.push({ name: 'Admin' })
                    this.$message.success("登录成功! ")
                }
            } else {
                this.$message.error("登录失败! ")
            }
        },
        // 注册
        async registered() {
            console.log(this.registeredForm);
            if (this.registeredForm.getcaptcha != this.registeredForm.captcha) {
                this.$message.error("验证码错误 ")
            } else if (this.registeredForm.captcha == "") {
                this.$message.error("验证码不能为空 ")
            } else if (this.registeredForm.getcaptcha == this.registeredForm.captcha) {
                const results = await this.$http.post('/registered', qs.stringify(this.registeredForm));
                console.log(results);
                console.log(results.data);
                if (results.status == 200 && results.data.code == "0000") {
                    localStorage.setItem("stu_token", JSON.stringify(results.data.token));
                    this.$router.push({ name: 'Admin' })
                    this.$message.success("注册成功! ")
                }
            } else {
                this.$message.error("注册失败! ")
            }
        }
    }
}
</script>

<style lang="less" scoped>
.loginbg {
    position: absolute;
    width: 100%;
    height: 100%;
    // background-size: 100% 100%;
    background-image: url(../../public/admin/images/bg.jpg);
}

#login {
    position: relative;
    margin-top: 180px !important;
    width: 250px;
    height: 200px;
    margin: auto;

}

h2 {
    color: #fff;
    display: inline-block;
    margin-top: 15px;
}

.captchaBtn {
    position: absolute;
    right: 0;
    border-radius: 0px;
    // top: -5px;
    // margin-top: 10px;
}
</style>