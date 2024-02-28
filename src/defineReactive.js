import observe from "./observe.js"
import Dep from './dep.js'
function defineReactive(target, key, val) {
  const childOb = observe(val) //对象里的属性的值也为对象
  const dep = new Dep()
  Object.defineProperty(target, key, {
    get() {
      if(Dep.target){
        dep.depend()
        // 如果存在子 ob ，则一起把子对象的依赖收集
        if(childOb){
          childOb.dep.depend()
        }
      }
      console.log('get----', `${key}--${val}`)
      return val
    },
    set(newVal) {
      if (newVal === val) return
      console.log('set----', `${key}---${newVal}`)
      val = newVal
      observe(newVal)
      dep.notify()
    }
  })
}
export default defineReactive
