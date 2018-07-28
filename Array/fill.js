if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function (value) {
      if (this == null) {
        throw new TypeError('this is null or undefined');
      }

      // 最终的计算结果，以便让后面安全的循环
      var final = function (value) {
        var val = value >> 0;  // 取整
        return val < 0 ?
          Math.max(len + val, 0) :
          Math.min(val, len);
      };

      var thisObj = Object(this);  // 实例化this
      var len = thisObj.length >>> 0; // 获取长度

      var start = final(arguments[1]); // 获取开始值
      var end = final(arguments[2]); // 获取结束值

      // 循环start-end中的每一个值，并且把它赋值
      while (start < end) {
        thisObj[start] = value;
        start++;
      }

      return thisObj;
    }
  })
}


if (false) {  // 无注释版本
  if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
      value: function (value) {
        if (this == null) {
          throw new TypeError('this is null or undefined');
        }
        var final = function (value) {
          var val = value >> 0;
          return val < 0 ?
            Math.max(len + val, 0) :
            Math.min(val, len);
        };

        var thisObj = Object(this);
        var len = thisObj.length >>> 0;
        var start = final(arguments[1]);
        var end = final(arguments[2]);
        while (start < end) {
          thisObj[start] = value;
          start++;
        }
        return thisObj;
      }
    })
  }

}
