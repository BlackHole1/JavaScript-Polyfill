if (!Array.of) {
  /**
   * of核心代码
   * @returns {Array}
   */
  Array.of = function () {
    // 原理其实很简单，通过splice来把argument来转成数组就行了。
    // slice如果第一个参数没有就是0，第二个参数没有，就一直到结尾。然后把心数组返回出来，不会改变原数组
    // 根据这个特性，就可以实现把arguments转成数组了。只所以使用call，因为array-like是无法使用数组的方法
    return Array.prototype.slice.call(arguments)
  }
}

if (false) {  // 无注释版本
  Array.of = function () {
    return Array.prototype.slice.call(arguments)
  }
}