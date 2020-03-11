<template>
  <div class="overflow-y-auto scrolling-touch">
    <div
      v-for="(item, index) in projections"
      :key="index"
      class="w-full hover:bg-gray-300 cursor-pointer border-l-8 border-transparent"
      :class="{
        'text-teal-600 font-bold border-teal-600 bg-gray-300':
          projection === item
      }"
      @click="ChangeProjection(item)"
    >
      <div class="border-b h-full  py-3 mx-5">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import projections from "@/assets/js/projections";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      projections
    };
  },
  computed: {
    ...mapState({
      projection: state => state.projection
    })
  },
  methods: {
    ...mapMutations({
      ChangeProjection: "CHANGE_PROJECTION"
    })
  }
};
</script>
