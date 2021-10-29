const MyBtn = {
    emit: ['my-add-event'],
    template: `<button @click="add(1)">增加</button>`,
    methods: {
        add(num) {
            this.$emit('my-add-event',num)
        }
    }
}
export { MyBtn }