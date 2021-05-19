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
      options: [
        {
          value: '男',
          label: '男',
        },
        {
          value: '女',
          label: '女',
        },
      ],
      singer: {},
    }
  },
  methods: {
    onload() {
      this.singer = JSON.parse(this.$route.params.id)
      // this.singer.sex = this.singer.sex === 0 ? '男' : '女'
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
          // console.log(e.currentTarget.result)
          that.singer.pic = e.currentTarget.result
          // console.log(
          //   (that.singer.pic = e.currentTarget.result),
          //   inputFile.name
          // )
          // base64_image_content(e.currentTarget.result, inputFile.name)
        }
      }
    },
    uploadsingerinfo() {
      console.log(this.singer)
      const singer = this.singer
      singer.sex = singer.sex == '男' ? 1 : 0
      this.$api
        .updateSinger({
          id: singer.id,
          singername: singer.singername,
          sex: singer.sex,
          pic: singer.pic,
          birth: singer.birth,
          location: singer.location,
          introduction: singer.introduction,
        })
        .then((res) => {
          this.$message({
            message: '修改成功',
            type: 'success',
          })
          this.$router.go(0)
        })
        .catch((err) => {
          this.$message.error('删除失败')
          console.log(err)
        })
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
</style>