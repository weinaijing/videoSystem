<template>
    <div ref="editor"></div>
</template>
  
<script>
import E from 'wangeditor';
import uploadImage from './upload-image.js';

/**
 * wangEditor 编辑器
 * 文档 https://doc.wangeditor.com/
 */
export default {
    name: 'Editor',

    props: {
        // v-model
       value: { type: String, required: true },

        // placeholder
        placeholder: { type: String, default: '' },

        // height | String
       height: { type: Number , default: '' }
    },

    model: {
        prop: 'value',
        event: 'change',
    },

    data() {
        return {
            editor: null,
        };
    },

    watch: {
        // 不能用箭头函数
        value(val) {
            // 如果值不相等再进行赋值，避免多次赋值造成闪烁
            if (this.editor && val !== this.editor.txt.html()) {
                this.editor.txt.html(val);
            }
        },
    },

    methods: {
        initEditor() {
            const editor = new E(this.$refs.editor);
            editor.config.placeholder = this.placeholder;
            editor.config.height = this.height;

             // 隐藏“网络图片”tab
      editor.config.showLinkImg = false;
            // 限制类型
            // editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
            editor.config.uploadImgMaxLength = 1; // 一次最多上传 1 个图片

            // 配置菜单栏，删减菜单，调整顺序
            editor.config.menus = [
                'undo', // 撤销
                'redo', // 重复
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'indent', // 缩进
                'lineHeight', // 行高
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'todo', // 待办
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon',
                'image', // 插入图片
                'video', // 视频
                'table',  // 表格
                'code',  // 插入代码
                'splitLine', // 分割线
            ];

            // 监听数据变化
            editor.config.onchange = this.handleContentChange;
            // 自己实现上传图片
            editor.config.customUploadImg = this.handleUploadImage;
            editor.config.customUploadVideo = function (resultFiles, insertVideoFn) {
                // resultFiles 是 input 中选中的文件列表
                // insertVideoFn 是获取视频 url 后，插入到编辑器的方法

                // 上传视频，返回结果，将视频地址插入到编辑器中
                insertVideoFn(videoUrl)
            }

            // 创建编辑器
            editor.create();
            // 赋予初始值
            editor.txt.html(this.value);

            this.editor = editor;
        },

        handleContentChange(newHtml) {
            this.$emit('change', newHtml);
        },

        /**
         * resultFiles 是 input 中选中的文件列表
         * insertImgFn 是获取图片 url 后，插入到编辑器的方法
         */
        async handleUploadImage(resultFiles, insertImgFn) {
            console.log("图片上传！");
            const imgUrl = await uploadImage(resultFiles[0]);
            console.log(imgUrl);
            // 上传图片，返回结果，将图片插入到编辑器中
            insertImgFn(imgUrl.src);
        },
       

    },

    mounted() {
        // 初始化
        this.initEditor();
    },

    beforeDestroy() {
        // 调用销毁 API 对当前编辑器实例进行销毁
        this.editor.destroy();
        this.editor = null;
    },
};
</script>
  
  
<style lang="less">
// 工具栏icon
.w-e-toolbar .w-e-menu {
    width: 30px;
    height: 30px;
    font-size: 12px;
}

// 工具栏提示文字
.w-e-menu-tooltip {
    font-size: 12px;
}

// 工具栏边框
.w-e-toolbar {
    border: 1px solid #dcdfe6 !important;
    border-bottom: none !important;
}

// 编辑区域边框
.w-e-text-container {
    border: 1px solid #dcdfe6 !important;
}

// 默认提示文字
.w-e-text-container .placeholder {
    font-size: 12px;
    color: #c1c5cd;
}

// 上传按钮
.w-e-menu .w-e-panel-container .w-e-up-img-container .w-e-up-btn {
    width: 100%;
    height: 64px;
    line-height: 64px;
    font-size: 24px;
}
</style>