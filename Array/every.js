if (!Array.prototype.every) {
  /**
   * 测试数组的所有元素是否都通过了指定函数的测试
   * @param {Function} fn 回调函数
   * @param {Any} thisArg 回调函数的this(这里没有直接传参，函数内部使用arguments来进行捕获)
   * @returns {Boolean}
   */
  Array.prototype.every = function (fn) {
    var thisObj // 存放被强转Object后的对象
    var len // 存放数组对象的长度
    var thisArg // 回调函数里的this指向
    var i = 0 // 循环的初始值

    // 判断this是否为null或undefined
    if (this == null) {
      throw new TypeError('this is null or undefined')
    }

    // 判断回调函数是否为函数
    if (typeof fn !== 'function') {
      throw new TypeError(fn + 'not is Function type')
    }

    // 强转this为Object对象
    thisObj = Object(this)

    // 以安全的方式来获取数组对象的长度
    // 关于此段代码不太懂的，可以看下本项目的forEach.js里的注释。这里就不在阐述了。
    len = thisObj.length >>> 0

    // 获取第二个参数(回调函数的this指向)
    if (arguments.length > 1) {
      thisArg = arguments[1]
    }

    while (i < len) {
      // 这里的thisObj是对象，对象的i是数组的下标
      // 这里用if...in进行判断，是因为对象中间可能会发生断层的情况
      // 比如：
      /**
       * var arr = [1,,3,4]
       * var thisObj = Object(arr)
       */
      // 这里的1和3之间是有空白的地方，当转换成对象时，i将没有2这个值，所以可以通过if...in来避免这个错误
      if (i in thisObj) {
        // 把值交给回调函数进行操作，如果回调函数里有一个返回false，那么取反后就是true。那么every这个方法就将返回false
        if (!fn(thisArg, thisObj[i], i, thisObj)) {
          return false
        }
      }
 
      i++
    }
    // 若循环完成之后，回调函数没有返回false，那么将返回true
    return true
  }
}

if (false) {  // 无注释版本
  Array.prototype.every = function (fn) {
    var thisObj
    var len
    var thisArg
    var i = 0

    if (this == null) {
      throw new TypeError('this is null or undefined')
    }

    if (typeof fn !== 'function') {
      throw new TypeError(fn + 'not is Function type')
    }

    thisObj = Object(this)

    len = thisObj.length >>> 0

    if (arguments.length > 1) {
      thisArg = arguments[1]
    }

    while (i < len) {
      if (i in thisObj) {
        if (!fn(thisArg, thisObj[i], i, thisObj)) {
          return false
        }
      }
 
      i++
    }
    return true
  }
}