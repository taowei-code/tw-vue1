import protoArgument from './protoArgument'
function Observer(obj) {
  if (typeof obj !== 'object' || obj === null) return
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

export default Observer