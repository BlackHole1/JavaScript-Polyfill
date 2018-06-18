if (!Array.from) {
  // 立刻执行函数，此函数将返回一个函数，而返回的函数才是真正的核心源码
  // 此处完全可以不用闭包，但是我个人觉得此方法也不错，把此功能里的函数提取出来，让返回的函授更加注重逻辑
  Array.from = (function () {
    /**
     * 判断是否为函数
     * @param {Function} fn 要检测的值
     * @returns {Boolean}
     */
    var isFun = function (fn) {
        // 之所以要判断两次，是因为在IE6/7/8中typeof运算符对BOM对象如window，document，location，history等对象的方法返回“object”，标准浏览器都返回“function”
        // 关于此问题，可以移步到此文章（中文）: http://www.cnblogs.com/snandy/archive/2011/03/18/1988263.html
      return typeof fn === 'function' || Object.prototype.toString.call(fn) === '[object Function]'
    }

    /**
     * 对数值进行取整
     * @param {Number} value 要取整的值
     * @returns {Number}
     */
    var toInteger = function (value) {
      // 先交给Number进行强转数值型。
      // Number强转后，结果只会有两种: 数值、Null
      var number = Number(value)

      // isNaN(undefined)将返回true
      // 而因为Number结果只会是数值和null，所以可以直接使用isNaN方法
      // 如果你在写代码时，推荐的写法是: isNan = val => val !== undefined && isNaN(val)
      if (isNaN(number)) {
        return 0
      }

      // 如果number等于0或者是无穷大时
      if (number === 0 || !isFinite(number)) {
        return number
      }

      // 此代码时整个函数的核心，取整
      // 可能有些人想到 x - x%1 方法。其实本人不推荐此方法，因为在一定程度上，%运算符是有一定的误差的
      // 而且此方法对JavaScript的-0无用。把-0代入上面的 x - x%1 公式，得到的结果是+0。显然不是我们要的结果
      // 下面的方法，可以准确无误的进行取整。多看几遍就明白了
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
    }

    // 最大安全整数
    var maxSafeInteger = Math.pow(2, 53) - 1

    /**
     * 对数值进行验证
     * @param {Number} value 要验证的值
     * @returns {Number}
     */
    var toLength = function (value) {
      // 代入上面的函数里，进行取整。
      // 其实可以直接 value >>> 0进行取整。就像map、forEach方法实现时的代码一样
      // 之所有没有进行替换，是因为我想着，如果这样写，可以让读者学到更多
      var len = toInteger(value)

      //如果是负数，则选择0，如果是负数，则与最大安全数比较，取最小值
      return Math.min(Math.max(len, 0), maxSafeInteger)
    }

    /**
     * from实现的核心代码
     * @param {array-link} arrayList 要转化的值
     * @returns {Array}
     */
    // 这里其实是接受三个参数的，但是这里只有一个，是因为ES规范 规定from参数长度只能是1。
    // 而后面两个参数，代码里将使用arguments来获取
    return function from (arrayList) {
      var item  // 存放Object强转后的数组对象
      var callback  // 回调函数
      var callbackSelf  // 回调函数的this指向
      var newArray  // 新数组
      var len // 数组长度
      var i = 0 // while循环变量初始值

      // 这里的相当于 (this === null || this === undefined)
      // 因为 null == undefined 结果返回的是true，这样就可以使用一个判断来代替两个判断了
      // 当使用操作数组为空时 或 [].forEach.call(null, cb) 的时候，下面的判断就会被触发。
      // [].forEach(cb) 这时的this是undefined, [].forEach.call(null, cb) 时this是null
      if (arrayList == null) {
        throw new TypeError('arrayList is null or undefined')
      }

      // 如果存在第二个参数(回调函数)
      if (arguments.length > 1) {
        callback = arguments[1]

        // 判断callback是否为函数
        if (!isFun(callback)) {
          throw new TypeError('callback in not function')
        }
      }

      // 当第二个参数有效时，再判断是否有第三个参数(回调函数的this指向)
      if (arguments.length > 2) {
        callbackSelf = arguments[2]
      }

      item = Object(arrayList)  // 对传入的array-like进行强转，统一类型，方便处理

      len = toLength(item.length) // 安全的取强转后对象的长度

      // 判断this是否为函数
      // 如果你是Array.from([1, 2, 3])等正常的使用，那么this指向是Array，它是一个函数，所以会跑到Object(new this(len))这里来
      // 也就是Object(new Array(len))，用来创建指定长度的数组对象
      // 如果你使用Array.from.call('abc', [1, 2, 3])，那这里的this就是'abc'，如果沿着上一条逻辑走，将会变成Object(new 'abc'(len))，就不符合预期了
      // 还有一种是你call的第一个参数是函数，那么也会走到Object(new this(len))中去，下面将示范一个例子：
      /**
       * function fn () {
       *  this.a = 1
       *  console.log('我来代替Array')
       * }
       * var newArr = Array.from.call(a, [1, 2, 3])
       * // => 我来代替Array
       * // => Object { 0: 1, 1: 2, 2: 3, a: 1, length: 3 } 
       */
      newArray = isFun(this) ? Object(new this(len)) : new Array(len)
      
      // 基于对象长度开始循环
      while (i < len) {
        // 是否存在回调函数
        if (callback) {
          // 先判断是否指定了第三个参数(回调函数的this指向)，如果有，则使用call来改变回调函数的this。如果没有则直接调用。
          newArray[i] = typeof callbackSelf === 'undefined' ? callback(item[i], i) : callback.call(callbackSelf, item[i], i)
        } else {
          // 如果没有回调函数，则直接赋值
          newArray[i] = item[i]
        }
        i++
      }

      // 为新数组对象增加length属性
      newArray.length = len

      return newArray
    }
  })()
}

if (false) {  // 无注释版本
  Array.from = (function () {
    var isFun = function (fn) {
      return typeof fn === 'function' || Object.prototype.toString.call(fn) === '[object Function]'
    }

    var toInteger = function (value) {
      var number = Number(value)
      if (isNaN(number)) {
        return 0
      }
      if (number === 0 || !isFinite(number)) {
        return number
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
    }

    var maxSafeInteger = Math.pow(2, 53) - 1

    var toLength = function (value) {
      var len = toInteger(value)
      return Math.min(Math.max(len, 0), maxSafeInteger)
    }

    return function from (arrayList) {
      var item
      var callback
      var callbackSelf
      var newArray
      var len
      var i = 0

      if (arrayList == null) {
        throw new TypeError('arrayList is null or undefined')
      }

      if (arguments.length > 1) {
        callback = arguments[1]
        if (!isFun(callback)) {
          throw new TypeError('callback in not function')
        }
      }

      if (arguments.length > 2) {
        callbackSelf = arguments[2]
      }

      item = Object(arrayList)
      len = toLength(item.length)
      newArray = isFun(this) ? Object(new this(len)) : new Array(len)
      
      while (i < len) {
        if (callback) {
          newArray[i] = typeof callbackSelf === 'undefined' ? callback(item[i], i) : callback.call(callbackSelf, item[i], i)
        } else {
          newArray[i] = item[i]
        }
        i++
      }

      newArray.length = len
      return newArray
    }
  })()
}