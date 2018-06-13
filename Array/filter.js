// some、every、filter、map、forEach其实是很相像的。他们的Polyfill实现也是十分相似
// some: 当数组中有一个元素在回调函数里返回true，那则返回true。只有当全部元素返回false，才返回false
// every: 当数组中有一个元素通过回调函数返回false，则返回false。只有当全部元素返回true，才返回true
// filter: 返回数组中满足条件的元素 (通过回调函数返回true的元素)
if (!Array.prototype.filter) {
  /**
   * 数组过滤
   * @param {Function} fn 回调函数
   * @param {Any} thisArg 回调函数的this(这里没有直接传参，函数内部使用arguments来进行捕获)
   * @returns {Array}
   */
  Array.prototype.filter = function (fn) {
    var thisObj // 存放被强转Object后的对象
    var len // 存放数组对象的长度
    var thisArg // 回调函数里的this指向
    var result = [] // 存放符合条件的元素
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
        // 把值交给回调函数进行操作，如果回调函数返回true，说明符合条件，则把当前元素push到新数组里
        if (fn.call(thisArg, thisObj[i], i, thisObj)) {
          result.push(thisObj[i])
        }
      }
 
      i++
    }

    // 循环后，返回符合条件元素所组成的数组
    return result
  }
}

if (false) {  // 无注释版本
  Array.prototype.filter = function (fn) {
    var thisObj
    var len
    var thisArg
    var result = []
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
        if (fn.call(thisArg, thisObj[i], i, thisObj)) {
          result.push(thisObj[i])
        }
      }
 
      i++
    }

    return result
  }
}