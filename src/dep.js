/**
 * 功能
 *  收集依赖，添加观察者（watcher）
 *  通知所有观察者 
 * 
 * 结构
 *  + subs[]
 *  + addSub(sub)
 *  + notify()
 */

class Dep {
  constructor() {
    // 存储所有的观察者
    this.subs = []
  }
  // 添加观察者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  // 发送通知
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}