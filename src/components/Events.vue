<template>
  <div>
    <transition name="full-slide">
      <wall v-if="scene === 5"/>
      <div v-else>
        <div
          id="background1"
          class="bgc-image"
          :style="{ background: `url(${require('images/1.jpg')})` }"
        />
        <div
          id="background2"
          class="bgc-image"
          :style="{ background: `url(${require('images/2.jpg')})`, opacity: 0 }"
        />
        <div
          id="background3"
          class="bgc-image"
          :style="{ background: `url(${require('images/3.jpg')})`, opacity: 0 }"
        />
        <div
          id="background4"
          class="bgc-image"
          :style="{ background: `url(${require('images/4.jpg')})`, opacity: 0 }"
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

        <div class="logo" :style="color">
          <h1 id="logo-icon2" class="logo-title">2021 春酒</h1>
          <h1 id="logo-text2" class="logo-text" :style="color">
            COMING SOON
          </h1>
        </div>

        <div class="logo" :style="color">
          <h1 id="logo-icon3" class="logo-title">AC 充電站</h1>
          <h1 id="logo-text3" class="logo-text" :style="color">
            2020
          </h1>
        </div>

        <div class="logo" :style="color">
          <h1 id="logo-icon4" class="logo-title">Homecoming <br> Party</h1>
          <h1 id="logo-text4" class="logo-text" :style="color">
            2019
          </h1>
        </div>

        <div id="animate" :style="color">
          <div
            v-if="firstTime"
            id="animate2"
            class="bgc-image"
            :style="{
          background: `url(${require('images/1.jpg')})`,
          transform: 'translate(-50%, -50%)'
        }"
          />
        </div>

        <img
          v-if="scene !== 1"
          class="left"
          svg-inline
          :style="color"
          src="svgs/arrow-left.svg"
          @click="clickPrev"
        >

        <img
          class="right"
          svg-inline
          :style="color"
          src="svgs/arrow-right.svg"
          @click="clickNext"
        >
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
      firstTime: true,
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
  mounted () {
    this.tl = gsap.timeline()

    this.tl.to('#animate', { width: '10vh', height: '10vh', duration: 0.5, ease: 'ease.in' }, 0)
      .to('#animate2', { left: '5vh', top: '5vh', duration: 0.5, ease: 'ease.in' }, 0)
      .to('#animate', { width: '88vh', duration: 0.3 }, 0.4)
      .to('#animate2', { left: '44vh', duration: 0.3, ease: 'ease.in' }, 0.4)
      .to('#animate', { height: '88vh', duration: 0.4, ease: 'ease.out' }, 0.75)
      .to('#animate2', { top: '44vh', duration: 0.4, ease: 'ease.out' }, 0.75)
      .to('#animate3', {
        background: 'rgba(0,0,0,0)',
        duration: 1.5,
        ease: 'ease.in'
      }, 0.5)
      .from('.right', { opacity: 0, xPercent: '-10' }, 1)

    this.tl2 = gsap.timeline({ paused: true })
      .to('#animate', { rotate: 180, ease: 'none' }, 0)
      .to(`#background1`, { opacity: 0 }, 0.5)
      .to(`#background2`, { opacity: 1 }, 0.5)
      .to(`#logo-icon1`, { y: '-50vh' }, 0.5)
      .to(`#logo-text1`, { y: '50vh' }, 0.5)
      .to(`#logo-icon2`, { opacity: 1 }, 0.5)
      .to(`#logo-text2`, { opacity: 1 }, 0.5)
      .addPause(1)

      .to('#animate', { rotate: 360, ease: 'none' }, 1)
      .to(`#background2`, { opacity: 0 }, 1.5)
      .to(`#background3`, { opacity: 1 }, 1.5)
      .to(`#logo-icon2`, { y: '-50vh' }, 1.5)
      .to(`#logo-text2`, { y: '50vh' }, 1.5)
      .to(`#logo-icon3`, { opacity: 1 }, 1.5)
      .to(`#logo-text3`, { opacity: 1 }, 1.5)
      .addPause(2)

      .to('#animate', { rotate: 540, ease: 'none' }, 2)
      .to(`#background3`, { opacity: 0 }, 2.5)
      .to(`#background4`, { opacity: 1 }, 2.5)
      .to(`#logo-icon3`, { y: '-50vh' }, 2.5)
      .to(`#logo-text3`, { y: '50vh' }, 2.5)
      .to(`#logo-icon4`, { opacity: 1 }, 2.5)
      .to(`#logo-text4`, { opacity: 1 }, 2.5)
      .addPause(3)

    window.tl2 = this.tl2
  },
  methods: {
    clickPrev () {
      if (this.tl2.paused()) {
        this.scene--
        this.tl2.reverse()
      }
    },
    clickNext () {
      if (this.tl2.paused()) {
        this.tl2.play()
        this.scene++
        this.firstTime = false
      }
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

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  .logo {
    overflow: hidden;
    .logo-icon {
      width: 500px;
      transition: fill 0.3s;
    }

    .logo-text {
      transition: color 0.3s;
      font-size: 100px;
      font-style: normal;
      font-weight: 900;
      line-height: 50px;
      letter-spacing: 0em;
      text-align: center;

    }
  }
  .logo-title {
    opacity: 0;
    font-size: 120px;
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
    transition: opacity 0.5s, transform 0.5s;
  }

</style>
