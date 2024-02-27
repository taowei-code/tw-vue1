import observe from "./observe"
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



const obj = {
  a: '1',
  b: {
    name: '22'
  },
  c: [1, 2, 3]
}
observe(obj)
obj.c.push(11)
obj.c
