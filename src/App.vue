<template>
  <div id="app">
    <events ref="event"  class="main" />
    <div v-if="!response_id" class="typeform" :style="{ zIndex: response_id ? 0 : 2 }"/>
  </div>
</template>

<script>
import Events from './components/Events'
const ROOT_PATH = 'https://alum.alphacamp.co/2021/'

export default {
  name: 'app',
  components: {
    Events
  },
  data () {
    return {
      response_id: null,
      loaded: false,
      og_image: ROOT_PATH + require('/2021/images/alumi.png')
    }
  },
  mounted () {
    console.log('version 1.6.2')
    if (window.location.hash === '#wall') {
      this.$refs.event.getData()
      setTimeout(() => {
        this.response_id = 123
        const image = new Image()
        image.onload = () => {
          this.$refs.event.action()
          this.loaded = true
        }
        image.src = require('/2021/images/1.jpg')
      }, 500)
    } else {
      window.addEventListener('DOMContentLoaded', () => {
        window.typeformEmbed.makeWidget(
          document.querySelector('.typeform')
          , 'https://ac-bootcamp.typeform.com/to/mNNpUGgw', {
            hideFooter: true,
            hideHeaders: true,
            onSubmit: this.submit
          })
      })
    }
  },
  methods: {
    async submit (event) {
      setTimeout(() => {
        this.response_id = event.response_id
        if (document.querySelector('[data-qa="mobile-modal"]')) {
          document.querySelector('[data-qa="mobile-modal"]').style.maxHeight = 0
        }

        this.$refs.event.getData()
        this.$refs.event.action()
      }, 1500)
    }
  }
}
</script>

<style lang="scss">
#app, .typeform, .main {
  font-family: Nunito Sans, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  height: calc(100vh - var(--vh-offset, 0px));
  width: 100vw;
  background: #2F3035;
}
  .typeform, .main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  :focus {
    outline: none;
  }
  .main {
    z-index: 1;
  }
.hide-typeform [data-qa="mobile-modal"]{
  display: none;
}
</style>
