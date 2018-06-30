// 使用typeof判断assign是否为函数，如果不为函数则重新赋值
if (typeof Object.assign !== 'function') {
  // 使用defineProperty进行赋值，因为assign属性是不可遍历的，需要使用defineProperty里的enumerable属性来达到效果
  Object.defineProperty(Object, 'assign', {
    /**
     * 将所有可枚举属性的值从一个或多个源对象复制到目标对象
     * @param {Object} target 目标对象
     * @param {Object} varArgs 此参数不代表一个参数，而是代表多个参数，相当于ES6的...varArgs
     * @returns {Object}
     */
    // 需要注意的是，在原始实现中，assign是可以拷贝Symbol对象的，但是由于ES5没有Symbol对象，所以这里并没有实现
    value: function (target, varArgs) {
      var targetObj // 用于存放强转Object对象的target
      var currentArg // 当前参数
      var currentKey // 当前key属性
      var index // for循环下标

      // 判断target是否为null或undefined
      if (target == null) {
        throw new TypeError('cannot convert null or undefined to object type')
      }

      // 强转target
      targetObj = Object(target)

      // 循环arguments参数，从下标1开始
      for (index = 1; index < arguments.length; i++) {
        // 为当前的参数赋值
        currentArg = arguments[index]

        // 跳过当前参数为null或undefined的情况
        if (currentArg != null) {
          // 使用for...in来遍历当前参数对象的属性
          for (currentKey in currentArg) {
            // 判断是否为当前参数对象的属性，而不是其原型链的属性
            if (Object.prototype.hasOwnProperty.call(currentArg, currentKey)) {
              // 赋值操作
              targetObj = currentArg[currentKey]
            }
          }
        }
      }
      // 返回合并后的对象
      return targetObj
    },
    // 可写
    writable: true,
    // 可配置
    configurable: true,
    // writable、configurable、enumerable如果不写，默认就是false。所以这里的enumerable就是false，也就是不可枚举
    // enumerable: false
  })
}

if (false) {  // 无注释版本
  Object.defineProperty(Object, 'assign', {
    value: function (target, varArgs) {
      var targetObj
      var currentArg
      var currentKey
      var index

      if (target == null) {
        throw new TypeError('cannot convert null or undefined to object type')
      }

      targetObj = Object(target)

      for (index = 1; index < arguments.length; i++) {
        currentArg = arguments[index]

        if (currentArg != null) {
          for (currentKey in currentArg) {
            if (Object.prototype.hasOwnProperty.call(currentArg, currentKey)) {
              targetObj = currentArg[currentKey]
            }
          }
        }
      }
      return targetObj
    },
    writable: true,
    configurable: true
  })
}