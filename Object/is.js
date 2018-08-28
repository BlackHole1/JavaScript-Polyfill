if (!Object.is) {
  Object.prototype.is = function (x, y) {
    if (x === y) {
      // 判断是否为正负0
      return x !== 0 || 1 / x === 1 / y
    }
    // 判断是否为NaN
    return x !== x && y !== y
  }
}

if (false) {  // 无注释版本
  if (!Object.is) {
    Object.prototype.is = function (x, y) {
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y
      }
      return x !== x && y !== y
    }
  }
}
