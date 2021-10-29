// import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const isNull = any => typeof any === 'undefined' || any === null

const USE_TOUCH = isNull(window) && ('ontouchstart' in window || (isNull(navigator) && navigator.msMaxTouchPoints > 0))
const CLICK_TYPE = USE_TOUCH ? 'touchstart' : 'click'

const CLICK_OUTSIDE = 'clickoutside'

const events = {
  [CLICK_OUTSIDE]: new Set()
}

document.addEventListener(CLICK_TYPE, event => {
  const target = event.target
  const type = CLICK_OUTSIDE
  const path = event.path || (event.composedPath && event.composedPath())

  events[type].forEach(el => {
    if (target !== el && (path ? !path.includes(el) : !el.contains(target))) {
      dispatchEvent(el, { type })
    }
  })
})

function observe(el, types) {
  if (typeof types === 'string') {
    types = [types]
  }

  Array.isArray(types) &&
    types.forEach(type => {
      events[type].add(el)
    })
}

function disconnect(el, types) {
  if (typeof types === 'string') {
    types = [types]
  }

  Array.isArray(types) &&
    types.forEach(type => {
      events[type].delete(el)
    })
}

function dispatchEvent(el, payload = {}, Event = window.Event) {
  const { type, bubbles = false, cancelable = false, ...data } = payload

  let event

  if (!isNull(Event)) {
    event = new Event(type, { bubbles, cancelable })
  } else {
    event = document.createEvent('HTMLEvents')
    event.initEvent(type, bubbles, cancelable)
  }

  Object.assign(event, data)

  return el.dispatchEvent(event)
}

export function useClickOutside() {
  const wrapper = Vue.ref(null)

  Vue.onMounted(() => {
    Vue.nextTick(() => {
      observe(wrapper.value, CLICK_OUTSIDE)
    })
  })

  Vue.onBeforeUnmount(() => {
    disconnect(wrapper.value, CLICK_OUTSIDE)
  })

  return wrapper
}
