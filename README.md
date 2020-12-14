# Nuxt.js

## 自定义路由

对于layout的布局的项目，需要自定义路由，而做法如下：

需要配置nuxt.config.js的router属性的extendRoutes(自定义规则表)函数
```js
module.exports = {
  router: {
    extendRoutes(routes, resolve) {
      routes.slice(0)
      routes.push(...[
        {
          path: '/',
          component:  resolve(__dirname, 'pages/layout'), // Layout,
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home')
            }
          ]
        }
      ])
    }
  }
}
```

### 配置query查询参数，没有作用，(nuxt-link)linkActiveClass的切换无效果

需要设置watchQuery，配置对应的监听属性

wat

