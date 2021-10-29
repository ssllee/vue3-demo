
const MyVueCustom = Vue.defineCustomElement({
    props:{
        msg: String
      },
      template: `
        <tr>
          <td>{{ msg }}</td>
        </tr>
      `
})

customElements.define('my-vue-custom', MyVueCustom)