(function () {
  var util = {
    REGEXP: {
      PHONE: /^(\+\d+)?1[3456789]\d{9}$/,
      IDCARD: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
    },

    /**
     * 是否为数字;
     * @param {*} *
     * @returns {Boolean}
     */
    isNumber: function (n) {
      var numjudge = isNaN(n);
      return !numjudge;
    },

    /**
     * @name 是否手机号码
     * @param { String | Number }
     * @returns { Boolean }
     */
    isPhoneNum: function (str) {
      return this.REGEXP.PHONE.test(str)
    },

    /**
     * 获得本地存储数据
     * @param  {String} key 存储关键词
     * @return {Object}
     */
    getLocalItem: function (key) {
      if (!key) {
        return null;
      }
      return JSON.parse(localStorage.getItem(key));
    },

    /**
     * 设置本地存储数据
     * @param  {String} key  存储关键词
     */
    setLocalItem: function (key, val) {
      localStorage.setItem(key, JSON.stringify(val));
    },

    /**
     * 删除本地存储数据
     * @param  {String} key 存储关键词
     * @return {Boolean} 是否删除成功
     */
    removeLocalItem: function (key) {      
      try {
        localStorage.removeItem(key)
        return true;
      } catch(e) {
        return false
      }
    },
  };









  window.$util = util;
})()