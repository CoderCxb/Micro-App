# 微前端项目

## 起步

### 主应用
```javascript
// 安装qiankun
// yarn add qiankun # 或者 npm i qiankun -S

// 主应用的入口文件
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'reactApp',
    entry: '//localhost:3000', // 端口号
    container: '#container', // 挂载的容器
    activeRule: '/app-react', // 触发的路由
  },
]);
// 启动 qiankun
// 需考虑资源转换成fetch请求导致的跨域问题
start();
```


### 子应用 - React

###### public-path.js
```js
// src下增加public-path.js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

###### index.js
```js
// index.js
import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function render(props) {
  const { container } = props;
  ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

// react 路由配置
<BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/app-react' : '/'}>
```



###### webpack配置
```js
// 安装craco
// yarn add @craco/craco

// package.json中
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "craco eject"
},
"cracoConfig": "craco.config.js",
```
```js
// craco.config.js
const { name } = require('./package.json');

module.exports =  {
  // 根据使用的webpack覆盖工具的不同,进行不同的配置
  // 如果配置错误,会无法获取生命周期
  // Uncaught Error: application 'reactApp' died in status LOADING_SOURCE_CODE: [qiankun]: You need to export lifecycle functions in reactApp entry
  webpack: {
    base: '/react-app',
    configure: (webpackConfig, {
      env, paths
    }) => {
      webpackConfig.output.library = `${name}-[name]`;
      webpackConfig.output.libraryTarget = 'umd';
      // webpack5的jsonpFunction属性被chunkLoadingGlobal替换,根据webpack版本来
      webpackConfig.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
      // webpackConfig.output.jsonpFunction = `webpackJsonp_${name}`;
      return webpackConfig;
    }
  },

  devServer: (config) => {
      // 配置跨域
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      };
      return config;
  },
};
```






###### 资源跨域
