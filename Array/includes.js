if (Array.prototype.includes) {
  // 使用defineProperty方法来进行设置函数
  Object.prototype.defineProperty(Array.prototype, 'includes', {
    value: (function (){
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

      var isNan = function (value) {
        return isNan !== undefined && isNaN(value)
      }

      /**
       * 查看某个元素是否被包含
       * @param {Any} searchElement 要搜索的字符串
       * @param {Number} fromIndex 从何处下标开始
       * @returns {Boolean}
       */
      return function (searchElement, fromIndex) {
        var thisObj // 存放强转Object后的this对象
        var len // 要操作的数组对象长度
        var n = 0 // 从哪一出开始查找(默认为0)
        var i // while循环初始变量

        // 判断this是否为null或undefined
        if (this == null) {
          throw TypeError('this is not null or undefined')
        }

        // 把当前的this强转为Object对象，方便后面进行处理
        thisObj = Object(this)

        // 获取原始对象的长度
        len = toLength(thisObj.length)

        // 如果len等于0，说明没有要操作的数组对象，直接返回false
        if (len === 0) {
          return false
        }

        // 判断是否存在第二个参数，如果存在，则赋值到n变量上
        if (arguments.length > 1) {
          n = toInteger(fromIndex)
        }

        // 当n大于等于0时，取n。当n小于0时，则拿数组对象长度减去绝对值的n。
        // 比如，我的原始对象是[1,2,3,4,5]，我的n为-2。那就是5-2 = 3，那就从下标为3的4开始查找
        // 进一步说，就是-n，等同于: 查询最后的n位
        i = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

        // 开始循环判断，核心代码
        while (i < len) {
          // 判断是否相同
          if (thisObj[i] === searchElement) {
            return true
          }

          // 介于NaN不等于任何东西，则上面的判断无效
          // 判断两个值是否为NaN，如果都为NaN，则返回true
          if (isNan(thisObj) && isNan(searchElement)) {
            return true
          }
          i++
        }

        return false
      }
    })()
  })
}

if (false) {  // 无注释版本
  Object.prototype.defineProperty(Array.prototype, 'includes', {
    value: (function (){
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

      var isNan = function (value) {
        return isNan !== undefined && isNaN(value)
      }

      return function (searchElement, fromIndex) {
        var thisObj
        var len
        var n = 0
        var i

        if (this == null) {
          throw TypeError('this is not null or undefined')
        }

        thisObj = Object(this)
        len = toLength(thisObj.length)

        if (len === 0) {
          return false
        }
        if (arguments.length > 1) {
          n = toInteger(fromIndex)
        }

        i = Math.max(n >= 0 ? n : len - Math.abs(n), 0)
        while (i < len) {
          if (thisObj[i] === searchElement) {
            return true
          }

          if (isNan(thisObj) && isNan(searchElement)) {
            return true
          }
          i++
        }

        return false
      }
    })()
  })
}