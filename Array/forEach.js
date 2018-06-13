// some、every、filter、map、forEach其实是很相像的。他们的Polyfill实现也是十分相似
// some: 当数组中有一个元素在回调函数里返回true，那则返回true。只有当全部元素返回false，才返回false
// every: 当数组中有一个元素通过回调函数返回false，则返回false。只有当全部元素返回true，才返回true
// filter: 返回数组中满足条件的元素 (通过回调函数返回true的元素)
if (!Array.prototype.forEach) {
  /**
   * forEach的Polyfill实现
   * @author Black-Hole 158blackhole#gmail.com
   * @param {Function} callback 为数组中每个元素执行的函数 (接收三个参数: 当前值、当前数组下标、当前正在操作的数组)
   * @param {Any} [thisArg] 回调函数的this值
   * @returns {Array}
   */
  Array.prototype.forEach = function (callback, thisArg) {
    var callbackSelf  // 回调函数的this指向
    var thisObj // 把this强转成Object对象
    var i = 0// while循环变量
    var len // 数组长度

    // 这里的相当于 (this === null || this === undefined)
    // 因为 null == undefined 结果返回的是true，这样就可以使用一个判断来代替两个判断了
    // 当使用操作数组为空时 或 [].forEach.call(null, cb) 的时候，下面的判断就会被触发。
    // [].forEach(cb) 这时的this是undefined, [].forEach.call(null, cb) 时this是null
    if (this == null) {
      throw new TypeError('this not defined')
    }
    
    // 判断回调函数是否为函数对象
    if (typeof callback !== 'function') {
      throw new TypeError(callback + 'is not function')
    }

    // 如果指定回调函数的this指向，那么回调函数的第二个参数将被当做this传进去
    if (arguments.length > 1) {
      callbackSelf = thisArg;
    }

    // 把当前的this强转为Object对象。为了防止 [].forEach.call("abc", cb) 的写法而造成的错误
    thisObj = Object(this)

    // 先说明一下>>>位操作符
    // 1. 所有非数值转换成0
    // 2. 所有大于等于 0 的数值取整数部分
    //
    // 这里的重要的是第一个，你也可以把他理解成把字符串数值转为Number类型
    // 当你使用下面代码时，length将会为字符串的数值
    /**
     * var obj = {"0": "0", "1": "1", "length":"2"}
     * [].forEach.call(obj, cb)
     */
    // 这里就能拿到无错误的数组长度了
    len = thisObj.length >>> 0

    while (i < len) { // 循环数组
      // 这里的thisObj是对象，对象的key是数组的下标
      // 这里用if...in进行判断，是因为对象中间可能会发生断层的情况
      // 比如：
      /**
       * var arr = [1,,3,4]
       * var thisObj = Object(arr)
       */
      // 这里的1和3之间是有空白的地方，当转换成对象时，key将没有2这个值，所以可以通过if...in来避免这个错误
      if (i in thisObj) {
        // 回调函数的参数分别是: 当前值、当前下标、当前操作的数组
        callback.call(callbackSelf, thisObj[i], i, thisObj)
      }
      i++
    }
  }
}

if (false) {  // 无注释版本
  Array.prototype.forEach = function (callback, thisArg) {
    var callbackSelf, thisObj, i = 0, len

    if (this == null) {
      throw new TypeError('this not defined')
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + 'is not function')
    }
    if (arguments.length > 1) {
      callbackSelf = thisArg;
    }

    thisObj = Object(this)
    len = thisObj.length >>> 0

    while (i < len) {
      if (i in thisObj) {
        callback.call(callbackSelf, thisObj[i], i, thisObj)
      }
      i++
    }
  }
}