import Emoji from './emoji'

const install = function(Vue) {
  Vue.directive('Emoji', Emoji)
}

if (window.Vue) {
  window.emoji = Emoji
  Vue.use(install); // eslint-disable-line
}

Emoji.install = install
export default Emoji
