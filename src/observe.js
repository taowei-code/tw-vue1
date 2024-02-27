import Observer from "./Observer.js"
function observe(obj) {
  const ob = new Observer(obj)
  return ob
}
export default observe