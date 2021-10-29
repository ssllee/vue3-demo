const MyComponent = {
  props: {
    // 基础类型检查
    propa: Number,
    // 接受多种类型
    propb: [String, Number],
    // 必填
    propc: {
      type: String,
      required: true
    },
    // 带默认值
    propd: {
      type: String,
      default: '默认字符串'
    },
    // 带默认值的对象
    prope: {
      type: Object,
      default: function () {
          return { id: 10, title: 'hello' }
      }
    },
    // 自定义验证函数
    propf:{
      validator: function(value) {
          // 这个值必须匹配下列字符串中的一个
          return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    },
    // 具有默认值的函数
    propg:{
      type: Function,
      // 与对象或数组默认值不同，这不是一个工厂函数 —— 这是一个用作默认值的函数
      default: function() {
        return '默认function() 改变'
      }
    }
  },
  template: `
    <div>
      <div>propa：{{ typeof propa }}</div>
      <div>propb：{{propb}}</div>
      <div>propc：{{propc}}</div>
      <div>propd：{{propd}}</div>
      <div>prope.title:{{prope.title}}</div>
      <div>propf:{{propf}}</div>
      <div>propg():{{propg()}}</div>
    </div>
  `
}
export { MyComponent }