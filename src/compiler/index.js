import compileNode from './compileNode.js'
export default function mount(vm) {
  let { el } = vm.$options
  const dom = document.querySelector(el)
  console.log('dom---------',dom)
  console.log('dom.childNodes---------',dom.childNodes)
  // 处理子节点
  compileNode(Array.from(dom.childNodes), vm)
}