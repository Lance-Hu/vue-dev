import DownFile from './down-file'

const install = function(Vue) {
  Vue.directive('DownFile', DownFile)
}

if (window.Vue) {
  window.downFile = DownFile
  Vue.use(install); // eslint-disable-line
}

DownFile.install = install
export default DownFile
