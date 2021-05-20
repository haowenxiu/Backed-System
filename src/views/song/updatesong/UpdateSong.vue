<template>
  <div>
    <div class=" inputform">
      <div class="singer-content">
        <div class="inputinfo name">
          <span class="span">姓名</span>
          <el-input v-model="singer.singername"
                    placeholder="姓名"></el-input>
        </div>
        <div class="inputinfo sex">
          <span class="span">性别</span>
          <el-select v-model="singer.sex"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="inputinfo uploadimg">
          <span class="span">图片上传</span>
          <button class="upload"
                  @click="uploadimg">
            <img :src="singer.pic"
                 alt="">
          </button>
          <input type="file"
                 style='display:none'
                 ref="inputfile">
          <input ref="filElem"
                 type="file"
                 style='display:none'
                 @change="getFile">
        </div>
        <div class="inputinfo address">
          <span class="span">地址</span>
          <el-input v-model="singer.location"
                    placeholder="地址"></el-input>
        </div>
        <div class="inputinfo block">
          <span class="demonstration span">出生日期</span>
          <el-date-picker v-model="singer.birth"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="inputinfo introduction">
          <span class="span">简介</span>
          <el-input type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="singer.introduction">
          </el-input>
        </div>
        <div class="inputinfo button">
          <el-button plain
                     @click="goback()">取消</el-button>
          <el-button type="primary"
                     plain
                     @click="uploadsingerinfo()">确认修改</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  created() {
    this.onload()
  },
  data() {
    return {
      song: {},
    }
  },
  methods: {
    onload() {
      this.song = JSON.parse(this.$route.params.item)
      console.log(this.song)
    },
  },
}
</script>

<style>
</style>