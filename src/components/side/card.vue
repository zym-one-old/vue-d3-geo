<template>
  <div
    class="w-full my-3 border-2 border-gray-700 border-dashed rounded-sm bg-white p-1"
  >
    <div
      class="text-left font-bold text-sm px-4 py-1 uppercase border-b-2 border-gray-700 border-dashed"
    >
      {{ title }}
      <span class="italic"> # {{ subTitle }} </span>
    </div>
    <div class="h-full py-2 px-1 md:px-3">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { default: "", type: String },
    subTitle: { default: "", type: String }
  }
};
</script>
