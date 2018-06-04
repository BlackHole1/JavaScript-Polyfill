if (!Array.prototype.forEach) {
  /**
   * forEach的Polyfill实现
   * @author Black-Hole 158blackhole#gmail.com
   * @param {Function} callback 为数组中每个元素执行的函数 (接收三个参数: 当前值、当前数组下标、当前正在操作的数组)
   * @param {Any} [thisArg] 回调函数的this值
   */
  Array.prototype.forEach = function (callback, thisArg) {
    var callbackSelf  // 回调函数的this指向
    var thisObj // 把this强转成Object对象
    var i = 0// while循环变量
    var len // 数组长度

    // 这里的相当于 (this === null || this === undefined)
    // 因为 null == undefined 结果返回的是true，这样就可以使用一个判断来代替两个判断了
    // 当使用 [].forEach(cb) 和 [].forEach.call(null, cb) 的时候，下面的判断就会被触发。
    // [].forEach(cb) 这时的this是undefined, [].forEach.call(null, cb) 时this是null
    if (this == null) {
      return new TypeError('this not defined')
    }

    if (typeof callback !== 'function') { // 判断回调函数是否为函数对象
      return new TypeError(callback + 'is not function')
    }

    // 把当前的this强转为Object对象。为了防止 [].forEach.call("abc", cb) 的写法而造成的错误
    thisObj = Object(this)

    // 如果没有指定回调函数的this指向，那就默认为thisObj
    // MDN上的实现方式在这一块有点问题，如下：
    /**
     * if (arguments.length > 1) {
     *  callbackSelf = thisArg;
     * }
     */
    //
    // 这里的实现方式，如果没有填写，或者填写null、undefined时，this指向将会指向全局
    // 在JS中，如果call或者apply或者bind的第一个this指向参数为null或undefined时
    // 那么函数内部的this指向将会是window或global(这里取决于你当前环境是在浏览器下还是Nodejs下)
    callbackSelf = thisArg || thisObj

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
      return new TypeError('this not defined')
    }
    if (typeof callback !== 'function') {
      return new TypeError(callback + 'is not function')
    }

    thisObj = Object(this)
    callbackSelf = thisArg || thisObj
    len = thisObj.length >>> 0

    while (i < len) {
      if (i in thisObj) {
        callback.call(callbackSelf, thisObj[i], i, thisObj)
      }
      i++
    }
  }
}