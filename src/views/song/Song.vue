<template>
  <div>
    <div class="singercontent">
      <el-button type="primary"
                 plain
                 @click="addsingerinfo()">添加歌曲</el-button>
      <div class="singer-content">
        <table class="tablesong">
          <tr class="songth">
            <th class="litter">id</th>
            <th>歌手</th>
            <th>歌名</th>
            <th class="litter">专辑</th>
            <th>创建时间</th>
            <th>上传时间</th>
            <th class="tableimg">图片</th>
            <th>歌词</th>
            <th>歌曲路径</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in songlist"
              :key="index"
              class="tablesong">
            <td>{{index}}</td>
            <td>{{item.singername}}</td>
            <td>{{item.songname}}</td>
            <td>{{item.collection}}</td>
            <td>{{((item.createtime)!==null)?(item.createtime).substring(0,10):null}}</td>
            <td>{{((item.updatetime)!==null)?(item.updatetime).substring(0,10):null}}</td>
            <td class="tableimg"><img :src="item.pic"></td>
            <td>{{item.lyric}}</td>
            <td>{{item.songurl}}</td>
            <td>
              <span class="songbtn">
                <el-button type="primary"
                           icon="el-icon-edit"
                           @click="updaterow(item)"
                           :plain="true"></el-button>
              </span>
              <span class="songbtn">
                <el-button type="danger"
                           icon="el-icon-delete"
                           @click="deleterow(item)"
                           :plain="true"></el-button>
              </span>
            </td>
          </tr>
        </table>
      </div>
      <div class="block pagerhapel">
        <div class="block-total">
          <p>共有 <span>{{total}}</span> 条数据</p>
        </div>
        <div class="block-pager">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="currentPage"
                         :page-size="pagesize"
                         layout="prev, pager, next, jumper"
                         :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  mounted() {
    this.onload()
  },
  data() {
    return {
      songlist: [],
      currentPage: 1,
      pagesize: 0,
      total: 0,
      pn: 1,
    }
  },
  methods: {
    onload() {
      this.$api.getAllSong({ pn: this.pn }).then((res) => {
        const info = res.data.extend.info
        const state = this.$store.state
        console.log(info.list)
        this.pagesize = info.pagesize
        this.total = info.total
        this.currentPage = info.pageNum
        info.list.forEach((item) => {
          item.pic = state.imghead + item.pic
          item.songurl = state.songurl + item.songurl
        })
        this.songlist = info.list
      })
    },

    updaterow(item) {
      this.$router.push(
        '/updatesong/' + encodeURIComponent(JSON.stringify(item))
      )
    },
    deleterow(item) {
      console.log(item)
      this.$api
        .deleteSong({ songid: item.songnum })
        .then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.reload()
        })
        .catch((err) => {
          this.$message.error('删除失败')
        })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.pn = val
      this.onload()
    },
    addsingerinfo() {
      this.$router.push('/insertsong')
    },
  },
}
</script>

<style>
.singercontent {
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.singer-content {
  width: 100%;
  height: 100%;
  /* background-color: aqua; */
}
.tablesong {
  width: 100%;
}
.tablesong tr {
  text-align: center;
  height: 4rem;
}
.tablesong tr th {
  width: 6rem;
  background-color: #ff0;
}
.tablesong tr th:nth-child(8) {
  /* width: 25rem; */
  width: 15rem;
}
.tablesong tr th:last-child {
  width: 10rem;
}
.tablesong tr td {
  background-color: #f0f;
}
.tablesong td img {
  width: 5rem;
  height: 5rem;
}
.tablesong > td:nth-child(8) {
  display: inline-block;
  /* width: 25rem; */
  height: 100%;
  padding: 0.5rem;
  line-height: 1.2rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  overflow-y: scroll;
}
.songbtn {
  width: 4rem;
}
</style>