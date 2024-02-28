import observe from "./observe.js"
import Dep from './dep.js'
function defineReactive(target, key, val) {
  const childOb = observe(val) //对象里的属性的值也为对象
  const dep = new Dep()
  Object.defineProperty(target, key, {
    get() {
      // 收集依赖，收集依赖于当前属性的订阅者
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
      // 派发更新，通知依赖于该属性的订阅者更新
      dep.notify()
    }
  })
}
export default defineReactive
