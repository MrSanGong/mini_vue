/**
 * 功能
 *  负责编译模板，解析指令/差值表达式
 *  负责页面的首次渲染
 *  当数据变化后重新渲染视图
 * 结构
 *  el
 *  vm
 *  compile(el)
 *  compileElement(node)
 *  compileText(node)
 * 
 */
class Compiler {
  constructor(vm) {
    this.vm = vm
    this.el = vm.$el
    this.compile(this.el)
  }
  // 编译模板， 处理文本节点和元素节点
  compile(el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 处理文本节点
      if (this.isTextNode(node)) {
        this.compileText(node)
      // 处理元素节点
      } else if (this.isElementNode(node)) {
        this.compileElement(node)
      }
      // 判断node节点，是否有子节点，如果有子节点，要递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  // 编译元素节点，处理指令
  compileElement(node) {
    // console.dir(node.attributes)
    // 遍历所有元素节点
    Array.from(node.attributes).forEach(attr => {
      // 判断该属性是不是指令
      console.dir(attr)
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        // 解析v-text和v-model
        attrName = attrName.substring(2)
        let key = attr.value
        this.update(node, key, attrName)
      }
    })
  }
  update(node, key, attrName) {
    let updateFn = this[attrName + 'Update']
    updateFn && updateFn(node, this.vm[key])
  }
  // 解析v-text
  textUpdate(node, value) {
    node.textContent = value
  }
  // 解析v-model
  modelUpdate(node, value) {
    node.value = value
  }
  // 编译文本节点， 处理差值表达式
  compileText(node) {
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])
    }
  }
  // 判断当前属性是不是指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  // 判断文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }
  // 判断元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }

}