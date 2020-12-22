import Download from './download'

const install = function (Vue) {
  Vue.directive('Download', Download)
}

if (window.Vue) {
  window.download = Download
  Vue.use(install); // eslint-disable-line
}

Download.install = install
export default Download
