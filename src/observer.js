/** 
 * 功能
 *  负责把data选项中的属性转换成响应式数据
 *  data中的某个属性也是对象，把该属性转换成响应式数据
 *  数据变化发送通知
 * 结构
 *  walk(data){} 判断data是不是对象，遍历data中的所有属性
 *  defineReactive(data, key, value)
*/

class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    if (!data || typeof data !== 'object') return
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, value) {
    let that = this
    // 遍历data选项中的对象添加响应式数据
    this.walk(value)
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get() {
        return value
      },
      set(newVal) {
        if (newVal === value) return
        value = newVal
        // 给新赋值的对象添加响应式数据
        that.walk(value)

        // 发送通知
      }
    })
  }

}