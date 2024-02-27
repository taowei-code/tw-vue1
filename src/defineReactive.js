import observe from "./observe.js"
function defineReactive(target, key, val) {
  observe(val) //对象里的属性的值也为对象，
  Object.defineProperty(target, key, {
    get() {
      console.log('get----', `${key}--${val}`)
      return val
    },
    set(newVal) {
      if (newVal === val) return
      console.log('set----', `${key}---${newVal}`)
      observe(newVal)
      val = newVal
    }
  })
}
export default defineReactive
