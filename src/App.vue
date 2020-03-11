<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  background-image: linear-gradient(0deg, #f5f5f5 1.1px, transparent 0),
    linear-gradient(90deg, #f5f5f5 1.1px, transparent 0);
  background-size: 40px 40px;
  background-color: #e8e8e8;

  // background: url("/bg.jpg");
  // background-attachment: fixed;
  // background-color: #f5f7f9;
  // background: linear-gradient(45deg,#e91e63,#9c27b0); 
}
</style>
