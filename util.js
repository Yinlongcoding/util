(function () {
  var util = {
    REGEXP: {
      PHONE: /^(\+\d+)?1[3456789]\d{9}$/,
      IDCARD: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
    },

    type: function (obj) {
      var class2type = {};
      "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function (e, i) {
        class2type["[object " + e + "]"] = e.toLowerCase();
      });
      if (obj == null) {
        return String(obj);
      }
      return typeof obj === "object" || typeof obj === "function" ?
        class2type[class2type.toString.call(obj)] || "object" :
        typeof obj;
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
      } catch (e) {
        return false
      }
    },

    /**
     * 获得本地存储数据
     * @param  {String} key       存储关键词
     * @return {Object}
     */
    getSessionItem: function (key) {
      if (!key) {
        return null
      }
      return sessionStorage.getItem(key);
    },

    /**
     * 设置本地存储数据
     * @param  {String} key       存储关键词
     * @param {void}
     */
    setSessionItem: function (key, data) {
      sessionStorage.setItem(key, JSON.stringify(data));
    },

    /**
     * 删除本地存储数据
     * @param  {String} key       存储关键词
     * @return {void}
     */
    removeSessionItem: function (key) {
      try {
        sessionStorage.removeItem(key);
        return true;
      } catch (e) {
        return false;
      }
    },

    /**
     * 按名称读取cookie值
     * @param  {String} name cookie名
     * @return {void}
     */
    getCookie: function (name) {
      var cookieValue = "";
      var search = name + "=";
      if (document.cookie.length > 0) {
        var offset = document.cookie.indexOf(search);
        if (offset != -1) {
          offset += search.length;
          var end = document.cookie.indexOf(";", offset);
          if (end == -1) {
            end = document.cookie.length;
          }
          cookieValue = decodeURIComponent(document.cookie.substring(offset, end))
        }
      }

      /**
       * Parse JSON cookie string.
       *
       * @param {String} str
       * @return {Object} Parsed object or undefined if not json cookie
       * @public
       */
      function JSONCookie(str) {
        if (typeof str !== 'string' || str.substr(0, 2) !== 'j:') {
          return str;
        }
        try {
          return JSON.parse(str.slice(2));
        } catch (err) {
          return str;
        }
      }
      return JSONCookie(cookieValue);
    },

    /**
     * 写cookie
     * @param  {String} name       cookie名
     * @param  {All} value
     * @param  {Integer} storeTime  有效期（单位：分钟）
     * @return {void}
     */
    setCookie: function (name, value, storeTime) {
      //storeTime = storeTime || 60 * 24 * 30; //如果不传，默认一个月
      var exdate = new Date();
      exdate = exdate.getTime() + storeTime * 60 * 1000;
      exdate = (new Date(exdate)).toGMTString();

      //object类型的处理下结果
      if (typeof value === 'object') {
        value = "j:" + JSON.stringify(value);
      }

      // 使设置的有效时间正确。增加toGMTString()
      document.cookie = name + "=" + encodeURIComponent(value) + ((storeTime == null) ? "" : ";expires=" + (new Date(exdate)).toGMTString()) + ";path=/";
    },

    /**
     * 删除cookie
     * @param  {String} name cookie名
     * @return {void}
     */
    removeCookie: function (name) {
      return this.setCookie(name, "", -1);
    },

    /**
     * 生成唯一识别码
     * @return {String} 识别码
     */
    getGuid: function () {
      var guid = '';
      for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
          guid += '-';
        }
      }
      return guid;
    },

    /*
    * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
    * @param fn {function}  需要调用的函数
    * @param delay  {number}    延迟时间，单位毫秒
    * @param mustRunDelay  {bool} 是否延迟执行，给mustRunDelay参数传递false 绑定的函数先执行，而不是delay后后执行。
    * @return {function}实际调用函数
    */
    throttle: function (fn, delay, mustRunDelay, debounce) {
      var curr = +new Date(), //当前事件
        last_call = 0,
        last_exec = 0,
        timer = null,
        diff, //时间差
        context, //上下文
        args,
        exec = function () {
          last_exec = curr;
          fn.apply(context, args);
        };

      if (mustRunDelay == undefined) {
        mustRunDelay = true;
      }
      return function () {
        curr = +new Date();
        context = this,
          args = arguments,
          diff = curr - (debounce ? last_call : last_exec) - delay;
        clearTimeout(timer);
        if (debounce) {
          if (mustRunDelay) {
            timer = setTimeout(exec, delay);
          } else if (diff >= 0) {
            exec();
          }
        } else {
          if (diff >= 0) {
            exec();
          } else if (mustRunDelay) {
            timer = setTimeout(exec, -diff);
          }
        }
        last_call = curr;
      }
    },

    /**
     * 将时间转换成指定格式。
     *
     * @param {String|Date|Number} sDateTime
     * @param {String} sFormat 格式化字符串
     * @return {Date}
     */
    formatDate: function (sDateTime, sFormat) {
      if (!sDateTime) {
        return "";
      }
      var dDate = null,
        sDateType = this.type(sDateTime);
      if (sDateType === "date") { // 日期对象。
        dDate = sDateTime;
      } else if (sDateType === "number") { // 毫秒值类型。
        dDate = new Date(Number(sDateTime));
      } else if (sDateType === "string") { // 字数串类型。
        // replace(/[-.]/g, "/") 必须有，为了处理wechat 兼容性问题
        dDate = new Date(sDateTime.replace(/[-.]/g, "/"));
      }

      var oFormat = {
        "M+": dDate.getMonth() + 1, //月份
        "d+": dDate.getDate(), //日
        "h+": dDate.getHours() % 12 == 0 ? 12 : dDate.getHours() % 12, //小时
        "H+": dDate.getHours(), //小时
        "m+": dDate.getMinutes(), //分
        "s+": dDate.getSeconds(), //秒
        "q+": Math.floor((dDate.getMonth() + 3) / 3), //季度
        "S": dDate.getMilliseconds() //毫秒
      };
      var oWeek = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
      };
      if (/(y+)/.test(sFormat)) {
        sFormat = sFormat.replace(RegExp.$1, (dDate.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      if (/(E+)/.test(sFormat)) {
        sFormat = sFormat.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + oWeek[this.getDay() + ""]);
      }
      for (var k in oFormat) {
        if (new RegExp("(" + k + ")").test(sFormat)) {
          sFormat = sFormat.replace(RegExp.$1, (RegExp.$1.length == 1) ? (oFormat[k]) : (("00" + oFormat[k]).substr(("" + oFormat[k]).length)));
        }
      }
      return sFormat;
    },


    /*
     * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
     * @param fn {function}  要调用的函数
     * @param delay   {number}    空闲时间
     * @param mustRunDelay  {bool} 是否延迟执行，给mustRunDelay参数传递false 绑定的函数先执行，而不是delay后后执行。
     * @return {function}实际调用函数
     */
    debounce: function (fn, delay, mustRunDelay) {
      return Util.throttle(fn, delay, mustRunDelay, true);
    },

    /**
     * 是否微信浏览器;
     * 其他浏览器等待做处理
     */
    isWechat: function () {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 是否是移动端
     * Admin项目并不想在移动展示
     */
    isMobile: function () {
      var ua = window.navigator.userAgent.toLowerCase();
      return /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(ua);
    },

    /**
     * App端保留方法;
     * 为了处理webApp头部导航栏的高度问题
     */
    getNavHeight: function () {
      var isInApp = false;
      var ua = window.navigator.userAgent.toLowerCase();
      if (isInApp) {
        if (/iphone/gi.test(ua)) {
          if (Math.floor(screen.height * 100 / screen.width) == 216 && screen.height > screen.width) {
            return 88;
          } else {
            return 64;
          }
        } else {
          return 44;
        }
      } else {
        return 0
      }

    },
    /**
     * 深拷贝
     * @param {*} Obj 
     */
    deepClone: function (Obj) {
      var buf;
      if (Obj instanceof Array) {
        buf = []; //创建一个空的数组
        var i = Obj.length;
        while (i--) {
          buf[i] = this.deepClone(Obj[i]);
        }
        return buf;
      } else if (Obj instanceof Object) {
        buf = {}; //创建一个空对象
        for (var k in Obj) { //为这个对象添加新的属性
          buf[k] = this.deepClone(Obj[k]);
        }
        return buf;
      } else {
        return Obj;
      }
    },

    /**
     * 数字保留小数方案 -- 直接截取，不向下取整
     * @param {*} value 
     * @param {*} _currency 
     * @param {*} decimals 
     * @exp fixed(123.23785, '$', 3) => '$123.237'
     */
    fixed: function (value = 0, _currency = '', decimals = 2) {
      value = value ? value + "" : "0";
      decimals = parseFloat(decimals);
      let len = value.length;
      let dot = value.indexOf('.');
      if (!value && value != 0) {
        return "0.00";
      }
      if (dot < 0) { //无小数点补0
        value = value + '.';
        for (var i = 0; i < decimals; i++) {
          value += '0';
        }
        return value = _currency + value.replace(/(\d)(?=(\d{3})+\.)/g, '1');
      }
      if (len <= dot + decimals) { //位数不足补0
        for (; len <= dot + decimals; len++) {
          value += '0';
        }
        return value = _currency + value.replace(/(\d)(?=(\d{3})+\.)/g, '1');
      }
      if (dot > 3) { //需要千分位符 ,
        value = value.replace(/(\d)(?=(\d{3})+\.)/g, '1');
        dot = value.indexOf('.');
      }
      return _currency + value.substr(0, dot + decimals + 1);
    },

    /**
     * 四舍五入保留小数
     * @param  {Number}  num            需要转化的数值
     * @param  {Integer}  cutNum        保留的小数位数
     * @param  {Boolean} isRemoveZero    是否移除末尾的0，默认不需要
     * @return {Number}
     */
    toFixed: function (num, cutNum, isRemoveZero) {
      var sReturn = '0';
      num = parseFloat(num);
      if (isNaN(num)) {
        num = 0;
      }
      cutNum = cutNum || 0;
      if (num.toString() == "NaN") {
        num = 0;
      } else {
        num = num.toFixed(cutNum);
      }

      sReturn = num.toString();
      if (isRemoveZero) {
        // console.log(sReturn);
        // console.log(typeof sReturn);
        while (sReturn.indexOf('.') > -1 && sReturn.endsWith('0')) {
          sReturn = sReturn.substr(0, sReturn.length - 1);
        }
        if (sReturn.endsWith(".")) {
          sReturn = sReturn.substring(0, sReturn.length - 1);
        }
      }
      return sReturn;
    }

  };
  window.$util = util;
})()