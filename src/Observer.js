import protoArgument from './protoArgument.js'
import defineReactive from './defineReactive.js'
import Dep from './dep.js'
import observe from './observe.js'

function Observer(obj) {
  Object.defineProperty(obj,'__ob__',{
    value:this,
    enumerable:false,
    writable:true,
    configurable:true
  })
  obj.__ob__.dep = new Dep()
  if (Array.isArray(obj)) {
    protoArgument(obj)
  } else {
    this.walk(obj)
  }
}
Observer.prototype.walk = function (obj) {
  for (const key in obj) {
    defineReactive(obj, key, obj[key])
  }
}

// 处理数组中元素为非原始值的情况，让这些元素也具有响应式的能力
// arr = [1,2,{a:'value'}]
// this.arr[2].a = 'new value'
Observer.prototype.observeArray = function (obj) {
  for (let item of obj) {
    observe(item)
  }
}

export default Observer