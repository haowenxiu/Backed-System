<template>
  <div class="login">
    <div class="login-content">
      <div class="input">
        <span>管理员登录</span>
        <div>
          <div class="admin-input">
            <span>账号 : </span>
            <el-input v-model="admin.name"
                      placeholder="请输入账号"></el-input>
          </div>
          <div class="admin-input">
            <span>密码 :</span>
            <el-input v-model="admin.password"
                      placeholder="请输入密码"
                      type="password"></el-input>
          </div>
          <div class="admin-input">
            <el-button type="primary"
                       plain
                       @click="loginadmin">登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      admin: {
        name: '',
        password: '',
      },
    }
  },
  methods: {
    loginadmin() {
      const info = this.admin
      console.log(info)
      if (info.name === null || info.password === null) {
        this.$message({
          message: '警告,账号或密码不能为空',
          type: 'error',
        })
      } else {
        this.$api
          .adminlogin({
            name: info.name,
            password: info.password,
          })
          .then((res) => {
            const data = res.data.extend.info
            console.log(data)
            sessionStorage.setItem('admin', JSON.stringify(data))
            this.$router.push('/singer')
            this.$message({
              message: '登陆成功',
              type: 'success',
            })
            this.reload()
          })
          .catch((err) => {
            this.$message({
              message: '警告,登陆失败',
              type: 'error',
            })
          })
      }
    },
  },
}
</script>

<style>
.login {
  width: 100%;
  height: 100%;
}
.login-content {
  width: 90%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #ff0; */
}
.input {
  width: 40%;
  height: 100%;
  /* background-color: aqua; */
}
.input > span {
  display: inline-block;
  text-align: center;
  width: 100%;
  height: 5rem;
  margin-top: 5rem;
  font-size: 2.5rem;
}
.input > div {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.admin-input {
  width: 70%;
  height: 8rem;
}
.admin-input > span {
  display: inline-block;
  font-size: 1.5rem;
  margin: 1rem 0;
}
.admin-input > .el-button {
  width: 100%;
  margin: 2.5rem 0;
}
</style>