# vue3-demo
vue3 基础知识，组件知识等demo


# vue3 相关

### Vue 与 Web Components

See [web-components-examples 一些例子](https://github.com/mdn/web-components-examples)

See [Web_Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)

### Vue3 响应式原理

See [Vue3 响应式原理](https://zhuanlan.zhihu.com/p/158743788)

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### vue3 ui: element-plus

See [element-plus](https://element-plus.org/zh-CN/).

### vue-next-admin

See [vue-next-admin](https://github.com/lyt-Top/vue-next-admin)

### Proxy 对象响应式原理

```
const dinner = {
    meal: 'tacos'
}
const handler = {
    get(target, property, receiver) {
        track(target, property)
        return Reflect.get(...arguments)
    },
    set(target, property, value, receiver) {
        trigger(target, property)
        return Reflect.set(...arguments)
    }
}
const proxy = new Proxy(dinner, handler)
console.log(proxy.meal) // get track 跟踪一个 property 何时被读取，使 property 与副作用依赖

proxy.meal = 'hello' // set trigger 重新触发该 property 的副作用

Vue 如何实现这些关键步骤：
1.当一个值被读取时进行追踪：proxy 的 get 处理函数中 track 函数记录了该 property 和当前副作用。
2.当某个值改变时进行检测：在 proxy 上调用 set 处理函数。
3.重新运行代码来读取原始值：trigger 函数查找哪些副作用依赖于该 property 并执行它们。
```

# vue3 - 组件篇

## Vue2 中 Options API 和 Vue3 中 Composition API

[composition-api](https://github.com/vuejs/composition-api/blob/HEAD/README.zh-CN.md)

```
npm install @vue/composition-api
# or
yarn add @vue/composition-api

```

### Options API

- Options API 可以翻译为选项 API，字面意思可供使用者挑拣的分类条目，就是框架定义好选项，我们可以把我们的功能写在选项里，如 props 里面设置接收参数、data 里面设置变量、computed 里面设置计算属性、watch 里面设置监听属性、methods 里面设置事件方法你会发现 Options APi 都约定了我们该在哪个位置做什么事。

```
export default {
  name: 'index',
  data() {
    return {}
  },
  watch: {},
  components: {},
  created() {},
  methods: {},
  computed: {}
}
```

- 缺点： 一个功能往往需要在 Vue 不同的配置项中定义属性和方法，比较分散，如果项目比较小，组件逻辑功能不多，代码结构还能保持清晰明了，但是项目大了后，一个 methods 中可能包含多个方法甚至几十个方法，你往往分不清哪个方法对应哪个功能，耦合度相对较高。

### Composition API

- Composition API 可以理解为组合 API，一个小功能的 api 都会放到一起，下面一个简单的例子，可能运行会报错，这里只是演示写法。

```
export default {
  setup(props, context) {
    // 用户登陆
    const login = reactive({ login: "1" });
    // 登陆验证
    const loginonSubmit = e => {
      e.preventDefault();
      validate()
        .then(() => {})
        .catch(err => {});
    };

    // 用户注册
    const registered = reactive({ registered: "1" });
    const registeredonSubmit = e => {
      e.preventDefault();
      validate()
        .then(() => {})
        .catch(err => {});
    };

    return {
      login
      loginonSubmit ,
      registered ,
      registeredonSubmit
    };
  }
};
```

- Composition API 根据逻辑相关性组织代码，提升可读性和可维护性，这样作，即时项目很大，功能不少，咱们都能快速的定位到这个功能所用到的全部 API。

## 组件 格式

> kebab-case 格式的 <submit-button> 同样能在模板中使用
> PascalCase 格式以 <SubmitButton> 同时也有助于区分原生的自定义元素。

## setup 组件选项

> 一个组件选项，在组件被创建之前，props 被解析之后执行。它是组合式 API 的入口。
> setup 函数是新增的一个选项，用来使用组合式 api，它会在 beforeCreate 生命周期钩子之前被调用，一些知识点：

1.可以返回一个对象，对象的属性会合并到模板渲染的上下文中；

2.可以返回一个函数；

3.第一个参数是 props，注意使用 props 不能解构，第二个参数是一个上下文对象，暴露了一些其他常用属性；

```
export default {
    setup(props, context) {
      return {}
    }
}

export default {
  // props 是响应式的不能解构，conext非响应式的可以解构
  setup(props, { attrs, slots, emit, expose }) {
    return {}
  }
}

```

## setup 中获取 $el,$store,$router

```
import { getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
setup(){
  const router = useRouter();
  const store = useStore();
  const { proxy, ctx, uid } = getCurrentInstance() // 获取组件实例 (setup和生命周期中使用)
}
```

## setup 中生命周期 [生命周期](https://v3.vuejs.org/guide/composition-api-lifecycle-hooks.html)

```
beforeCreate -> use setup()
created -> use setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeUnmount -> onBeforeUnmount
unmounted -> onUnmounted
errorCaptured -> onErrorCaptured
renderTracked -> onRenderTracked
renderTriggered -> onRenderTriggered
activated -> onActivated
deactivated -> onDeactivated


```

## `<script setup>`单文件组件

## 组件之 props

- 单向数据流
  所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。
  另外，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

- props 验证
  定制 prop 的验证方式，可以为 props 中的值提供一个带有验证需求的对象

- 非 props attribute 继承
  当组件返回单个根节点时，非 prop attribute 将自动添加到根节点的 attribute 中,即 Attribute 继承，常见的示例包括 class、style、id 属性或 v-on
  - 可设置一个或多个
  - 可 attribute 继承禁用，用 v-bind="$attrs" 单独处理放置位置

## 组件之 is

- 有些 HTML 元素，诸如` <ul>、<ol>、<table> 和 <select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 `<li>、<tr> 和 <option>`，只能出现在其它某些特定的元素内部,这个时候如果想用 vue 自定义组件可通过 is

- 当它用于原生 HTML 元素时，is 的值必须以 vue: 开头，才可以被解释为 Vue 组件。这是避免和原生自定义元素混淆

- is attribute 被用在一个原生 HTML 元素上时，它会被作为一个自定义的内置元素进行转译，这是一个原生 [web platform](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example) 的特性

```
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

## 组件之 动态 & 异步组件

- 动态组件 :is

```
<component :is="currentComponent"></component>
```

- 动态组件上使用 keep-alive 实现缓存

```
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```

- 异步组件
  在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。为了简化，Vue 有一个 defineAsyncComponent 方法

## 组件之 provide/inject

> 通常，当我们需要从父组件向子组件传递数据时，我们使用 props。想象一下这样的结构：有一些深度嵌套的组件，而深层的子组件只需要父组件的部分内容。在这种情况下，如果仍然将 prop 沿着组件链逐级传递下去，可能会很麻烦。

对于这种情况，我们可以使用一对 provide 和 inject。无论组件层次结构有多深，父组件都可以作为其所有子组件的依赖提供者。这个特性有两个部分：父组件有一个 provide 选项来提供数据，子组件有一个 inject 选项来开始使用这些数据。

```
provide 函数有两个参数：

  1.name (<String> 类型),
  2.value

inject 函数有两个参数：

  1.要 inject 的 property 的 name,
  2.默认值 (可选)
```

## 组件之 h() 一个用于创建 VNode 的实用程序

> 返回一个”虚拟节点“，通常缩写为 VNode：一个普通对象，其中包含向 Vue 描述它应在页面上渲染哪种节点的信息，包括所有子节点的描述。它的目的是用于手动编写的渲染函数

接收三个参数：
type(必须)
HTML 标签名、组件、异步组件或函数式组件
props(可选)
一个对象，与我们将在模板中使用的 attribute、prop 和 v-on 事件相对应
children(可选)
子代 VNode，使用 h() 生成，或者使用字符串来获取“文本 VNode”，或带有插槽的对象

## 组件之 插槽 slot

- 匿名插槽

```
<slot></slot>
隐含的名字“default”:<slot name="default"></slot>
```

- 具名插槽

```
<slot name="header"></slot>

在向具名插槽提供内容的时候，我们可以在一个 <template> 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称：
<template v-slot:header>
  <h1>Here might be a page title</h1>
</template>
```

- 具名插槽的缩写
  跟 v-on 和 v-bind 一样，v-slot 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #。例如 v-slot:header 可以被重写为 #header

```
<template #header>
  <h1>Here might be a page title</h1>
</template>
```

- 作用域插槽

```
绑定在 <slot> 元素上的 attribute 被称为插槽 prop。现在在父级作用域中，我们可以使用带值的 v-slot 来定义我们提供的插槽 prop 的名字
定义：
<slot :item="item" :index="index" :another-attribute="anotherAttribute"></slot>

使用 不解构：
<template v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <span class="green">{{ slotProps.item.name }}</span>
</template>

使用 解构：
<template v-slot:default="{ item, index, another-attribute }">
    <i class="fas fa-check"></i>
    <span class="green">{{ item.name }}</span>
</template>
```

- 解构插槽 Prop

```
作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里：


function (slotProps) {
  // ... 插槽内容 ...
}
这意味着 v-slot 的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式。你也可以使用 ES2015 解构来传入具体的插槽 prop

<todo-list v-slot="{ item }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</todo-list>
```

- 动态插槽名
  > 动态指令参数也可以用在 v-slot 上，来定义动态的插槽名
  > 注意：动态插槽名定义时避免使用大写字符来命名键名，在 DOM 中使用模板时 浏览器会把 attribute 名全部强制转为小写

```
\\ 这样会报错Property "dynamicslotname" was accessed during render but is not defined on instance.
<template v-slot:[dynamicSlotName]>
    ...
</template>

\\ 解决：重新命名为 dynamicslotname
<template v-slot:[dynamicslotname]>
    ...
</template>

```

## 组件之 自定义事件

- 父组件中添加一个 kebab-case (短横线分隔命名) 的监听器

```
<my-component @my-event="doSomething"></my-component>

$emit('myEvent')

```

- 定义自定义事件
  > 注意：当在 emits 选项中定义了原生事件 (如 click) 时，将使用组件中的事件替代原生事件侦听器。
  > 自定义事件名称要小写'clickme' ，大写事件监听不到(如：'clickMe' 'ClickMe')

```
<template>
  <div ref="wrapper" @clickme="handleClick">点击触发自定义事件@clickme</div>
</template>
```

```
app.component('custom-form', {
  emits: ['inFocus', 'submit']
})
```

## 组件之 v-model 参数

- 默认情况下，组件上的 v-model 使用 modelValue 作为 prop 和 update:modelValue 作为事件。我们可以通过向 v-model 传递参数来修改这些名称：
- 支持多个 v-model 绑定
- v-model 修饰符使用

* 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

## defineComponent

> defineComponent，在 TypeScript 下，给予了组件 正确的参数类型推断，审查类型的正确性。[解释](https://blog.csdn.net/qq_36157085/article/details/109498473)

## defineCustomElement

> vue3.2 通过该方法返回一个原生的自定义元素，该元素可以用于任意框架或不基于框架使用

## defineAsyncComponent

# vue3 - 基础篇

## vue3 reactive 原理

See [reactive 原理](https://blog.csdn.net/weixin_44523860/article/details/104309997)

## 响应式 API

> ref (复制) 创建一个响应式引用

    接受一个内部值并返回一个响应式且可变的 ref 对象。ref对象具有指向内部值的单个 property.value

> toRef (引用对象的某个 property)

    可以用来为源响应式对象上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接

> toRefs (引用对象)

    将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 ref

> reactive (深度转换)返回对象的响应式副本,将解包所有深层的 refs，同时维持 ref 的响应性。

> readonly (深度转换)接受一个对象 (响应式或纯对象) 或 ref 并返回原始对象的只读代理

> markRaw 标记一个对象，使其永远不会转换为 proxy。返回对象本身

> shallowReactive (浅解包) 创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (暴露原始值)

> shallowReadonly (浅只读) 创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 (暴露原始值)。

> watch

    需要侦听特定的数据源，并在回调函数中执行副作用。默认情况下，它也是惰性的，即只有当被侦听的源发生变化时才执行回调。
    响应式对象时需要设置deep

> watchEffect

    watchEffect用来监听数据的变化，它会立即执行一次，之后会追踪函数里面用到的所有响应式状态，当变化后会重新执行该回调函数

> computed
> 相当于之前的 computed 选项，创建一个依赖于其他状态的状态，需要注意的是返回的是一个对象，称作 ref:{value:xxx}
> 除了可以传 getter 函数，也可以传一个带有 setter 和 getter 属性的对象创建一个可修改的计算值

```
import { ref, onMounted, watch, toRefs, computed } from 'vue'
import { reactive, isReactive } from 'vue'
```

# 问题
```
一. 问题：vue3 'v-model' directives require no argument. 红色波浪线

解决
1.settings.json 中修改 "vetur.validation.template": false
2.eslintrc.js 中修改 vue/no-v-model-argument': 'off'

二.


```
