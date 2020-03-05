<template>
  <div />
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
    const svg = d3.select(this.$el).append('svg')
    console.log(svg)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
