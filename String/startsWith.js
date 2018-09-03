if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (search, len) {
    // 如果len不合法，则设置为0
    if (len === undefined || len > this.length) {
      len = 0;
    }

    // 使用substring函数截取开始的字符串，与search进行对比
    return this.substring(len, search.length) === search
  }
}

if (false) {  // 无注释版本
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (search, len) {
      if (len === undefined || len > this.length) {
        len = 0;
      }

      return this.substring(len, search.length) === search
    }
  }
}
