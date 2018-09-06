if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    // 如果start不是数字
    if (typeof start !== 'number') {
      start = 0
    }

    // 当开始位置加上搜索字符串的长度，大于本身字符串的长度，则直接返回false
    if (start + search.length > this.length) {
      return false
    } else {
      // 调用indexOf的方法进行搜索
      return this.indexOf(search, start) !== -1
    }
  }
}

if (false) {  // 无注释版本
  if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
      if (typeof start !== 'number') {
        start = 0
      }

      if (start + search.length > this.length) {
        return false
      } else {
        return this.indexOf(search, start) !== -1
      }
    }
  }
}
