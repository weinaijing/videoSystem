import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http/axios'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import * as ElIconList from '@element-plus/icons-vue'


//svg 配置文件导入
import iconsSvg from './assets/icons/index'
axios.defaults.baseURL ='/api'

var app = createApp(App)

// 全局引入图标
for (const name in ElIconList) {
    app.component(name,ElIconList[name])
}
// 使用自定义图标
app.use(iconsSvg)

app.config.globalProperties.$http = axios

// 挂载全局的message
app.config.globalProperties.$message = ElementPlus.$message
app.config.globalProperties.$confirm = ElementPlus.$confirm

app.use(ElementPlus,{locale})
app.use(store)
app.use(router)
app.mount('#app')