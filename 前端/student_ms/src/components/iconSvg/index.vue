<template>
    <svg :class="svgclass" aria-hidden="true">
        <use :xlink:herf="iconName" :fill="iconColor" />
    </svg>
</template>

<script>
export default {
    name: "svgIcon",
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ""
        },
        iconColor: {
            type: String,
            default: ""
        }
    },
    computed: {
        iconName(){
            return `#icon-${this.iconClass}`;
        },
        svgClass() {
            if(this.className) {
                return "svg-icon" + this.className; // 自定义样式
            }else{
                return "svg-icon";  // 默认样式
            }
        }
    }
}
</script>

<style lang="less" scoped>
.svg-icon {
    width: 16px;
    height: 16px;
    vertical-align: 0.15em;
    fill: currentColor;
    overflow:hidden;
    margin-right: 10px;
}
</style>