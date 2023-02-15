function byClassName(className, context) {
    // 默认在 document 文档中查找
    context = context || document;
    /* 支持使用 getElementsByClassName 方法，则直接使用 */
    if (context.getElementsByClassName){
        return context.getElementsByClassName(className);
    }
    /* 不支持使用 getElementsByClassName 方法 */
    var _result = [];
    // 将查询上下文后代中所有元素查找出来
    var _tags = context.getElementsByTagName("*");
    // 遍历迭代所有元素
    for (var i = 0, len = _tags.length; i < len; i++) {
        // 获取当前遍历到元素的所有类名
        var _classNames = _tags[i].className.split(" ");//将有多个类名同时存在时分割成新数组存入_classNames[] 数组中
        // 遍历所有类名
        for (var j = 0, l = _classNames.length; j < l; j++) {
            if (_classNames[j] === className) {
                _result.push(_tags[i]);
                break;
            }
        }
    }
    return _result;
}