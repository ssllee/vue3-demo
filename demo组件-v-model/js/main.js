const MyComponent = {
  props: {
    modelValue: String, // 不带参数的 v-model 绑定
    searchText: String  // 带参数的 v-model 绑定
  },
  emit: ['update:modelValue', 'update:searchText'],
  template: `     
    <div>modelValue:<input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" /></div>
    <div>searchText:<input :value="searchText" @input="$emit('update:searchText', $event.target.value)" /></div>
  `,
}
export { MyComponent }