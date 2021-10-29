const MyList = {
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    setup(props, context) {
      const store = Vuex.useStore()

      let titles = Vue.ref([])
      let currentItem = Vue.ref('')

      const useClick = (v) => {
        alert(v)
      }

      Vue.onBeforeMount(() => {
        const labelArr = store.state.labelArray
        // titles = labelArr  // 这样会使titles失去响应
        titles.value = labelArr
      })
      return {
        titles,
        useClick
      }
    },
    template: ` 
      <ul>
          <li>
            <div v-for="title in titles" :key="title">{{ title }}</div>
          </li>
          <li v-for="(item, index) in data" :key="item.id" @click="useClick(index)">
              <slot :item="item"></slot>
          </li>
      </ul>
    `,
}

const MyItem = {
  props: {
    label: String
  },
  setup(props, context) {
    const store = Vuex.useStore()

    store.commit('addLabel', { label: props.label })
    console.log(props.label)

    return {
      
    }
  },
  template: `     
    <div>
        <slot></slot>
    </div>
  `,
}
export { MyList, MyItem }