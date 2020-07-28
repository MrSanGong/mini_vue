class Vue {
  constructor(options) {
    // 1、通过属性保存选项的数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    // 2、把data中的成员转换成getter和setter，注入到vue实例中
    this._proxyData(this.$data)
    // 3、把$data中的属性通过observer变成响应式
    new Observer(this.$data)
  }
  _proxyData(data) {
    // 1、遍历data中的所有属性
    Object.keys(data).forEach(key => {
      // 2、把data中的成员注入到vue实例中
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get() {
          return data[key]
        },
        set(newVal) {
          if (data[key] === newVal) return
          data[key] = newVal
        }
      })
    })
  }
}