const MyDatePicker = {
  inheritAttrs: false, // 不希望组件的根元素继承 attribute，v-bind="$attrs"设置存放位置
  created() {
    console.log('MyDatePicker:', this.$attrs) // { data-status: "activated" }
  },
  template: `
    <div class="my">
        <input type="datetime-local"  v-bind="$attrs"/>
    </div>
  `
}

export { MyDatePicker }