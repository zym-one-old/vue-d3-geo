<template>
  <div class="w-screen h-screen inset-0 flex flex-row">
    <side-panel />
    <div
      id="svgContainer"
      class="h-full w-full overflow-hidden"
      v-resize="resize"
    >
      <svg class="h-full w-full">
        <defs>
          <path id="outline" :d="geoPath(outline)" />
          <path id="graticule" :d="geoPath(graticule)" />
          <clipPath id="clip"><use xlink:href="#outline" /></clipPath>
        </defs>
        <g clip-path="url(#clip)">
          <!-- 白色背景 -->
          <use xlink:href="#outline" :fill="bgColor" />
          <use
            xlink:href="#outline"
            fill="none"
            :stroke="borderColor"
            :stroke-width="borderW"
          />
          <use
            xlink:href="#graticule"
            :stroke="gridColor"
            :stroke-width="gridW"
            fill="none"
          />
          <path
            :class="'geo index' + index"
            v-for="(item, index) in Features"
            :key="index"
            :d="geoPath(item)"
            :fill="unitColor"
            :stroke="unitbColor"
            :stroke-width="unitbW"
          />
        </g>
      </svg>
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
import * as versor from "versor";
import { Message } from "element-ui";
const d3Selection = require("d3-selection");

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
      outline: { type: "Sphere" }
    };
  },
  computed: {
    ...mapState({
      isMobile: state => state.isMobile,
      side: state => state.side,
      proj: state => state.projection,
      lambda: state => state.lambda,
      phi: state => state.phi,
      gamma: state => state.gamma,
      VDrag: state => state.VDrag,
      iaType: state => state.iaType,
      iaEnable: state => state.iaEnable,
      message: state => state.message,
      zoomEnable: state => state.zoomEnable,
      panEnable: state => state.panEnable,
      transform: state => state.transform,
      zoomMin: state => state.zoomMin,
      zoomMax: state => state.zoomMax,
      bgColor: state => state.bgColor,
      borderColor: state => state.borderColor,
      gridColor: state => state.gridColor,
      unitColor: state => state.unitColor,
      unitbColor: state => state.unitbColor,
      selectColor: state => state.selectColor,
      borderW: state => state.borderW,
      gridW: state => state.gridW,
      unitbW: state => state.unitbW
    }),
    Features() {
      return topojson.feature(world, world.objects.countries).features;
    },
    padding() {
      return this.isMobile ? 24 : 48;
    },
    projection() {
      const projection = this.proj.value();
      const containerRatio = this.width / this.height;
      if (this.ratio > containerRatio) {
        projection.fitWidth(this.width - this.padding, this.outline);
      } else {
        projection.fitHeight(this.height - this.padding, this.outline);
      }
      projection.translate([this.width / 2, this.height / 2]); // 渲染容器的中心点
      projection.rotate([this.lambda, this.phi, this.gamma]);

      return projection;
    },
    geoPath() {
      const path = d3.geoPath(); // 地理路径生成器，根据输入的数据得到path

      path.projection(this.projection); // 投影

      return path;
    },
    graticule() {
      const graticule = d3.geoGraticule10();
      return graticule;
    },
    zoom() {
      const zoomed = () => {
        const { transform, sourceEvent } = d3Selection.event;
        if (!this.panEnable && sourceEvent.type === "mousemove") {
          transform.x = this.transform.x;
          transform.y = this.transform.y;
        }
        this.setTransform(transform);
        d3.select("g").attr("transform", transform);
      };

      const extent = [
        [0, 0],
        [this.width, this.height]
      ];

      const zoom = d3
        .zoom()
        .extent(extent)
        .scaleExtent([this.zoomMin, this.zoomMax])
        .on("zoom", zoomed);
      return zoom;
    }
  },
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler);
  },
  mounted() {
    this.resizeHandler();
    this.ZoomPan();
    this.interaction();
    this.drag();
  },
  watch: {
    proj: function() {
      this.setRatio();
    },
    VDrag: function(newVal) {
      if (newVal) {
        this.drag();
      } else {
        d3.select("g").on(".drag", null);
      }
    },
    iaEnable: function(newVal) {
      if (newVal) {
        this.interaction();
      } else {
        d3.selectAll("path.geo").on(this.iaType, null);
      }
    },
    zoomEnable: function() {
      this.ZoomPan();
    },
    panEnable: function() {
      this.ZoomPan();
    },
    zoomMin: function() {
      this.ZoomPan();
    },
    zoomMax: function() {
      this.ZoomPan();
    },
    iaType: function(newVal, oldVal) {
      if (this.iaEnable) {
        d3.selectAll("path.geo").on(oldVal, null);
        this.interaction();
      }
    },
    message: function(newVal) {
      if (newVal) {
        this.interaction();
      }
    }
  },
  methods: {
    ...mapMutations({
      toggleDevice: "TOGGLE_DEVICE",
      toggleSide: "TOGGLE_SIDE",
      setRotateAngle: "SET_ROTATE_ANGLE",
      setTransform: "SET_TRANSFORM"
    }),
    drag() {
      let v0, q0, r0;
      const dragstarted = () => {
        const { x, y } = d3Selection.event;
        v0 = versor.cartesian(this.projection.invert([x, y]));
        q0 = versor((r0 = this.projection.rotate()));
      };

      const dragged = () => {
        const { x, y } = d3Selection.event;
        const v1 = versor.cartesian(this.projection.rotate(r0).invert([x, y]));
        const q1 = versor.multiply(q0, versor.delta(v0, v1));

        this.setRotateAngle(versor.rotation(q1));
      };

      d3.select("g").call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
      );
    },
    ZoomPan() {
      const selection = d3.select("svg").call(this.zoom);
      if (!this.zoomEnable) {
        selection.on("wheel.zoom", null);
      }
    },
    interaction() {
      d3.selectAll("path.geo").on(this.iaType, (d, i) => {
        d3.selectAll("path.geo").attr("fill", this.unitColor);
        const cls = ".geo.index" + i;
        d3.select(cls).attr("fill", this.selectColor);
        if (this.message) {
          // console.log(this.Features[i].properties);
          Message({
            showClose: true,
            message: "选中区域: " + this.Features[i].properties.name,
            // type: "success",
            duration: 1000
          });
        }
      });
    },
    resize(w, h) {
      this.width = w;
      this.height = h;
    },
    setRatio() {
      const [[x0, y0], [x1, y1]] = this.geoPath.bounds(this.outline);
      // this.ratio = Math.ceil(x1 - x0) / Math.ceil(y1 - y0);
      this.ratio = (x1 - x0) / (y1 - y0);
    },
    resizeHandler() {
      // 判断设备
      const rect = document.body.getBoundingClientRect();
      this.toggleDevice(rect.width - 3 < 1024);
      // 获取容器大小
      const svgContainer = document.getElementById("svgContainer");
      const { offsetWidth, offsetHeight } = svgContainer;
      this.resize(offsetWidth, offsetHeight);
      this.setRatio();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
