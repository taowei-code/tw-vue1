import Observer from "./Observer"
function observe(obj) {
  const ob = new Observer(obj)
  return ob
}
export default observe