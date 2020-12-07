// 基于axios
import axios from 'axios'

export const request = axios.create({
  baseURL: 'http://realworld.api.fed.lagounews.com'
})

// 通过插件机制获取到上下文对象（query、params、req、res、app、store...)
// 插件导出函数必须作为default 成员
export default ({ store }) => {

  // 请求拦截器
  request.interceptors.request.use(function(config) {
    const { user } = store.state

    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, function(error) {
    return Promise.reject(error)
  })
}
