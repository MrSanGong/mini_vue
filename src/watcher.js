/**
 * 功能
 *  当数据变化触发依赖，dep通知所有的watcher示例更新视图
 *  自身实例化的时候往dep对象中添加自己
 * 
 * 结构
 *  + vm
 *  + key
 *  + cb
 *  + oldValue
 *  + update
 */

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    // data中的属性名称
    this.key = key
    // 回调函数负责更新视图
    this.cb = cb
    // 把watcher对象记录到Dep类的静态属性target
    Dep.target = this
    // 触发get方法，在get方法中会调用addSub    
    this.oldValue = vm[key]
    Dep.target = null
  }
  // 当数据发生变化时更新数据
  update() {
    // 获取新数据
    let newValue = this.vm[this.key]
    // 判断新老数据是否相等
    if (newValue === this.oldValue) return
    // 调用回调函数更新视图
    this.cb(newValue)
  }
}