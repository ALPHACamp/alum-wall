<template>
  <div>
    <transition name="full-slide">
      <wall v-if="scene === 2"/>
      <div v-else>
        <div
          id="background1"
          class="bgc-image"
          :style="{ background: `url(${require('images/1.jpg')})` }"
        />
        <div
          id="animate3"
          class="bgc-image"
          :style="{
        background: 'rgba(47, 48, 53, 0.7)',
      }"
        />

        <div class="logo" :style="color">
          <img
            id="logo-icon1"
            class="logo-icon"
            svg-inline
            src="svgs/logo.svg"
          >
          <h1 id="logo-text1" class="logo-text" :style="color">
            Alumni
          </h1>
        </div>

        <div id="animate" :style="color">
<!--          <div-->
<!--            v-if="!isSafari"-->
<!--            id="animate2"-->
<!--            class="bgc-image"-->
<!--            :style="{-->
<!--              background: `url(${require('images/1.jpg')})`,-->
<!--              transform: 'translate(-50%, -50%)'-->
<!--            }"-->
<!--          />-->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Logo from './Logo'
import gsap from 'gsap'
import Wall from './Wall'

window.gsap = gsap
export default {
  name: 'Event',
  components: {
    Logo,
    Wall
  },
  data () {
    return {
      isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
      tl: null,
      tl2: null,
      scene: 1
    }
  },
  computed: {
    color () {
      let color
      switch (this.scene) {
        case 1:
          color = '#F9E7C0'
          break
        case 2:
          color = '#04BF7B'
          break
        case 3:
          color = '#FF6600'
          break
        case 4:
          color = '#F44D71'
          break
      }
      return { fill: color, color, borderColor: color }
    }
  },
  methods: {
    action() {
      this.$nextTick(() => {
        this.tl = gsap.timeline()
        let unit
        let px
        if (window.innerHeight > window.innerWidth) {
          px = window.innerWidth/ 100
        } else {
          px = window.innerHeight/ 100
        }

        this.tl.to('#animate', { width: `${10 * px}px`, height: `${10 * px}px`, duration: 0.5, ease: 'ease.in' }, 0)
            .to('#animate2', { left: `${5 * px}px`, top: `${5 * px}px`, duration: 0.5, ease: 'ease.in' }, 0)
            .to('#animate', { width: `${88 * px}px`, duration: 0.5 }, 0.4)
            .to('#animate2', { left: `${44 * px}px`, duration: 0.5, ease: 'ease.in' }, 0.4)
            .to('#animate', { height: `${88 * px}px`, duration: 0.6, ease: 'ease.out' }, 0.75)
            .to('#animate2', { top: `${44 * px}px`, duration: 0.6, ease: 'ease.out' }, 0.75)
            .to('#animate3', {
              background: 'rgba(0,0,0,0)',
              duration: 1.5,
              ease: 'ease.in'
            }, 0.5)
            .eventCallback('onComplete', () => {
              this.scene = 2
            })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  #animate2 {
    position: fixed;
  }

  #animate {
    border: 5px solid #F9E7C0;
    width: 0;
    height: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    overflow: hidden;
  }

  .bgc-image {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-size: cover !important;
    background-position: center !important;
  }

  .logo {
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .right {
    right: 5vw;
  }

  .left {
    left: 5vw;
  }

  .right, .left {
    cursor: pointer;
    position: absolute;
    width: 50px;
    top: 50%;
    background: rgba(0, 0, 0, 0);
    padding: 10px;
    border-radius: 50%;
    fill: #F9E7C0;
    color: #F9E7C0;
    transform: translateY(-50%);
    transition: background-color 0.5s;
    z-index: 10;
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  .logo {
    overflow: hidden;
    .logo-icon {
      width: calc(250px + 6 * ((100vw - 120px) / 40));
      transition: fill 0.3s;
    }

    .logo-text {
      transition: color 0.3s;
      font-size: calc(50px + 6 * ((100vw - 120px) / 200));
      font-style: normal;
      font-weight: 900;
      line-height: 50px;
      letter-spacing: 0em;
      text-align: center;

    }
  }
  .logo-title {
    opacity: 0;
    font-size: calc(50px + 6 * ((100vw - 120px) / 140));
  }
  #logo-text4 {
    font-size: calc(35px + 6 * ((100vw - 120px) / 200));
  }
  #logo-text2, #logo-text3, #logo-text4 {
    font-size: 50px;
    opacity: 0;
  }
  .full-slide-enter,
  .full-slide-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
  .full-slide-enter-active,
  .full-slide-leave-active {
    transition: opacity 0.7s, ease-out, transform 0.7s, ease-out;
  }

</style>
