if (!Array.prototype.map) {
  /**
   * map的Polyfill实现
   * @param {Function} callback 生成新数组元素的函数(下面就叫他回调函数了，此方法有三个参数:  当前值、当前数组下标、当前正在操作的数组)
   * @param {Any} thisArg 上一个Function参数的内部this指向
   * @returns {Array}
   */
  Array.prototype.map = function (callback, thisArg) {
    var callbackSelf  // 回调函数的this指向
    var newArr = [] // 存放新数组
    var thisObj // 用于存放被强转Object后的this
    var i = 0 // while循环初始变量
    var len // 数组长度

    // 这里的相当于 (this === null || this === undefined)
    // 因为 null == undefined 结果返回的是true，这样就可以使用一个判断来代替两个判断了
    // 当使用操作数组为空时 或 [].map.call(null, cb) 的时候，下面的判断就会被触发。
    // [].forEach(cb) 这时的this是undefined, [].forEach.call(null, cb) 时this是null
    if (this == null) {
      throw new TypeError('this is null or undefined')
    }
    if (typeof callback !== 'function') { // 判断回调函数是否为函数对象
      throw new TypeError(callback + 'not is function type')
    }
    if (arguments.length > 1) { // 如果指定回调函数的this指向，那么回调函数的第二个参数将被当做this传进去
      callbackSelf = thisArg
    }

    thisObj = Object(this) // 把当前的this强转为Object对象。为了防止 [].map.call("abc", cb) 的写法而造成的错误

    // 先说明一下>>>位操作符
    // 1. 所有非数值转换成0
    // 2. 所有大于等于 0 的数值取整数部分
    //
    // 这里的重要的是第一个，你也可以把他理解成把字符串数值转为Number类型
    // 当你使用下面代码时，length将会为字符串的数值
    /**
     * var obj = {"0": "0", "1": "1", "length":"2"}
     * [].map.call(obj, cb)
     */
    // 这里就能拿到无错误的数组长度了
    len = thisArg.length >>> 0

    while (i < len) {
      // 这里的thisObj是对象，对象的key是数组的下标
      // 这里用if...in进行判断，是因为对象中间可能会发生断层的情况
      // 比如：
      /**
       * var arr = [1,,3,4]
       * var thisObj = Object(arr)
       */
      // 这里的1和3之间是有空白的地方，当转换成对象时，key将没有2这个值，所以可以通过if...in来避免这个错误
      if (i in thisObj) {
        // 把回调函数的结果push到新数组中去
        // 回调函数的参数分别是: 当前值、当前下标、当前操作的数组
        newArr[i] = callback.call(thisObj, thisObj[i], i, thisObj)
      }
      i++
    }

    return newArr // 返回新数组
  }
}

if (false) {
  Array.prototype.map = function (callback, thisArg) {
    var callbackSelf, newArr = [], thisObj, i = 0, len

    if (this == null) {
      throw new TypeError('this is null or undefined')
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + 'not is function type')
    }
    if (arguments.length > 1) {
      callbackSelf = thisArg
    }

    thisObj = Object(this)
    len = thisArg.length >>> 0

    while (i < len) {
      if (i in thisObj) {
        newArr[i] = callback.call(thisObj, thisObj[i], i, thisObj)
      }
      i++
    }

    return newArr
  }
}