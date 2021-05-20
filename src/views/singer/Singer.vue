<template>
  <div>
    <div class="singercontent">
      <el-button type="primary"
                 plain
                 @click="addsingerinfo()">添加歌手</el-button>
      <div class="singer-content">
        <table class="table">
          <tr>
            <th class="litter">id</th>
            <th>姓名</th>
            <th class="litter">性别</th>
            <th>出生日期</th>
            <th>出生地</th>
            <th>图片</th>
            <th>歌手介绍</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in singerList"
              :key="index"
              class="">
            <td>{{index}}</td>
            <td>{{item.singername}}</td>
            <td>{{item.sex}}</td>
            <td>{{((item.birth)!==null)?(item.birth).substring(0,10):null}}</td>
            <td>{{item.location}}</td>
            <td><img :src="item.pic"></td>
            <td><span>{{item.introduction}}</span></td>
            <td>
              <el-button type="primary"
                         icon="el-icon-edit"
                         @click="updaterow(item)"
                         :plain="true"></el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
                         @click="deleterow(item)"
                         :plain="true"></el-button>
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
      singerList: [],
      currentPage: 1,
      pagesize: 0,
      total: 0,
      pn: 1,
    }
  },
  methods: {
    onload() {
      this.$api.singerList({ pn: this.pn }).then((res) => {
        const info = res.data.extend.info
        // console.log(info)
        this.pagesize = info.pagesize
        this.total = info.total
        this.currentPage = info.pageNum
        info.list.forEach((item) => {
          item.pic = this.$store.state.imghead + item.pic
          if (item.sex === 1) {
            item.sex = '男'
          } else {
            item.sex = '女'
          }
        })
        this.singerList = info.list
        console.log(this.singerList)
      })
    },
    updaterow(item) {
      this.$router.push(
        '/updateinfo/' + encodeURIComponent(JSON.stringify(item))
      )
    },
    deleterow(item) {
      console.log(item)
      this.$api
        .deletesinger({ singerid: item.id, pic: item.pic })
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
      this.$router.push('/insertsinger')
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
.table {
  width: 100%;
}
.table tr {
  width: 100%;
  height: 4rem;
}
.table tr {
  border: 0.1rem solid #ddd;
}
.table tr th {
  width: 8rem;
}
.table tr th:nth-child(1) {
  width: 5rem;
}

.table tr th:nth-child(7) {
  width: 35rem;
}
.table tr td:nth-child(7) span {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  line-height: 1.2rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  overflow-y: scroll;
}
.table tr th:last-child {
  width: 15rem;
}
.table tr td {
  height: 6rem;
  text-align: center;
}
.table tr td img {
  width: 5rem;
  height: 5rem;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.block {
  margin: 1rem 3rem 3rem;
}
.pagerhapel {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.block-total {
  margin-right: 1.5rem;
}
</style>