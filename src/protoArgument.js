import observe from "./observe.js";

const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
console.log(arrayMethods)
const methodsToPatch = ['push', 'unshift', 'pop', 'shift', 'sort', 'reverse', 'splice']
for (let i = 0; i < methodsToPatch.length; i++) {
  const method = methodsToPatch[i];
  Object.defineProperty(arrayMethods, method, {
    value: function (...args) {
      // 这里的 this 是数组本身 
      // this.arr.psuh()
      const ret = arrayProto[method].apply(this, args)
      const ob = this.__ob__
      console.log('arr======reactive', method)
      let inserted
      // 获取新增的元素
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args
          break;
          case 'splice':
            inserted = args.slice(2)
            break;
      }
      // 对新增的元素进行响应式处理
      inserted && ob.observeArray(inserted)
      // 通知依赖更新
      ob.dep.notify()
      return ret
    },
    configurable: true,
    writable: true,
    enumerable: false
  })
}
export default function protoArgument(arr) {
  arr.__proto__ = arrayMethods
}