// 需求：实现一个ajax懒加载指令，只加载浏览器可见区域的ajax。

// 思路：
// 懒加载的原理主要是判断当前节点是否到了可视区域这一核心逻辑实现的
// 如果到了运行binding.value()
// 懒加载使用 IntersectionObserver 判断是否到了可视区域，但是有浏览器兼容性问题。

// 下面封装一个懒加载指令，判断浏览器是否支持 IntersectionObserver API，如果支持就使用 IntersectionObserver 实现懒加载
// 因跑在electron上, 就不封装监听scroll方法实现了

const LazyAjax = {
  install(Vue) {
    Vue.directive('LazyAjax', {
      bind(el, binding) {
        if (typeof binding.value !== 'function') {
          throw new Error('callback must be a function')
        }
        // 做一个标记
        el.setAttribute('data-ajax', 'true')
      },
      inserted(el, binding) {
        if (IntersectionObserver) {
          LazyAjax.observe(el, binding)
        }
      }
    })
  },
  // 利用IntersectionObserver监听el
  observe(el, binding) {
    var io = new IntersectionObserver((entries) => {
      const flag = el.dataset.ajax
      if (entries[0].isIntersecting) {
        if (flag) {
          binding.value()
          el.removeAttribute('data-ajax')
        }
      }
    })
    io.observe(el)
  }
}

export default LazyAjax
