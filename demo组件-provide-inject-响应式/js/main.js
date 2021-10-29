
// 子组件 inject
const MyMarker = {
  setup() {
    const userLocation = Vue.inject('location', '默认值')
    const userGeolocation = Vue.inject('geolocation')
    const updateUserLocation = Vue.inject('updateLocation')

    return {
      userLocation,
      userGeolocation,
      updateUserLocation
    }
  },
  template: `
    <ul>
      <li>location:{{ userLocation }}</li>
      <li>longitude:{{ userGeolocation.longitude }}</li>
      <li>latitude:{{ userGeolocation.latitude }}</li>
      <li><button @click="updateUserLocation">updateUserLocation</button></li>
    </ul>
  `
}

// 父组件 provide
const MyMap = {
  components: {
    MyMarker
  },
  setup() {
    const location = Vue.ref('North Pole')
    const geolocation = Vue.reactive({
      longitude: 90,
      latitude: 135
    })

    const updateLocation = () => {
      location.value = 'South Pole'
    }

    Vue.provide('location', Vue.readonly(location)) //确保通过 provide 传递的数据不会被 inject 的组件更改
    Vue.provide('geolocation', Vue.readonly(geolocation))
    Vue.provide('updateLocation', updateLocation)

  },
  template: `
    <div>
      <my-marker></my-marker>
    </div>
  `
}

export { MyMap, MyMarker }