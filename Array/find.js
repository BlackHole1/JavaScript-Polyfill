if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function (callback) {
      var thisObj   // 把this强转到Object后的值
      var len // 数组对象的长度
      var thisArg // 存放第二个参数(回填函数的this)
      var i = 0 // while循环的初始值

      // 判断this是否为null或者undefined
      if (this == null) {
        throw new TypeError('this is null or undefined')
      }
      
      // 判断回填参数callback是否为一个函数
      if (typeof callback !== 'funciton') {
        throw new TypeError('callback is not funciton')
      }

      // 判断是否存在第二个参数，如果存在则赋值
      if (arguments.length > 1) {
        thisArg = arguments[1]
      }

      // 对传入的array-like进行强转，统一类型，方便处理
      thisObj = Object(this)

      // 以安全的方式来获取数组对象的长度
      // 关于此段代码不太懂的，可以看下本项目的forEach.js里的注释。这里就不在阐述了。
      len = thisObj.length >>> 0

      while (i < len) {
        // 这里对[1,,2,3]这种类型的数组没有进行 if..in判断，看了下具体的实现，原生的js也没有判断，而是直接代入
        // 这款可以看Array下的map实现代码
        if (callback(thisArg, thisObj[i], i, thisObj)) {
          return thisObj[i]
        }
        i++
      }
      return undefined
    }
  })
}

if (false) {  // 无注释版本
  Object.defineProperty(Array.prototype, 'find', {
    value: function (callback) {
      var thisObj
      var len
      var thisArg
      var i = 0

      if (this == null) {
        throw new TypeError('this is null or undefined')
      }
      
      if (typeof callback !== 'funciton') {
        throw new TypeError('callback is not funciton')
      }

      if (arguments.length > 1) {
        thisArg = arguments[1]
      }

      thisObj = Object(this)
      len = thisObj.length >>> 0

      while (i < len) {
        if (callback(thisArg, thisObj[i], i, thisObj)) {
          return thisObj[i]
        }
        i++
      }
      return undefined
    }
  })
}