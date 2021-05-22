<template>
  <div>
    <div class="singercontent">
      <el-button type="primary"
                 plain
                 @click="addsingerinfo()">添加歌单</el-button>
      <div class="singer-content">
        <table class="tablesonglist">
          <tr class="songth">
            <th class="litter">id</th>
            <th>歌单名</th>
            <th class="tableimg">图片</th>
            <th>歌单介绍</th>
            <th>歌单分格</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in songlist"
              :key="index"
              class="tablesong">
            <td>{{index}}</td>
            <td>{{item.title}}</td>
            <td class="tableimg"><img :src="item.pic"></td>
            <td>{{item.introduction}}</td>

            <td>{{item.style}}</td>
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
      this.$api.getsonglist({ pn: this.pn }).then((res) => {
        const info = res.data.extend.info
        console.log(info.list)
        this.pagesize = info.pagesize
        this.total = info.total
        this.currentPage = info.pageNum
        info.list.forEach((item) => {
          item.pic = this.$store.state.imghead + item.pic
        })
        this.songlist = info.list
      })
    },
    updaterow(item) {
      this.$router.push(
        '/updatesonglist/' + encodeURIComponent(JSON.stringify(item))
      )
    },
    deleterow(item) {
      console.log(item.id)
      this.$api.deletesonglist({ songlistid: item.id }).then((res) => {
        this.$message({
          message: '删除成功',
          type: 'success',
        })
        this.reload()
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
      this.$router.push('/insertsonglist')
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
.tablesonglist {
  width: 100%;
}
.tablesonglist th:nth-child(2) {
  width: 12rem;
}
.tablesonglist th:nth-child(3) {
  width: 12rem;
}
.tablesonglist th:nth-child(4) {
  width: 3rem;
}
.tablesonglist th:nth-child(5) {
  width: 10rem;
}
.tablesonglist th:last-child {
  width: 10rem;
}
.tablesonglist td:nth-child(4) {
  /* display: inline-block; */
  height: 100%;
  padding: 0.5rem;
  line-height: 1.2rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  overflow-y: scroll;
}
.tablesonglist td img {
  width: 5rem;
  height: 5rem;
}
.tablesonglist tr {
  text-align: center;
  height: 4rem;
}
.tablesonglist tr th {
  width: 6rem;
  background-color: #ff0;
}
</style>