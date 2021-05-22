<template>
  <div>
    <div class=" inputform">
      <div class="singer-content">
        <div class="inputinfo name">
          <span class="span span-name">
            <p>图片名字</p>
            <p v-show="isactive">此项为必填项</p>
          </span>
          <!-- <span v-show="isactive">姓名不能空</span> -->
          <el-input v-model="banner.name"
                    placeholder="图片名字"
                    @blur="blurchange"
                    @focus="getfocus"></el-input>
        </div>
        <div class="inputinfo sex">
          <span class="span">歌曲</span>
          <el-select v-model="banner.songid"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.songname"
                       :value="item.songnum">
            </el-option>
          </el-select>
        </div>
        <div class="inputinfo uploadimg">
          <span class="span">图片上传</span>
          <button class="upload"
                  @click="uploadimg">
            <img :src="banner.bannerpic"
                 alt=""
                 v-if="changeimg">
            <el-image v-else>
              <div slot="error"
                   class="image-slot slot-text">
                <i class="el-icon-plus avatar-uploader-icon"></i>
                <span>点击上传图片</span>
              </div>
            </el-image>
          </button>
          <input ref="filElem"
                 type="file"
                 style='display:none'
                 @change="getFile">
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
  mounted() {
    this.onload()
  },
  data() {
    return {
      options: [],
      isactive: false,
      show: false,
      song: [],
      banner: {
        name: '',
        songid: '',
        bannerpic: '',
      },
    }
  },
  computed: {
    changeimg() {
      // console.log(this.show)
      return this.show
    },
  },
  methods: {
    uploadsingerinfo() {
      console.log(this.banner)
      this.$api
        .alertbanner({
          name: this.banner.name,
          bannerpic: this.banner.bannerpic,
          songid: this.banner.songid,
        })
        .then((res) => {
          this.$message({
            message: '添加成功',
            type: 'success',
          })
          this.$router.go(0)
        })
        .catch((err) => {
          this.$message.error('添加失败')
          console.log(err)
        })
    },
    onload() {
      this.$api.allsongbysonglist().then((res) => {
        const info = res.data.extend.info
        console.log(info)
        this.options = info
        info.forEach((item) => {
          this.options.value = item.songnum
          this.options.label = item.songname
        })
      })
    },
    getfocus() {
      this.isactive = false
    },
    blurchange(event) {
      // console.log(event.currentTarget.value == '')
      // this.isactive = event.currentTarget.value == '' ? true : false
    },
    uploadimg() {
      this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
    },
    getFile() {
      var that = this
      const inputFile = this.$refs.filElem.files[0]
      // console.log(inputFile)
      if (inputFile) {
        if (inputFile.type !== 'image/jpeg' && inputFile.type !== 'image/png') {
          alert('不是有效的图片文件！')
          return
        }
        const reader = new FileReader()
        reader.readAsDataURL(inputFile)
        reader.onload = function (e) {
          that.show = true
          // console.log(e.currentTarget.result)
          that.banner.bannerpic = e.currentTarget.result
          // console.log(
          //   (that.singer.pic = e.currentTarget.result),
          //   inputFile.name
          // )
          // base64_image_content(e.currentTarget.result, inputFile.name)
        }
      }
    },

    goback() {
      this.$router.push('/singer')
    },
  },
}
</script>

<style>
.inputform {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.singer-content {
  width: 100%;
  height: 100%;
  /* background-color: aqua; */
}

.inputinfo {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.singer-content .block {
  margin-left: 0;
}
.block span {
  text-align: start;
}
.inputinfo .span {
  margin: 1rem 0;
  font-size: 1.2rem;
}
.span-name {
  display: flex;
  flex-direction: row;
}
.span-name p:nth-child(2) {
  margin: 0 3rem;
  color: red;
}
.upload {
  width: 35rem;
  height: 15rem;
  /* background-color: #d9d9d9; */
  border: 0.1rem dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.upload img {
  border-radius: 6px;
  width: 100%;
  height: 100%;
}
.button {
  width: 100%;
  height: 4rem;
  margin: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.button .el-button {
  margin: 0 5rem;
}
.slot-text {
  display: flex;
  flex-direction: column;
  color: rgb(150, 147, 147);
}
.slot-text i {
  font-size: 4rem;
}
.slot-text span {
  padding-top: 2rem;
}
.audioupload {
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  display: flex;
  flex-direction: row;
}
.audioupload > span {
  display: inline-block;
  width: 100%;
  margin-left: 2rem;
  /* background-color: #ff0; */
}
</style>