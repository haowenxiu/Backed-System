<template>
  <div class="pages">
    <navigation class="header"></navigation>
    <div style="height: 0;overflow: hidden;clear: both;"></div>
    <div class="content">
      <nav-menu class="left-content"></nav-menu>
      <router-view class="right-content"></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from 'content/navigation/Navigation.vue'
import NavMenu from './navmenu/NavMenu.vue'

export default {
  components: {
    Navigation,
    NavMenu,
  },
}
</script>

<style>
@import '../../assets/css/base.css';

.pages {
  width: 100%;
  height: 100%;
}

.header {
  width: 100%;
  height: 8rem;
  z-index: 9999;
}
.content {
  width: 100%;
  height: 100%;
  border-top: 1px solid rgb(110, 109, 134);
  display: grid;
  grid-template-columns: 20rem auto;
}
.left-content {
  width: 20rem;
  padding-top: 1.5rem;
  border-right: 0.1rem solid #b5b9be;
}

.right-content {
  width: 100%;
  height: 100%;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  /* background-color: aqua; */
}
</style>