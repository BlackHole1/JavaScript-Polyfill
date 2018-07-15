// 此函数各个浏览器都已经实现，实现的主要的目的是为了修复IE9以下(不包括IE9)的异常行为。
(function () {
  // 为slice函数进行赋值，方便进行调用
  var _slice = Array.prototype.slice;
  try {
    // 在IE9以下的浏览器无法使用slice转化DOM元素集合，会报错。报错信息为: Array.prototype.slice: 'this' 不是 JavaScript 对象
    // 在非IE9以下的浏览器，则不会报错，返回一个空对象
    // 通过try...catch来判断当前是否为IE9以下的浏览器
    _slice.call(document.documentElement);
  } catch (e) {
    /**
     * 检测是否为数字类型
     * @param {Number} num 检测的字符
     * @returns {Boolean}
     */
    function isNumber (num) {
      return (typeof num === 'number' && num === num);
    }

    /**
     * 当前为IE9以下的浏览器slice函数的实现方法
     * @param {number} begin 从何处开始
     * @param {number} end 从何处结束
     * @returns {array} 返回所选的数组
     */
    Array.prototype.slice = function (begin, end) {
      // 获取当前对象的长度
      var len = this.length;
      // 设置所选的长度
      var size = 0; 
      // 所选的数组
      var cloned = [];
      // 设置循环的初始值
      var i = 0;

      // 判断end为null或者undefined时，设置end为当前的对象的长度
      // 同时修复 IE 中 slice() 方法第二个参数不允许为显式的 null/undefined 值的问题
      end = (end != null) ? end : len;

      // 如果当前对象为数组，则直接传给备份的slice方法
      // 只是增加了对end的处理，然后把其他值交给备份slice去操作、检测。
      // 这里没有必要把重复检测。
      if (Object.prototype.toString.call(this) === '[object Array]') {
        return _slice.call(this, begin, end);
      }

      // 如果begin的类型不是number，并且不为NaN(NaN不等于任何东西)，则设置为0
      begin = isNumber(begin) ? begin : 0;
      // 如果begin小于0，则从最后开始，并为了防止begin小于对象长度，使用Math.max来保险
      begin = (begin >= 0) ? begin : Math.max(0, len + begin);

      // 如果end为数字类型，则与当前对象长度进行比较，获取最小的
      // 如果不会数字类型，则为当前的对象长度。
      end = isNumber(end) ? Math.min(end, len) : len;
      // 如果end小于0，则长度加上负数的end，并与0进行比较，获取最大的值，防止len + end的值过小。
      end = (end < 0) ? Math.max(0, len + end) : end;

      // 获得最后所选的长度
      size = end - begin;

      // 判断是否大于0，防止开始end - begin的结果为负数
      if (size > 0) {
        // 设置长度为size变量值的数组
        cloned = new Array(size);

        // for循环有三个区间，第一个区间只会在开始的时候运行一次，用于赋值作用，但是我们之前已经赋值了，所以可以留空。
        for (;i < size; i++) {
          // 开始进行赋值。
          closed[i] = this[begin + i];
        }
      }
      return cloned;
    }
  }
})();

// 无注释版本
(function () {
  var _slice = Array.prototype.slice;
  try {
    _slice.call(document.documentElement);
  } catch (e) {
    function isNumber (num) {
      return (typeof num === 'number' && num === num);
    }

    Array.prototype.slice = function (begin, end) {
      var len = this.length;
      var size = 0; 
      var cloned = [];
      var i = 0;

      end = (end != null) ? end : len;

      if (Object.prototype.toString.call(this) === '[object Array]') {
        return _slice.call(this, begin, end);
      }

      begin = isNumber(begin) ? begin : 0;
      begin = (begin >= 0) ? begin : Math.max(0, len + begin);

      end = isNumber(end) ? Math.min(end, len) : len;
      end = (end < 0) ? Math.max(0, len + end) : end;

      size = end - begin;

      if (size > 0) {
        cloned = new Array(size);

        for (;i < size; i++) {
          closed[i] = this[begin + i];
        }
      }
      return cloned;
    }
  }
})();