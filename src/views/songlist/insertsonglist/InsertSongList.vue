<template>
  <div>
    <div class=" inputform">
      <div class="singer-content">
        <div class="inputinfo name">
          <span class="span span-name">
            <p>歌单名称</p>
            <p v-show="isactive">此项为必填项</p>
          </span>
          <!-- <span v-show="isactive">姓名不能空</span> -->
          <el-input v-model="songlist.title"
                    placeholder="歌单名称"
                    @blur="blurchange"
                    @focus="getfocus"></el-input>
        </div>
        <div class="inputinfo uploadimg">
          <span class="span">图片上传</span>
          <button class="upload"
                  @click="uploadimg">
            <img :src="songlist.pic"
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
        <div class="inputinfo name">
          <span class="span">添加歌曲</span>
          <el-transfer filterable
                       filter-placeholder="请输入城市拼音"
                       v-model="value"
                       :titles="['可选歌曲','已选歌曲']"
                       :data="song">
          </el-transfer>
        </div>
        <div class="inputinfo name">
          <span class="span span-name">
            <p>歌单类别</p>
            <p v-show="isactive">此项为必填项</p>
          </span>
          <!-- <span v-show="isactive">姓名不能空</span> -->
          <el-input v-model="songlist.style"
                    placeholder="歌单类别,用  , 分割"
                    @blur="blurchange"
                    @focus="getfocus"></el-input>
        </div>
        <div class="inputinfo introduction">
          <span class="span">歌单简介</span>
          <el-input type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="songlist.introduction">
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
  mounted() {
    this.onload()
  },
  data() {
    return {
      isactive: false,
      show: false,
      songlist: {
        title: '',
        pic: '',
        introduction: '',
        style: '',
      },
      song: [],
      value: [],
    }
  },
  computed: {
    changeimg() {
      // console.log(this.show)
      return this.show
    },
  },
  methods: {
    // changesong(value, direction, movedKeys) {
    //   console.log(value, direction, movedKeys)
    // },
    onload() {
      this.$api.allsongbysonglist().then((res) => {
        const info = res.data.extend.info
        // console.log(info)
        info.forEach((item, index) => {
          this.song.push({
            key: item.songnum,
            label: item.songname,
          })
        })
      })
    },
    uploadsingerinfo() {
      const songlist = this.songlist
      const chosesong = this.value
      console.log(songlist)
      console.log(chosesong)
      this.$api
        .insertsonglist({
          title: songlist.title,
          pic: songlist.pic,
          introduction: songlist.introduction,
          style: songlist.style,
          chosesong: chosesong,
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
    goback() {
      this.$router.push('/singer')
    },
    getfocus() {
      this.isactive = false
    },
    blurchange(event) {
      console.log(event.currentTarget.value == '')
      this.isactive = event.currentTarget.value == '' ? true : false
    },
    uploadimg() {
      this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
    },
    getFile() {
      var that = this
      const inputFile = this.$refs.filElem.files[0]
      // console.log(inputFile.name)
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
          that.songlist.pic = e.currentTarget.result
          // console.log(
          //   (that.singer.pic = e.currentTarget.result),
          //   inputFile.name
          // )
          // base64_image_content(e.currentTarget.result, inputFile.name)
        }
      }
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
  width: 15rem;
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