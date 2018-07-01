if (typeof Object.create !== 'function') {
  /**
   * 
   * @param {Object || Function || null} proto 创建对象的原型对象
   * @param {Objecy || null || undefined} propertiesObject // 作为到新创建对象上的可枚举属性
   */
  Object.create = function (proto, propertiesObject) {
    // proto可以是对象、函数、null。但是目前前端Polyfill无法实现一个真正的空对象(无__proto属性)
    if (typeof proto !== 'object' && typeof proto !== 'function' /* && proto !== null */) {
      throw new TypeError('Object prototype may only be an Object or Function or null')
    }

    // 把propertiesObject依次赋值到proto上，类似defineProperty第二个参数
    // 这里由于MDN没有写，这里也就没写了。
    //原理比较简单，循环propertiesObject，并通过defineProperty方法依次赋值到new F()上就好

    function F () {}
    F.prototype = proto
    return new F()
  }
}

if (false) {  // 无注释版本
  Object.create = function (proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function' /* && proto !== null */) {
      throw new TypeError('Object prototype may only be an Object or Function or null')
    }

    function F () {}
    F.prototype = proto
    return new F()
  }
}
