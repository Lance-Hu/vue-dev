import WaterMarker from './water-marker'

const install = function(Vue) {
  Vue.directive('WaterMarker', WaterMarker)
}

if (window.Vue) {
  window['water-marker'] = WaterMarker
  Vue.use(install); // eslint-disable-line
}

WaterMarker.install = install
export default WaterMarker
