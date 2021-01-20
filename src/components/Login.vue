<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <el-form
        ref="loginFormRef"
        class="login_from"
        :model="loginFrom"
        :rules="loginFromRules"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginFrom.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-zu"
            type="password"
            v-model="loginFrom.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('loginFormRef')"
            >登录</el-button
          >
          <el-button type="info" @click="resetLoginForm('loginFormRef')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFrom: {
        username: "admin",
        password: "123456",
      },
      loginFromRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 10,
            message: "长度在 4 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    submitForm(loginFormRef) {
      this.$refs[loginFormRef].validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginFrom);
        if (res.meta.status !== 200) return this.$message.error("登录失败");
        this.$message({
          message: "登录成功",
          type: "success",
        });
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100vh;
}
.login_box {
  height: 300px;
  width: 450px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_from {
  position: absolute;
  bottom: 0%;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
}
</style>
