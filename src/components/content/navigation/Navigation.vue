<template>
  <div class="nav-header">

    <div class="nav-title">
      <div class="navtitle"
           @click="homepage()">
        <span>Musilc·Library 后台管理系统</span>
      </div>
    </div>
    <user-center></user-center>
  </div>
</template>

<script>
import UserCenter from '../navigation/usercenter/UserCenter'
export default {
  components: { UserCenter },
  inject: ['reload'],
  methods: {
    homepage() {
      this.reload()
      this.$router.push('/singer')
    },
  },
}
</script>

<style>
.nav-header {
  width: 100%;
  background-color: skyblue;
}
.nav-title {
  float: left;
  width: 50rem;
  height: 100%;
  line-height: 8rem;
  text-align: center;
  display: flex;
  justify-content: flex-end;
}
.nav-title span {
  font-size: 2.5rem;
}
.navtitle {
  width: 70%;
  height: 100%;
  cursor: pointer;
}
</style>