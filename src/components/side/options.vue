<template>
  <div class="overflow-y-auto pb-4 scrolling-touch px-2">
    <option-card title="旋转" subTitle="rotation">
      <template #content>
        <div
          class="text-left font-bold text-sm py-3 uppercase flex flex-row flex-wrap justify-between"
        >
          <div class="pr-3 flex-shrink-0">
            拖动旋转
            <span class="italic">
              # Versor Dragging
            </span>
          </div>
          <el-switch v-model="VDragT"> </el-switch>
        </div>
        <ul class="flex flex-row justify-between">
          <li class="my-1 flex justify-center flex-col">
            <span
              class="font-bold font-mono  w-full flex-shrink-0 cursor-pointer hover:text-teal-600"
              @click="lambdaT = 0"
              >lambda(λ)</span
            >
            <div class="w-full flex justify-center py-3">
              <el-slider
                vertical
                v-model="lambdaT"
                :show-tooltip="false"
                :min="-180"
                :max="180"
                :step="0.01"
                height="120px"
              ></el-slider>
            </div>
            <span class="font-bold font-mono  w-full flex-shrink-0 text-sm">{{
              lambda.toFixed(2)
            }}</span>
          </li>
          <li class="my-1 flex justify-center flex-col">
            <span
              class="font-bold font-mono  w-full flex-shrink-0 cursor-pointer hover:text-teal-600"
              @click="phiT = 0"
              >phi(φ)</span
            >
            <div class="w-full flex justify-center py-3">
              <el-slider
                vertical
                v-model="phiT"
                :show-tooltip="false"
                :min="-90"
                :max="90"
                :step="0.01"
                height="120px"
              ></el-slider>
            </div>
            <span class="font-bold font-mono w-full flex-shrink-0 text-sm">{{
              phi.toFixed(2)
            }}</span>
          </li>
          <li class="my-1 flex justify-center  flex-col">
            <span
              class="font-bold font-mono  w-full flex-shrink-0 cursor-pointer hover:text-teal-600"
              @click="gammaT = 0"
              >gamma(γ)</span
            >
            <div class="w-full flex justify-center py-3">
              <el-slider
                vertical
                v-model="gammaT"
                :show-tooltip="false"
                :min="-180"
                :max="180"
                :step="0.01"
                height="120px"
              ></el-slider>
            </div>
            <span class="font-bold font-mono w-full flex-shrink-0 text-sm">{{
              gamma.toFixed(2)
            }}</span>
          </li>
        </ul>
      </template>
    </option-card>
    <option-card title="交互" subTitle="Interaction">
      <template #content>
        <ul class="text-left font-bold text-sm uppercase ">
          <li class="my-3 flex flex-row flex-wrap justify-between">
            <div class="pr-3 flex-shrink-0">
              允许选中地理单元
            </div>
            <el-switch v-model="iaEnableT"> </el-switch>
          </li>
          <li class="my-3 flex flex-row flex-wrap">
            <div class="pr-4 flex-shrink-0">
              方式:
            </div>
            <template>
              <el-radio v-model="iaTypeT" label="click" :disabled="!iaEnableT"
                >click</el-radio
              >
              <el-radio
                v-model="iaTypeT"
                label="mouseover"
                :disabled="!iaEnableT"
                >mouseover</el-radio
              >
            </template>
          </li>
          <li class="my-3 flex flex-row flex-wrap">
            <div class="pr-4 flex-shrink-0">
              事件:
            </div>
            <template>
              <el-checkbox v-model="messageT" :disabled="!iaEnableT"
                >消息提示</el-checkbox
              >
            </template>
          </li>
        </ul>
      </template>
    </option-card>
    <option-card title="缩放 & 移动" subTitle="Zoom & Pan">
      <template #content>
        <ul class="text-left font-bold text-sm uppercase ">
          <li class="my-3 flex flex-row flex-wrap justify-between">
            <div class="pr-3 flex-shrink-0 ">
              允许缩放
            </div>
            <el-switch v-model="zoomEnableT"> </el-switch>
          </li>
          <li class="my-3 flex flex-row flex-wrap justify-between">
            <div class="pr-3 flex-shrink-0">
              允许移动
            </div>
            <el-switch v-model="panEnableT"> </el-switch>
          </li>
          <li class="my-3 flex flex-row flex-wrap justify-between">
            <div class="pr-3 flex-shrink-0 lowercase">
              缩放范围:
            </div>
            <span class="normal-case">
              当前Scale {{ transform.k.toFixed(2) }}
            </span>
          </li>
          <li class="my-3 flex flex-col flex-wrap justify-between">
            <ul
              class="w-full pt-1 flex flex-row font-light lowercase justify-around"
            >
              <li class="flex flex-col items-center mb-1">
                <span class="w-10 flex-shrink-0 text-center">min</span>
                <el-input-number
                  size="mini"
                  :step="0.1"
                  :min="0.1"
                  :max="1"
                  :step-strictly="true"
                  :disabled="!zoomEnableT"
                  v-model="zoomMinT"
                ></el-input-number>
              </li>
              <li class="flex flex-col items-center">
                <span class="w-10  flex-shrink-0 text-center">max</span>
                <el-input-number
                  size="mini"
                  :step="0.5"
                  :min="1"
                  :max="10"
                  :step-strictly="true"
                  :disabled="!zoomEnableT"
                  v-model="zoomMaxT"
                ></el-input-number>
              </li>
            </ul>
          </li>
        </ul>
      </template>
    </option-card>
    <option-card title="外观" subTitle="Appearance">
      <template #content>
        <ul class="text-left font-bold text-sm uppercase ">
          <li class="my-2 flex flex-row flex-wrap justify-between items-center">
            <div class="pr-3 flex-shrink-0">
              背景颜色
            </div>
            <el-color-picker v-model="bgColorT" size="mini"></el-color-picker>
          </li>
          <li class="my-2 flex flex-row flex-wrap justify-between items-center">
            <div class="pr-3 flex-shrink-0">
              边界颜色
            </div>
            <el-color-picker
              v-model="borderColorT"
              size="mini"
            ></el-color-picker>
          </li>
          <li class="my-2 flex flex-row flex-wrap justify-between items-center">
            <div class="pr-3 flex-shrink-0">
              网格颜色
            </div>
            <el-color-picker v-model="gridColorT" size="mini"></el-color-picker>
          </li>
          <li class="my-2 flex flex-row flex-wrap justify-between items-center">
            <div class="pr-3 flex-shrink-0">
              单元颜色
            </div>
            <el-color-picker v-model="unitColorT" size="mini"></el-color-picker>
          </li>
          <li class="my-2 flex flex-row flex-wrap justify-between items-center">
            <div class="pr-3 flex-shrink-0">
              单元边界颜色
            </div>
            <el-color-picker
              v-model="unitbColorT"
              size="mini"
            ></el-color-picker>
          </li>
          <li class="my-2 flex flex-row flex-wrap justify-between items-center">
            <div class="pr-3 flex-shrink-0">
              选中颜色
            </div>
            <el-color-picker
              v-model="selectColorT"
              size="mini"
            ></el-color-picker>
          </li>
          <li class="my-2 flex flex-row flex-wrap justify-between items-center">
            <div class="pr-3 flex-shrink-0">
              边界线宽度
            </div>
            <el-input-number
              size="mini"
              :step="0.1"
              :min="0.1"
              :max="3"
              :step-strictly="true"
              v-model="borderWT"
            ></el-input-number>
          </li>
          <li class="my-2 flex flex-row flex-wrap justify-between items-center">
            <div class="pr-3 flex-shrink-0">
              网格线宽度
            </div>
            <el-input-number
              size="mini"
              :step="0.1"
              :min="0.1"
              :max="3"
              :step-strictly="true"
              v-model="gridWT"
            ></el-input-number>
          </li>
          <li class="my-2 flex flex-row flex-wrap justify-between items-center">
            <div class="pr-3 flex-shrink-0">
              单元边界线宽度
            </div>
            <el-input-number
              size="mini"
              :step="0.1"
              :min="0.1"
              :max="3"
              :step-strictly="true"
              v-model="unitbWT"
            ></el-input-number>
          </li>
        </ul>
      </template>
    </option-card>
  </div>
</template>

<script>
import OptionCard from "./card";
import projections from "@/assets/js/projections";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    OptionCard
  },
  data() {
    return {
      projections
    };
  },
  computed: {
    ...mapState({
      projection: state => state.projection,
      lambda: state => state.lambda,
      phi: state => state.phi,
      gamma: state => state.gamma,
      VDrag: state => state.VDrag,
      iaEnable: state => state.iaEnable,
      iaType: state => state.iaType,
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
    lambdaT: {
      get() {
        return this.lambda;
      },
      set(newValue) {
        this.setLambda(newValue);
        return newValue;
      }
    },
    phiT: {
      get() {
        return this.phi;
      },
      set(newValue) {
        this.setPhi(newValue);
        return newValue;
      }
    },
    gammaT: {
      get() {
        return this.gamma;
      },
      set(newValue) {
        this.setGamma(newValue);
        return newValue;
      }
    },
    VDragT: {
      get() {
        return this.VDrag;
      },
      set(newValue) {
        this.setVDrag(newValue);
        return newValue;
      }
    },
    iaEnableT: {
      get() {
        return this.iaEnable;
      },
      set(newValue) {
        this.setIaEnable(newValue);
        return newValue;
      }
    },
    iaTypeT: {
      get() {
        return this.iaType;
      },
      set(newValue) {
        this.setIaType(newValue);
        return newValue;
      }
    },
    messageT: {
      get() {
        return this.message;
      },
      set(newValue) {
        this.setMessage(newValue);
        return newValue;
      }
    },
    zoomEnableT: {
      get() {
        return this.zoomEnable;
      },
      set(newValue) {
        this.setZoomEnable(newValue);
        return newValue;
      }
    },
    panEnableT: {
      get() {
        return this.panEnable;
      },
      set(newValue) {
        this.setPanEnable(newValue);
        return newValue;
      }
    },
    zoomMinT: {
      get() {
        return this.zoomMin;
      },
      set(newValue) {
        this.setZoomMin(newValue);
        return newValue;
      }
    },
    zoomMaxT: {
      get() {
        return this.zoomMax;
      },
      set(newValue) {
        this.setZoomMax(newValue);
        return newValue;
      }
    },
    bgColorT: {
      get() {
        return this.bgColor;
      },
      set(newValue) {
        this.setBgColor(newValue);
        return newValue;
      }
    },
    borderColorT: {
      get() {
        return this.borderColor;
      },
      set(newValue) {
        this.setBorderColor(newValue);
        return newValue;
      }
    },
    gridColorT: {
      get() {
        return this.gridColor;
      },
      set(newValue) {
        this.setGridColor(newValue);
        return newValue;
      }
    },
    unitColorT: {
      get() {
        return this.unitColor;
      },
      set(newValue) {
        this.setUnitColor(newValue);
        return newValue;
      }
    },
    unitbColorT: {
      get() {
        return this.unitbColor;
      },
      set(newValue) {
        this.setUnitbColor(newValue);
        return newValue;
      }
    },
    selectColorT: {
      get() {
        return this.selectColor;
      },
      set(newValue) {
        this.setSelectColor(newValue);
        return newValue;
      }
    },
    borderWT: {
      get() {
        return this.borderW;
      },
      set(newValue) {
        this.setBorderW(newValue);
        return newValue;
      }
    },
    gridWT: {
      get() {
        return this.gridW;
      },
      set(newValue) {
        this.setGridW(newValue);
        return newValue;
      }
    },
    unitbWT: {
      get() {
        return this.unitbW;
      },
      set(newValue) {
        this.setUnitbW(newValue);
        return newValue;
      }
    }
  },
  methods: {
    ...mapMutations({
      ChangeProjection: "CHANGE_PROJECTION",
      setLambda: "SET_LAMBDA",
      setPhi: "SET_PHI",
      setGamma: "SET_GAMMA",
      setVDrag: "SET_VDRAG",
      setIaEnable: "SET_IAENABLE",
      setIaType: "SET_IATYPE",
      setMessage: "SET_MESSAGE",
      setZoomEnable: "SET_ZOOM_ENABLE",
      setPanEnable: "SET_PAN_ENABLE",
      setTransform: "SET_TRANSFORM",
      setZoomMin: "SET_ZOOM_MIN",
      setZoomMax: "SET_ZOOM_MAX",
      setBgColor: "SET_BG_COLOR",
      setBorderColor: "SET_BORDER_COLOR",
      setGridColor: "SET_GRID_COLOR",
      setUnitColor: "SET_UNIT_COLOR",
      setUnitbColor: "SET_UNITB_COLOR",
      setSelectColor: "SET_SELECT_COLOR",
      setBorderW: "SET_BORDER_W",
      setGridW: "SET_GRID_W",
      setUnitbW: "SET_UNITB_W"
    })
  }
};
</script>
