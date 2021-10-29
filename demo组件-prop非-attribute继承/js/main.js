const MyDatePicker = {
    created() {
        console.log('MyDatePicker:', this.$attrs) // { data-status: "activated" }
    },
    template: `
        <div class="my">
            <input type="datetime-local" />
        </div>
    `
}
const MySelect = {
    created() {
        console.log('MySelect:', this.$attrs) // { onChange: ƒ }
    },
    template: `
        <div class="my">
            <select>
                <option value="1">Yesterday</option>
                <option value="2">Today</option>
                <option value="3">Tomorrow</option>
            </select>
        </div>
    `
}
const MyInput = {
    created() {
        console.log('MyInput:', this.$attrs) // {class: 'myclass', style: {…}, onInput: ƒ}
    },
    template: `
        <div class="my">
            输入:<input type="text" />
        </div>
    `
}

export { MyDatePicker, MySelect, MyInput }