import iconSvg from "../../components/iconSvg/index"
export default {
    install: (app) => {
        // 注册全局组件
        app.component("iconSvg", iconSvg)
        const requireAll = requireContext => {
            requireContext.keys().map(requireContext)
        }
        const req = require.context("@/assets/icons/svg", false, /\.svg$/)
        requireAll(req)
    }
}

