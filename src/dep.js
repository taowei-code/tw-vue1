export default function Dep(){
  this.watchers = []
}
// 实例化watcher时 Dep.target = Watcher 实例
Dep.target = null
Dep.prototype.depend = function(){
  this.watchers.push(Dep.target)
}
Dep.prototype.notify = function(){
  for(let watcher of this.watchers){
    watcher.update()
  }
}