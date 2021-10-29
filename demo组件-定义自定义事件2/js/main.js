
/**
 * 注意：
 *  自定义事件名称要全小写'clickme'或kebab-case ，大写事件监听不到(如：'clickMe'  'ClickMe')
 */
 import { useClickOutside } from './clickoutside.js'

const MyEvent = {
    setup() {
        const wrapper = useClickOutside()
    
        function handleClickOutside() {
          // some action
          console.log('自定义事件@clickoutside触发OK！')
        }
    
        return {
          wrapper,
          handleClickOutside
        }
    },
    template: `
        <div>
            <div ref="wrapper" @clickoutside="handleClickOutside">点击触发自定义事件@clickoutside</div>
        </div>
    `
}
export { MyEvent }