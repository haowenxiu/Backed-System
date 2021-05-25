<template>
  <div class="user">
    <div class="user-center">
      <span>用户名：{{admin.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.onload()
  },
  data() {
    return {
      admin: {},
    }
  },
  methods: {
    onload() {
      const info = JSON.parse(sessionStorage.getItem('admin'))
      this.admin = info
    },
  },
}
</script>

<style>
.user {
  float: right;
  width: 30rem;
  height: 100%;
  line-height: 8rem;
  text-align: end;
}
.user .user-center {
  width: 20rem;
  height: 100%;
  /* background: #ff0; */
}
.user-center span {
  font-size: 1.5rem;
  padding-right: 5rem;
}
</style>