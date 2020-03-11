import Vue from "vue";
import Vuex from "vuex";
import projections from "@/assets/js/projections";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMobile: false,
    side: true,
    projection: projections[0],
    lambda: 0,
    phi: 0,
    gamma: 0,
    VDrag: true,
    iaType: "click",
    iaEnable: true,
    message: true,
    zoomEnable: true,
    panEnable: true,
    transform: { k: 1, x: 0, y: 0 },
    zoomMin: 0.5,
    zoomMax: 5,
    bgColor: "#ffffff",
    borderColor: "#000000",
    gridColor: "#ccc",
    unitColor: "#444",
    unitbColor: "#ffffff",
    selectColor: "#FF0000",
    borderW: "1",
    gridW: "1",
    unitbW: "0.3"
  },
  mutations: {
    TOGGLE_DEVICE(state, isMobile) {
      state.isMobile = isMobile;
    },
    TOGGLE_SIDE(state) {
      state.side = !state.side;
    },
    CHANGE_PROJECTION(state, projection) {
      state.projection = projection;
    },
    SET_ROTATE_ANGLE(state, rotateAngle) {
      state.lambda = rotateAngle[0];
      state.phi = rotateAngle[1];
      state.gamma = rotateAngle[2];
    },
    SET_LAMBDA(state, val) {
      state.lambda = val;
    },
    SET_PHI(state, val) {
      state.phi = val;
    },
    SET_GAMMA(state, val) {
      state.gamma = val;
    },
    SET_VDRAG(state, val) {
      state.VDrag = val;
    },
    SET_IAENABLE(state, val) {
      state.iaEnable = val;
    },
    SET_IATYPE(state, val) {
      state.iaType = val;
    },
    SET_MESSAGE(state, val) {
      state.message = val;
    },
    SET_ZOOM_ENABLE(state, val) {
      state.zoomEnable = val;
    },
    SET_PAN_ENABLE(state, val) {
      state.panEnable = val;
    },
    SET_TRANSFORM(state, val) {
      state.transform = val;
    },
    SET_ZOOM_MIN(state, val) {
      state.zoomMin = val;
    },
    SET_ZOOM_MAX(state, val) {
      state.zoomMax = val;
    },
    SET_BG_COLOR(state, val) {
      state.bgColor = val;
    },
    SET_BORDER_COLOR(state, val) {
      state.borderColor = val;
    },
    SET_GRID_COLOR(state, val) {
      state.gridColor = val;
    },
    SET_UNIT_COLOR(state, val) {
      state.unitColor = val;
    },
    SET_UNITB_COLOR(state, val) {
      state.unitbColor = val;
    },
    SET_SELECT_COLOR(state, val) {
      state.selectColor = val;
    },
    SET_BORDER_W(state, val) {
      state.borderW = val;
    },
    SET_GRID_W(state, val) {
      state.gridW = val;
    },
    SET_UNITB_W(state, val) {
      state.unitbW = val;
    }
  },
  actions: {},
  modules: {}
});
