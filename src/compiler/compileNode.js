import compileTextNode from './compileTextNode.js'
import compileAttribute from './compileAttribute.js'
export default function compileNode(nodes,vm){
  console.log('nodes====',nodes)
  for(let node of nodes){
    if(node.nodeType === 1){ // 元素节点
      // 编译节点上各个属性，v-bind v-model v-on
      compileAttribute(node,vm)
      compileNode(Array.from(node.childNodes),vm)
    }else if(node.nodeType === 3 && node.textContent.match(/{{(.*)}}/)){
      // 当前节点为文本几点，比如 <span>{{ key }}</span>
      compileTextNode(node,vm)
    }
  }
}