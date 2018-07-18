if (!Array.isArray) {
  /**
   * 判断是否为数组
   * @param {Array-Like} arg 要判断是否为数组的参数
   * @returns {Boolean}
   */
  // 因 Array.isArray.length 返回的是1，所以可以得出此函数是只有一个参数，而非使用arguments来进行获取的
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
}

if (false) {  // 无注释版本
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
}