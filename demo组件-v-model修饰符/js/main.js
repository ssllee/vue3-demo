const MyComponent = {
    props: {
      modelValue: String,   // 不带参数的 v-model 绑定，modelModifiers对象存修饰符
      searchText: String,   // 带参数的 v-model 绑定，生成的 prop 名称将为 arg + "Modifiers"
      modelModifiers: {     
        default: () => ({})
      },
      searchTextModifiers: {
        default: () => ({})
      }
    },
    emit: ['update:modelValue', 'update:searchText'],
    methods: {
      emitValue(e) {
        console.log(this.modelModifiers) // { capitalize: true }

        let value = e.target.value
        if (this.modelModifiers.capitalize) {
            value = value.charAt(0).toUpperCase() + value.slice(1)
        }
        this.$emit('update:modelValue', value)
      },
      emitSearchText(e) {
        console.log(this.searchTextModifiers) // { trim: true }

        let value = e.target.value
        if (this.searchTextModifiers.trim) {
            value = value.replace(/(^\s*)|(\s*$)/g, "");
        }
        
        this.$emit('update:searchText', value) // 暂时没有更新input上的值？？？
        this.$refs.search.value = this.searchText // 单独处理
      }
    },
    template: `
      <input type="text" :value="modelValue" @input="emitValue">
      <br/>
      <input ref="search" type="text" :value="searchText" @input="emitSearchText">
    `
}
export { MyComponent }