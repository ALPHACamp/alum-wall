<template>
  <div
    :style="{
        fill: color ,
        color
      }">
    <img
      svg-inline
      src="svgs/logo.svg"
    >
    <h1>
      Alumni
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    color: {
      type: String,
      default: '#434243'
    }
  }
}
</script>

<style scoped lang="scss">
  svg {
    width: calc(250px + 6 * ((100vw - 120px) / 40));
  }
  h1  {
    font-size: calc(50px + 6 * ((100vw - 120px) / 200));
    font-style: normal;
    font-weight: 900;
    line-height: 50px;
    letter-spacing: 0em;
    text-align: center;

  }
</style>
