if (!Object.keys) {
  Object.keys = (function () {
    // 用于检测属性是否存在，且不在原型链上。先赋值，方便后面使用
    var hasOwnProperty = Object.hasOwnProperty

    // 判断 ({toString: null}) 对象中是否存在可枚举的toString属性
    // IE低版本浏览器(低于8版本，可能包含8)，会返回fasle(取反前)，而标准浏览器会返回true(去饭钱)
    // 所以，如果是IE低版本浏览器，下面的代码将返回true，也就验证了存在此bug
    // 详情可以移步到: http://www.cnblogs.com/tarol/p/4350965.html
    var hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString')

    // 默认不可枚举属性
    var dontEnums = [
      'toString',
      'toLocalString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'constructor'
    ]
    dontEnumsLength = dontEnums.length

    /**
     * keys的核心源码部分
     * @param {Object} obj 要取keys的对象
     * @returns {Array}
     */
    return function (obj) {
      var keysList = [] // 存放keys数组
      var i = 0 // 下面循环的初始变量

      // 下面的判断可以使用 obj !== Object(obj) 来判断是否为对象
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) {
        throw new TypeError(obj + 'is not Object')
      }

      // 这段代码也是整个函数的核心代码
      for (var prop in obj) {
        // 因为for...in会遍历其原型链上的属性，所以需要使用 hasOwnProperty 来进行判断
        if (hasOwnProperty.call(obj, prop)) {
          keysList.push(prop) // 把key push到数组里
        }
      }

      // 判断是否存在重写不可枚举属性后，还是无法枚举的bug
      if (hasDontEnumBug) {
        // 基于默认不可枚举属性进行循环
        while (i < dontEnumsLength) {
          // 使用 hasOwnProperty 来判断是否重写默认不可枚举属性
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            return keysList.push(dontEnums[i])  // 把key push到数组里
          }
        }
      }
      return keysList
    }
  })()
}

if (false) {  // 无注释版本
  Object.keys = (function () {
    var hasOwnProperty = Object.hasOwnProperty
    var hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString')
    var dontEnums = [
      'toString',
      'toLocalString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'constructor'
    ]
    dontEnumsLength = dontEnums.length

    return function (obj) {
      var keysList = []
      var i = 0

      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) {
        throw new TypeError(obj + 'is not Object')
      }

      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          keysList.push(prop)
        }
      }

      if (hasDontEnumBug) {
        while (i < dontEnumsLength) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            return keysList.push(dontEnums[i])
          }
        }
      }
      return keysList
    }
  })()
}