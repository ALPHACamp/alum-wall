<template>
  <div id="app">
    <events v-if="response_id" class="main"/>
    <div v-else class="typeform" />
  </div>
</template>

<script>
import Events from './components/Events'

export default {
  name: 'app',
  components: {
    Events
  },
  data () {
    return {
      response_id: null
    }
  },
  created () {
    window.addEventListener("DOMContentLoaded", () => {
      window.typeformEmbed.makeWidget(
        document.querySelector('.typeform')
        , "https://ac-bootcamp.typeform.com/to/mNNpUGgw", {
        hideFooter: true,
        hideHeaders: true,
        onSubmit: async (event) => {
          this.response_id = event.response_id
        }
      })
    })
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
  width: 100vw;
  background: #2F3035;
}
.typeform, .main {
  z-index: 1;
}
  .typeform {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  :focus {
    outline: none;
  }
</style>
