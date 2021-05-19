<template>
  <div class="">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu default-active="1"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <span>歌手</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">歌曲</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">歌单</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">轮播图</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(index) {
      console.log(index)
      switch (index) {
        case '1':
          this.$router.push('/singer')
          break
        case '2':
          this.$router.push('/song')
          break
        case '3':
          this.$router.push('/songlist')
          break
        default:
          this.$router.push('/banner')
          break
      }
    },
  },
}
</script>

<style>
.tac .el-col-12 {
  width: 100%;
}
</style>