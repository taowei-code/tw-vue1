import Observer from "./Observer.js"
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) return
  // 说明 obj 已经是响应式对象了，不需要再做响应式处理
  if(obj.__ob__) return obj.__ob__
  const ob = new Observer(obj)
  return ob
}
export default observe