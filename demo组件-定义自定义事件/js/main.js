
/**
 * 注意：
 *  自定义事件名称要全小写'clickme'或kebab-case ，大写事件监听不到(如：'clickMe'  'ClickMe')
 */

const MyEvent = {
    setup() {
        const CLICK_ME = 'clickme' // click-me 自定义事件的名称命名：kebab-case (短横线分隔命名) 或全小写，因为html不区分大小写，都解释为小写
    
        const wrapper = Vue.ref(null)
        
        const clickEvent = function(e) {
            e.stopPropagation()
    
            const event = new CustomEvent(CLICK_ME, {
                bubbles: false, // 冒泡
                cancelable: false, // 默认行为
                detail: '123' // 要传递的数据
            })
            this.dispatchEvent(event)
        }

        const observe = (el) => {
            el.addEventListener('click', clickEvent)
        }
    
        const useHandleClick = (event) => {
            // todo
            console.log('自定义事件@clickme触发OK！', event.detail)
        }

        const useStopListener = () => {
            wrapper.value.removeEventListener('click', clickEvent)
        }

        Vue.onMounted(() => {
            Vue.nextTick(() => {
                observe(wrapper.value)
            })
        })
    
        Vue.onBeforeUnmount(() => {
            useStopListener()
        })
    
        return {
          wrapper,
          useHandleClick,
          useStopListener
        }
    },
    template: `
        <div>
            <div ref="wrapper" @clickme="useHandleClick">点击触发自定义事件@clickme</div>
            <button @click="useStopListener">useStopListener</button>
        </div>
    `
}
export { MyEvent }