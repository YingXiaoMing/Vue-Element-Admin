import store from '@/store'

export default {
  watch: {

  },
  beforeMount() {},
  beforeDestroy() {},
  mounted() {},
  methods: {
    closeTag(toPath, refresh) {
      const currentPath = this.$route.fullPath
      const view = this.$store.state.tagsView.visitedViews.find(a => a.path.toLowerCase() == currentPath.split('?')[0].toLowerCase())
      this.$store.dispatch('tagsView/delView', view).then(({
        visitedViews
      }) => {
        if (toPath) {
          if (refresh) {
            const toPathView = this.$store.state.tagsView.visitedViews.find(a => a.path.toLowerCase() == toPath.split('?')[0].toLowerCase())
            this.$store.dispatch('tagsView/delCachedView', toPathView).then(() => {
              const {
                fullPath
              } = toPathView
              this.$nextTick(() => {
                this.$router.replace({
                  path: '/redirect' + fullPath
                })
              })
            })
          } else {
            this.$router.push(toPath)
          }
        } else {
          const latestView = visitedViews.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            if (view.name === 'Dashboard') {
              this.$router.replace({
                path: '/redirect' + view.fullPath
              })
            } else {
              this.$router.push('/')
            }
          }
        }
      })
    },
    gotoTag(toPath, refresh) {
      console.log('toPath: ', toPath)
      console.log('tagsView: ', this.$store.state.tagsView.visitedViews)
      if (!refresh) { this.$router.push(toPath) } else {
        const toPathView = this.$store.state.tagsView.visitedViews.find(a => a.path.toLowerCase() == toPath.split('?')[0].toLowerCase())
        console.log('topath view: ', toPathView)
        if (toPathView) {
          this.$store.dispatch('tagsView/delCachedView', toPathView).then(() => {
            this.$nextTick(() => {
              this.$router.replace({
                path: '/redirect' + toPath
              })
            })
          })
        } else {
          this.$nextTick(() => {
            this.$router.replace({
              path: '/redirect' + toPath
            })
          })
        }
      }
    }
  }
}
