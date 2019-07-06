// 需要控制路由，解除注释
// import router from '@/router' 
import Axios from 'axios'

// 创建实例时设置配置的默认值
var axios = Axios.create({
  // 一般来说webpack构建的项目baseurl 是单独定义的
  // 如果是特殊情况，解除注释自行修改；
  // baseURL: 'requestUrl'
});

// 在实例已创建后修改请求头;
// 当然可以针对性对某个方法进行设置;
// 如下所示：
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

// 公共请求头参数定义
axios.defaults.headers = {
  // 'client-type': "" 
}

// 同样，也可以单独设置；
// axios.defaults.headers['client-type'] = Util.userAgentType() == "wechat" ? '2' : '1';

// 如下抽象入请求方法：
function ajax(body) {
  // 如果本地设置的mock环境，可配置；
  let isTestEnv = sessionStorage.getItem('env');
  let {
    url,
    method,
    data
  } = body;

  url = isTestEnv ? 'mockURL' : url

  // 大小写设定，统一转换为小写；
  method = method.toLowerCase()

  // null值过滤 看个人需求；
  if (data) {
    for (let key in config.data) {
      if (config.data[key] === null) {
        delete config.data[key];
      }
    }
  } else {
    data = {}
  }

  let fetch = new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: data,
      // `transformRequest` 允许在向服务器发送前，修改请求数据
      // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
      // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
      // transformRequest: [function(data) {

      // }],

      // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
      // 当然这一段也可以放在resolve中处理
      // transformResponse: [function (data) {
      //   // 对 data 进行任意转换处理
      //   // 一般返回体都是被axios包装过的
      //   let result = data.data
      //   return result;
      // }]
    }).then((response) => {
      resolve(response)
    }).catch((error) => {
      // 请求失败时候做点什么？
      reject(error)
    })
  })

  return fetch.then(res => {
    // 这里做自己的处理吧
    if (res.success) {

    } else {

    }
    return res
  })
};

export default ajax;