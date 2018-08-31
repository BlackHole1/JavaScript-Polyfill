if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (search, len) {
    // 如果len不合法，则设置为字符串的长度
    if (len === undefined || len > this.length) {
      len = this.length
    }

    // 使用substring函数截取最后的字符串，与search进行对比
    return this.substring(len - search.length, len) === search
  }
}

if (false) {  // 无注释版本
  String.prototype.endsWith = function (search, len) {
    if (len === undefined || len > this.length) {
      len = this.length
    }
    return this.substring(len - search.length, len) === search
  }
}
