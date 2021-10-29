
// 子组件 inject
const MyMarker = {
  inject: ['location', 'geolocation'],
  template: `
    <ul>
      <li>location:{{ location }}</li>
      <li>longitude:{{ geolocation.longitude }}</li>
      <li>latitude:{{ geolocation.latitude }}</li>
    </ul>
  `
}

// 父组件 provide
const MyMap = {
  components: {
    MyMarker
  },
  provide: {
    location: 'North Pole',
    geolocation: {
      longitude: 90,
      latitude: 135
    }
  },
  template: `
    <div>
      <my-marker></my-marker>
    </div>
  `
}

export { MyMap, MyMarker }