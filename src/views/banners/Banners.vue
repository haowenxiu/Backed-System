<template>
  <div>
    <div class="singercontent">
      <el-button type="primary"
                 plain
                 @click="addsingerinfo()">添加Banner</el-button>
      <div class="singer-content">
        <table class="tablebanner">
          <tr class="songth">
            <th class="litter">id</th>
            <th>图片名字</th>
            <th>歌曲名</th>
            <th class="tableimg">图片</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in bannerlist"
              :key="index"
              class="tablesong">
            <td>{{index}}</td>
            <td>{{item.name}}</td>
            <td>{{item.songname}}</td>
            <td class="tableimg"><img :src="item.bannerpic"></td>
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
      <!-- <div class="block pagerhapel">
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
      </div> -->
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
      bannerlist: [],
      // currentPage: 1,
      // pagesize: 0,
      // total: 0,
      // pn: 1,
    }
  },
  methods: {
    onload() {
      this.$api.banners().then((res) => {
        const info = res.data.extend.info
        info.forEach((item) => {
          item.bannerpic = this.$store.state.imghead + item.bannerpic
        })
        this.bannerlist = info
        console.log(this.bannerlist)
      })
    },
    deleterow(item) {
      console.log(item.bannerid)
      this.$api
        .deletebanner({ bannerid: item.bannerid })
        .then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.reload()
        })
        .catch((err) => {
          this.$message.error('删除失败')
          console.log(err)
        })
    },
    updaterow(item) {
      this.$router.push(
        '/updatebanner/' + encodeURIComponent(JSON.stringify(item))
      )
    },
    addsingerinfo() {
      this.$router.push('/insertbanner')
    },
  },
}
</script>

<style>
.tablebanner {
  width: 100%;
}
.tablebanner tr {
  text-align: center;
  height: 4rem;
  background-color: #ff0;
}
.tablebanner tr td {
  height: 3rem;
  width: 4rem;
}
.tablebanner tr td:last-child {
  width: 4rem;
}
.tablebanner tr img {
  height: 10rem;
  width: 100%;
}
</style>