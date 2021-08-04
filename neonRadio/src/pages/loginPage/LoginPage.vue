<template>
<keep-alive>
  <div class="login-page">
    <div class="login-logo">
      <img src="@/static/images/logo.svg"/>
    </div>
    <div class="login-pwd" @click="pwdLogin">
      <button :class="{ on: on === 'pwd' }">手机密码登录</button>
    </div>
    <div class="login-code" @click="codeLogin">
      <button :class="{ on: on === 'code' }">手机验证码登录</button>
    </div>
    <div class="login-power">
      <p>
        登录已同意<span>《用户协议》</span> <span>《隐私政策》</span>
        <span>《儿童隐私政策》</span>
      </p>
    </div>
  </div>
</keep-alive>
</template>

<script>

export default {
  components:{
  
  },
  data() {
    return {
      on: "pwd",
    };
  },
  methods: {
    //点击手机密码登录
    pwdLogin() {
      this.on = "pwd";
      this.$router.push({
        path: "/loginPage/login",
        query: {
          test: "pwd",
        },
      })
    },
    //点击手机验证码登录
    codeLogin() {
      this.on = "code";
      this.$router.push({
        path: "/loginPage/login",
        query: {
          test: "code",
        },
      })
    },
  },
};
</script>

<style scoped>
input,
button {
  border: none;
  background: none;
  outline: none;
}
.login-page {
  height: 100%;
  background: rgb(204, 204, 518);
  text-align: center;
}

.login-page > div {
  position: relative;
}

.login-page .login-logo {
  top: 20%;
}

.login-page .login-logo img {
  width: 65px;
}

.login-pwd,
.login-code,
.login-power {
  top: 50%;
  margin-bottom: 30px;
}

.login-pwd button,
.login-code button {
  width: 70%;
  height: 45px;
  background-color: rgb(0, 0, 0, 0);
  border-radius: 20px;
  border: 1px solid white;

  color: white;
  font-size: 12px;
}

.login-page button.on {
  background: white;
  color: rgb(204, 204, 518);
}

.login-power {
  top: 60%;
  font-size: 12px;
}

.login-power p {
  color: rgba(240, 248, 255, 0.404);
}

.login-power span {
  color: rgb(240, 248, 255);
}
</style>