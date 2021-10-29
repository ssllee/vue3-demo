// 匿名插槽
const SubmitButton = {
    setup(props, { emit }) {
        const onSubmit = () => {
          emit('doSubmit')
        }
    
        // 用 Lodash 的防抖函数
        const useDebouncedClick = _.debounce(onSubmit, 500)
    
        Vue.onUnmounted(() => {
          // 移除组件时，取消定时器
          useDebouncedClick.cancel()
        })
    
        return {
          useDebouncedClick
        }
    },
    template: `     
        <button @click="useDebouncedClick">
            <slot>Submit</slot>
        </button>
    `,
}

// 具名插槽
const MyPanel = {
  template: `
    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  `
}
export { SubmitButton, MyPanel }