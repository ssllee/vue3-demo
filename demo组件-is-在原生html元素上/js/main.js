const MyComponent = {
  props:{
    msg: String
  },
  template: `
    <tr>
      <td>{{ msg }}</td>
    </tr>
  `
}
export { MyComponent }