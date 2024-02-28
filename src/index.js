import initData from "./initData.js"
import mount from "./compiler/index.js"

export default function Vue(options) {
    this._init(options)
}
Vue.prototype._init = function (options) {
    this.$options = options

    // 响应式处理、依赖收集
    initData(this)

    if(this.$options.el){
      this.$mount(this)
    }
}
Vue.prototype.$mount = function(vm){
  mount(vm)
}
