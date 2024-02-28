import Watcher from "../watcher.js"

export default function compileAttribute(node, vm) {
  const attrs = Array.from(node.attributes)
  for (let attr of attrs) {
    const { name, value } = attr
    if (name.match(/v-on:click/)) {
      compileVOn(node, value, vm)
    } else if (name.match(/v-bind/)) {
      compileVBind(node, name, value, vm)
    } else if (name.match(/v-model/)) {
      compileVModel(node, value, vm)
    }
  }
}

// v-on 原理 添加一个 click 事件
function compileVOn(node, method, vm) {
  node.addEventListener('click', function (...args) {
    vm.$options.methods[method].apply(vm, args)
  })
}
function compileVBind(node, attrName, attrValue, vm) {
  // 移除已有的 v-bind:xx 属性
  node.removeAttribute(attrName)
  attrName = attrName.replace(/v-bind:/, '')
  function cb() {
    node.setAttribute(attrName, vm[attrValue])
  }
  new Watcher(cb)
}

function compileVModel(node, key, vm) {
  let { tagName, type } = node
  tagName = tagName.toLowerCase()
  if (tagName === 'input' && type === 'text') {
    // <input type="text" v-model="key" />
    // 输入框初始值
    node.value = vm[key]
    // 响应式
    node.addEventListener('input', function () {
      vm[key] = node.value
    })
  } else if (tagName === 'input' && type === 'checkbox') {
    // <input type="checkbox" v-model="key" />
    // 输入框初始值
    node.checked = vm[key]
    // 响应式
    node.addEventListener('change', function () {
      vm[key] = node.checked
    })
  } else if (tagName === 'select') {
    // 只处理单选
    // <select v-model="key"></select>
    // 输入框初始值
    node.value = vm[key]
    // 响应式
    node.addEventListener('change', function () {
      vm[key] = node.value
    })
  }
}
