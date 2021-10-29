
// 子组件 inject
const MyMarker = {
  setup() {
    const userLocation = Vue.inject('location', '默认值')
    const userGeolocation = Vue.inject('geolocation')

    return {
      userLocation,
      userGeolocation
    }
  },
  template: `
    <ul>
      <li>location:{{ userLocation }}</li>
      <li>longitude:{{ userGeolocation.longitude }}</li>
      <li>latitude:{{ userGeolocation.latitude }}</li>
    </ul>
  `
}

// 父组件 provide
const MyMap = {
  components: {
    MyMarker
  },
  setup() {
    Vue.provide('location', 'North Pole')
    Vue.provide('geolocation', {
      longitude: 90,
      latitude: 135
    })

  },
  template: `
    <div>
      <my-marker></my-marker>
    </div>
  `
}

export { MyMap, MyMarker }