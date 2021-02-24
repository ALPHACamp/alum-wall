<template>
  <div style="overflow: hidden">
    <div class="wall">
      <logo class="logo" />

      <div class="tags">
        <div
          v-for="tag in tags"
          :key="tag.key"
          :style="tag.style"
          class="tag"
          @mouseover="hoverTag = tag.key"
          @mouseleave="hoverTag = null"
          @click="activeTag = tag.key"
        >
          {{ tag.key }}
        </div>
      </div>

      <vue-waterfall-easy
        :key="activeTag"
        ref="waterfall"
        class="cards"
        :imgsArr="userData"
        :gap="30"
        :max-cols="4"
        :outer-styles="outerStyles"
        :short-names="shortNames"
        :img-width="300"
        :animate-promise="animatePromise"
        :reach-bottom-distance="400"
        :style="{ zIndex: 100}"
        @scrollReachBottom="pushData"
      >
        <div
          v-if="currentTag"
          class="card"
          slot-scope="props"
        >
          <div class="info-top">
            <h3 class="name">
              {{ props.value[0] }}
            </h3>

            <div class="fz12" style="display: flex;align-items: center; justify-content: space-between">
            <span>
              {{ props.value[3] }}
            </span>
              <span>
              {{ props.value[7] }}
            </span>
            </div>

            <div style="margin: 5px 0; display: flex;align-items: center; justify-content: space-between">
            <span class="fz10">
              {{ props.value[4] }}
            </span>

              <div class="icons">
                <img
                  v-if="props.value[1]"
                  svg-inline
                  :style="{ fill: outerStyles[props.index].color }"
                  src="svgs/email.svg"
                  @click="openLink(`mailto:${props.value[1]}`)"
                >
                <img
                  v-if="props.value[9]"
                  svg-inline
                  :style="{ fill: outerStyles[props.index].color }"
                  src="svgs/facebook.svg"
                  @click="openLink(props.value[9])"
                >
                <img
                  v-if="props.value[10]"
                  svg-inline
                  :style="{ fill: outerStyles[props.index].color }"
                  src="svgs/linkdin.svg"
                  @click="openLink(props.value[10])"
                >
              </div>
            </div>

            <span class="fz10">
              {{ props.value[11] }}
            </span>
          </div>

          <div class="info-bottom" :style="{ borderTop: `1px solid ${outerStyles[props.index].color}` }">
          <span class="fz10">
            {{ props.value[5] }}
          </span>
          </div>
        </div>
      </vue-waterfall-easy>
    </div>
    <div class="event" >
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
  </div>
</template>

<script>
import Logo from './Logo'
import gsap from 'gsap'
import { GoogleSpreadsheet } from "google-spreadsheet"
import VueWaterfallEasy from "../vendor/vue-waterfall-easy"

window.gsap = gsap
export default {
  name: 'Event',
  components: {
    Logo,
    VueWaterfallEasy,
  },
  data () {
    return {
      page: 0,
      isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
      tl: null,
      tl2: null,
      scene: 1,
      hoverTag: null,
      activeTag: 'ALL',
      rawArray: [],
      userData: [],
      resolve: null,
      animatePromise: null
    }
  },
  created() {
    this.animatePromise = new Promise((resolve) => {
      this.resolve = resolve
    })
  },
  watch: {
    currentTag() {
      if (this.activeTag === 'ALL') {
        this.userData = this.rawArray
      } else {
        this.userData = this.rawArray.filter(user => {
          return user[5].includes(this.activeTag)
        })
      }
      setTimeout(() => {
        this.$refs.waterfall.loaded = true
      }, 2000)
    }
  },
  computed: {
    shortNames() {
      return this.userData.map(user => {
        let name = user[0]
        if (name[0].toString().match(/[\u3400-\u9FBF]/)) {
          return name[0]
        } else if (name[0] && name[1]) {
          return name[0].toUpperCase() + name[1].toUpperCase()
        } else {
          return name[0].toUpperCase()
        }
      })
    },
    outerStyles () {
      const array = this.userData.map(user => {
        const klass = this.tagsData[user[5]]
        let color = klass ? this.tagsData[user[5]].color : '#F9E7C0'

        return {
          border: `2px solid ${color}`,
          color,
          backgroundColor: this.hexToRgb(color, 0.5)
        }
      })
      return array
    },
    currentTag () {
      return this.tagsData[this.activeTag]
    },
    tagsData () {
      return {
        'ALL': {
          key: 'ALL',
          color: '#F9E7C0'
        },
        'Web Development': {
          key: 'Web Development',
          color: '#F44D71'
        },
        'Digital Marketing': {
          key: 'Digital Marketing',
          color: '#F7A937'
        },
        'iOS Development': {
          key: 'iOS Development',
          color: '#04BF7B'
        },
        'Product Design': {
          key: 'Product Design',
          color: '#4393D9'
        }
      }
    },

    tags () {
      return Object.keys(this.tagsData).map(key => {
        const tag = this.tagsData[key]
        const hovering = this.hoverTag === tag.key
        const clicked = this.activeTag === tag.key

        return {
          ...tag,
          style: {
            border: `1px solid ${tag.color}`,
            color: hovering || clicked ? 'white' : tag.color,
            backgroundColor: hovering || clicked ? this.hexToRgb(tag.color) : 'transparent'
          }
        }
      })
    },
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
    },
    key() {
      return {
        "type": "service_account",
        "project_id": "pagihub",
        "private_key_id": process.env.VUE_APP_PRIVATE_KEY_ID,
        "private_key": process.env.VUE_APP_PRIVATE_KEY,
        "client_email": "ac2-135@pagihub.iam.gserviceaccount.com",
        "client_id": "110224692483501250114",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ac2-135%40pagihub.iam.gserviceaccount.com"
      }
    }
  },
  methods: {
    pushData() {
      if (this.page >= this.rawArray.length / 10) return
      const data = this.rawArray.slice(this.page * 10, (this.page + 1) * 10).filter(user => {
        if (this.activeTag === 'ALL') {
          return true
        } else {
          return user[5].includes(this.activeTag)
        }
      })
      this.userData.push(...data)
      this.page++
      if (this.rawArray.length === this.userData.length) {
        this.$refs.waterfall.loaded = true
      }
    },
    hexToRgb (hex, opacity = 0.3) {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b
      })

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      const object = {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
      return `rgba(${object.r}, ${object.g}, ${object.b}, ${opacity})`
    },

    async getData () {
      const doc = new GoogleSpreadsheet(process.env.VUE_APP_GOOGLE_SHEET_ID)
      await doc.useServiceAccountAuth(this.key)
      await doc.loadInfo()
      const sheet = doc.sheetsById['903644344']
      const rows = await sheet.getRows()

      for (let row of rows) {
        const user = row._rawData
        const result = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.exec(user[2])
        this.rawArray.push({
          ...user,
          src: result ? result[0] : '',
          href: result ? result[0] : ''
        })
      }

      this.pushData()
    },
    openLink (link) {
      const win = window.open(link, '_blank')
      win.focus()
    },
    action() {
      this.$nextTick(() => {
        this.tl = gsap.timeline()
        let px
        if (window.innerHeight > window.innerWidth) {
          px = window.innerWidth / 100
        } else {
          px = window.innerHeight / 100
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
              this.resolve()
            })
            .to('.event', { xPercent: -100 , duration: 0.8, ease: 'ease.outIn' }, 2)
            // .from('.wall', { xPercent: -100 , duration: 0.8, ease: 'ease.out' }, 2)
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
    //height: calc(100vh - var(--vh-offset, 0px));
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
.event {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 111;
}

  ::v-deep.icons svg{
    width: 20px;
    margin-right: 5px;
    opacity: 0.5;
    cursor: pointer;
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }
  }
  .flex {
    display: flex;
  }
  .fz12 {
    font-size: 12px;
  }
  .fz10 {
    font-size: 10px;
  }
  .wall {
    display: flex;
    flex-direction: column;
  }
  .tags {
    max-width: 760px;
    padding: 3%;
    flex: 1;
    margin: 0 auto;
    width: 95%;
    text-align: center;
  }
  @media (max-width:991px) {
    .tags{
      margin-top: 50px;
    }
    .cards {
      padding-bottom: 5px;
    }
  }
  .card {
    text-align: left;
  }
  .info-top {
    padding: 10px;
  }
  .info-bottom {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  span, h3 {
    text-decoration: none;
  }
  .tag {
    display: inline-block;
    margin: 5px 15px;
    padding: 5px 10px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.5s ease-in-out, color 0.3s ease-in-out;
  }
  .name {
    margin-top: 0;
    margin-bottom: 10px;
  }
  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .wall {
    height: 100%;
  }
</style>
