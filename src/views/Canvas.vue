<template>
  <div class="w-screen h-screen inset-0 flex flex-row">
    <side-panel />
    <div
      id="svgContainer"
      class="h-full w-full overflow-hidden"
      v-resize="resize"
    >
      <canvas id="canvasMap"></canvas>
    </div>
    <Backdrop :value="side && isMobile" @change="toggleSide" />
  </div>
</template>

<script>
import world from "@/assets/data/world.json";
import * as topojson from "topojson-client";
import SidePanel from "@/components/Side.vue";
import { mapState, mapMutations } from "vuex";
import Backdrop from "@/components/Backdrop.vue";
import resize from "@/directive/resize";

const d3 = Object.assign(
  {},
  require("d3"),
  require("d3-geo-projection"),
  require("d3-geo-polygon")
);

export default {
  directives: {
    resize
  },
  components: {
    SidePanel,
    Backdrop
  },
  data() {
    return {
      width: null,
      height: null,
      ratio: null,
      mapdata: null,
      outline: { type: "Sphere" },
    };
  },
  computed: {
    ...mapState({
      isMobile: state => state.isMobile,
      side: state => state.side
    }),
    Features() {
      return topojson.feature(world, world.objects.countries).features;
    },
    padding() {
      return this.isMobile ? 24 : 48;
    },
    projection() {
      const projection = d3.geoGilbert();

      const containerRatio = this.width / this.height;
      if (this.ratio > containerRatio) {
        projection.fitWidth(this.width - this.padding, this.outline);
      } else {
        projection.fitHeight(this.height - this.padding, this.outline);
      }
      //   projection.scale(1000)
      projection.translate([this.width / 2, this.height / 2]); // 渲染容器的中心点

      return projection;
    }
  },
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler);
  },
  mounted() {
    this.resizeHandler();
    this.draw();
  },
  methods: {
    ...mapMutations({
      toggleDevice: "TOGGLE_DEVICE",
      toggleSide: "TOGGLE_SIDE"
    }),
    resize(w, h) {
      this.width = w;
      this.height = h;
      //   this.draw()
    },
    resizeHandler() {
      // 判断设备
      const rect = document.body.getBoundingClientRect();
      this.toggleDevice(rect.width - 3 < 1024);
      // 获取容器大小
      const svgContainer = document.getElementById("svgContainer");
      const { offsetWidth, offsetHeight } = svgContainer;
      this.resize(offsetWidth, offsetHeight);
      this.draw();
    },
    draw() {
      const canvas = document.getElementById("canvasMap");
      canvas.width = this.width;
      canvas.height = this.height;
      const context = canvas.getContext("2d");

      const path = d3.geoPath(); // 地理路径生成器，根据输入的数据得到path
      path.context(context);
      path.projection(this.projection); // 投影

      const [[x0, y0], [x1, y1]] = path.bounds(this.outline);
      this.ratio = Math.ceil(x1 - x0) / Math.ceil(y1 - y0);

      const graticule = d3.geoGraticule10();

      context.beginPath(),
        path(this.outline),
        context.clip(),
        (context.fillStyle = "#fff"),
        context.fillRect(0, 0, this.width, this.height);
      context.beginPath(),
        path(graticule),
        (context.strokeStyle = "#ccc"),
        context.stroke();
      this.Features.forEach(d => {
        context.beginPath();
        context.fillStyle = "#444";
        context.fill();
        path(d);
        context.stroke();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
