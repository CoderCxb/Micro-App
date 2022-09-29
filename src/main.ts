import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { registerMicroApps, start, initGlobalState, MicroAppStateActions } from 'qiankun';

const whitelist: string[] = [
  'api.map.baidu.com',
];

registerMicroApps([
  {
    name: 'reactApp',
    // entry: '//localhost:3000/',
    entry: '//10.0.224.92:3000',
    container: '#micro-app-container',
    activeRule: ['/react-app'],
  }
]);

start({
  excludeAssetFilter: url => {
    return url.indexOf('api.map.baidu.com') !== -1
  },
  // @ts-ignore
  async fetch (url: string, ...args: any[]):  Promise<Response> {
    console.log(url, args);
    if (whitelist.some(item => (url as string).includes(item))) {
      // do something
      // @ts-ignore
      let el;
      const isJS = !url.endsWith('css');
      if(isJS){
        el = document.createElement('script');
        el.src = url;
      }else{
        el = document.createElement('link');
        el.rel = "stylesheet"
        el.href = url;
      }
      document.body.appendChild(el)
      return window.fetch(url, {
        ...args,
        mode: 'no-cors'
      })
    }
    return window.fetch(url, ...args)
  }
});

// 初始化 state
// const actions: MicroAppStateActions = initGlobalState({
//   kdtId: 123456
// });

// actions.onGlobalStateChange((state, prev) => {
//   // state: 变更后的状态; prev 变更前的状态
//   console.log(state, prev);
// });
// actions.offGlobalStateChange();


createApp(App).mount('#app')
