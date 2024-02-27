const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
console.log(arrayMethods)
const methodsToPatch = ['push', 'unshift', 'pop', 'shift', 'sort', 'reverse', 'splice']
for (let i = 0; i < methodsToPatch.length; i++) {
  const method = methodsToPatch[i];
  Object.defineProperty(arrayMethods, method, {
    value: function (...args) {
      const ret = arrayProto[method].apply(this, args)
      console.log('get arr======', method)
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