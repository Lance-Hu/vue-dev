export default {
  activated() {
    const scrollTop = this.$route.meta.scrollTop
    const $content = document.querySelector('.m-innerPanel-bd') // 自定义: pageView里的class
    if (scrollTop && $content) {
      $content.scrollTop = scrollTop
    }
  }
}
