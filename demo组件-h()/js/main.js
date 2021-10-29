/**
 * getCurrentInstance() 获取组件实例 (setup和生命周期中使用)
 */

 // 在组合式函数中调用也可以正常执行
 // function useComponentId() {
 //   return getCurrentInstance().uid
 // }

const RenderButton = {
    setup() {
        const { proxy, ctx, uid } = Vue.getCurrentInstance() // vue3-javascript
        console.log('getCurrentInstance()中的ctx:', ctx) // 类似于vue2中 this
        console.log('getCurrentInstance()中的proxy:', proxy)
    
        // const id = useComponentId() // 有效
    
        const handleClick = event => {
          //   Vue.getCurrentInstance() // 无效
          //   useComponentId() // 无效
    
          console.log('clicked', event.target)
          alert(uid) // 有效
        }
    
        Vue.onMounted(() => {
          // Vue.getCurrentInstance() // 有效
          console.log('this.$el:', ctx.$el)
        })
    
        return () =>
        Vue.h(
            'button', // 标签名称
            {
              // 与 attribute、prop 和事件相对应的对象。
              onClick: handleClick
            },
            `uid: ${uid}` // 标签内容 or 子 VNodes, 使用 `h()` 构建 or 有插槽的对象
          )
    }
}
const RenderDiv = {
    props: {
        item: {}
    },
    setup(props, { slots }) {
        const { item } = Vue.toRefs(props)
        console.log(item.value)
    
        return () =>
        Vue.h(
            'div',
            {},
            slots.default({
                item: item.value
            })
            )
    }
}

const RenderLink = {
    props: {
        href: String,
        target: {
          type: String,
          default: '_black'
        }
    },
    setup(props, { slots }) {
        const { href, target } = Vue.toRefs(props)
    
        return () =>
        Vue.h(
            'a',
            {
              href: href.value,
              target: target.value
            },
            slots.default()
          )
    }
}
export { RenderButton, RenderDiv, RenderLink }