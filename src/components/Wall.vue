<template>
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
      ref="waterfall"
      class="cards"
      :imgsArr="imagesArr"
      :gap="30"
      :max-cols="4"
      :outer-styles="outerStyles"
      :short-names="shortNames"
      :img-width="300"
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
</template>

<script>
import { GoogleSpreadsheet } from 'google-spreadsheet'
import credentials from '../../credentials.json'
import VueWaterfallEasy from '../vendor/vue-waterfall-easy'
import Logo from './Logo'
export default {
  name: 'Wall',
  data () {
    return {
      hoverTag: null,
      activeTag: 'ALL',
      userData: []
    }
  },
  components: {
    VueWaterfallEasy,
    Logo
  },
  computed: {
    shortNames() {
      return this.imagesArr.map(user => {
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
      const array = this.imagesArr.map(user => {
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
    imagesArr () {
      return this.userData
        .filter(user => {
          if (this.activeTag === 'ALL') {
            return true
          } else {
            return user[5].includes(this.activeTag)
          }
        }).map(user => {
          const result = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.exec(user[2])
          return {
            ...user,
            src: result ? result[0] : '',
            href: result ? result[0] : ''
          }
        })
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
    }
  },
  created () {
    this.getData()
  },
  methods: {
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
      const doc = new GoogleSpreadsheet('1cI5oMVRVFMWxqXrE5Mz0ofh0F4bZWsDL6qOUt_cL22g')

      await doc.useServiceAccountAuth(credentials)
      await doc.loadInfo()
      const sheet = doc.sheetsById['903644344']
      const rows = await sheet.getRows()

      for (let row of rows) {
        this.userData.push(row._rawData)
      }

      setTimeout(() => {
        this.$refs.waterfall.loaded = true
      }, 3000)
    },
    openLink (link) {
      const win = window.open(link, '_blank')
      win.focus()
    }
  }
}
</script>

<style scoped lang="scss">
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
      padding-bottom: 50px;
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
