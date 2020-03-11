<template>
  <div
    class="side-panel flex-shrink-0 flex flex-row bg-white"
    :class="sideClass"
    v-touch="touch"
    onselectstart="return false"
  >
    <div class="w-full flex flex-col overflow-hidden">
      <!--  -->
      <div class="border-b block">
        <ul class="w-full h-full flex  flex-row  items-center justify-around">
          <li
            v-for="(item, index) in options"
            :key="index"
            :class="{ 'border-teal-600': current === item.name }"
            class="py-3 font-bold font-sans hover:bg-gray-300 cursor-pointer w-full border-b-4 border-transparent"
            @click="changeMenu(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!--  -->
      <projection-list v-if="current === '投影'" />
      <options v-if="current === '选项'" />
    </div>
    <div style="width:0px;" v-if="!(isMobile && side)">
      <div class="sidebutton" @click="toggleSide" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import touch from "@/directive/touch";
import projectionList from "./side/projections";
import options from "./side/options";

export default {
  directives: {
    touch
  },
  components: {
    projectionList,
    options
  },
  data() {
    return {
      menuOpen: false,
      current: "投影",
      options: [
        {
          name: "投影"
        },
        {
          name: "选项"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      isMobile: state => state.isMobile,
      side: state => state.side
    }),
    sideClass() {
      let str = "";
      if (this.isMobile) str += "mb";
      if (!this.side) str += " shrink";
      return str;
    }
  },
  methods: {
    ...mapMutations({
      toggleSide: "TOGGLE_SIDE"
    }),
    changeMenu(name) {
      this.current = name;
    },
    touch(move, end) {
      let screenX = document.body.clientWidth;
      let vw = (100 * move) / screenX;
      let sidepanel = document.getElementsByClassName("side-panel")[0];
      let Backdrop = document.getElementById("Backdrop");
      if (end) {
        if (vw >= 35) {
          sidepanel.style.transitionDuration = "";
          this.toggleSide();
          sidepanel.style.marginLeft = "";
          if (Backdrop) Backdrop.style.opacity = "";
        } else if (vw < 35) {
          sidepanel.style.marginLeft = "";
          if (Backdrop) Backdrop.style.opacity = "";
          sidepanel.style.transitionDuration = "0.25s";
        }
      } else {
        sidepanel.style.marginLeft = "-" + vw.toString() + "vw";
        sidepanel.style.transitionDuration = "0s";
        if (Backdrop) Backdrop.style.opacity = 0.3 * (1 - vw / 80);
      }
    }
  }
};
</script>

<style lang="scss">
$side-panel-width: 380px;
$nav-mb-height: 70px;

.side-panel {
  width: $side-panel-width;
  height: 100%;
  z-index: 202;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  transition: all 250ms ease 0s;
  &.shrink {
    margin-left: -$side-panel-width;
    transition: all 250ms ease 0s;
    box-shadow: none;
  }
  &.mb {
    position: absolute;
    // height: calc(100vh - #{$nav-mb-height} - 5vh);
    width: 80vw;
    &.shrink {
      margin-left: -80vw;
      transition-duration: 0.2s;
      box-shadow: none;
    }
  }

  .sidebutton {
    background-color: rgba($color: #696969, $alpha: 0.3);
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 0 50% 50% 0;
    border-right: 1px solid #fff;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    position: relative;
    z-index: 2000;
    top: 15px;
    left: 0px;
    width: 30px;
    height: 40px;
    cursor: pointer;
  }
  .sidebutton:hover {
    background-color: rgba($color: #696969, $alpha: 0.5);
  }
}
</style>
