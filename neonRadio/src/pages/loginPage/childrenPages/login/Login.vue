<template>
  <div class="login">
    <div class="login-back" @click="$router.back()">
      <i
        class="iconfont icon-guanbi"
      ></i>
      <span>手机号登录</span>
    </div>

    <div class="login-phone" v-if="loginStatus === 0">
      <p class="login-title">登录体验更多精彩</p>
      <p class="login-text" v-if="test === 'code'">
        未注册手机号登录后将自动创建账号
      </p>

      <div class="phone-box">
        <button @click="handleCountry">
          {{ country }} <i class="iconfont icon-xia"></i>
        </button>
        <input
          type="text"
          placeholder="请输入手机号"
          v-model="phone"
          maxlength="11"
        />
        <i class="iconfont icon-guanbi" @click="phone = ''"></i>
      </div>
      <!-- 国家地区索引列表 -->
      <div class="country-list">
        <mt-popup
          v-model="countryShow"
          position="bottom"
          modal="false"
          closeOnClickModal="false"
          :style="styles.popup"
        >
          <div class="list-head">
            <i class="iconfont icon-guanbi" @click="handleCountry"></i>
            <span>选择国家和地区</span>
          </div>
          <mt-index-list :height="indexListHeight">
            <mt-index-section
              v-for="(countries, index1) in countryList"
              :key="index1"
              :index="countries.label"
            >
              <mt-cell
                :title="country.zh"
                :value="'+' + country.code"
                v-for="(country, index2) in countries.countryList"
                :key="index2"
                @click.native="handlePopup(index1 + '-' + index2)"
              ></mt-cell>
            </mt-index-section>
          </mt-index-list>
        </mt-popup>
      </div>

      <div
        class="next-btn"
        :class="{ 'next-btn-on': phoneVerify() && isRegPhone }"
        @click="isRegPhone ? (loginStatus = 1) : ''"
      >
        <button>下一步</button>
      </div>
    </div>

    <!-- 手机密码登录页面 -->
    <div class="login-pwd" v-if="loginStatus && test === 'pwd'">
      <div v-if="!isPwdForget" class="set-pwd">
        <!-- 输入密码登录盒子 -->
        <div class="login-content">
          <input
            type="password"
            placeholder="请输入密码"
            v-model="pwd"
            maxlength="20"
            minlength="8"
          />
          <span class="forget-pwd" @click="isPwdForget = true">忘记密码?</span>
        </div>

        <div
          class="login-btn"
          :class="{ 'login-btn-on': pwdVerify() }"
          @click="pwdVerify() ? login() : ''"
        >
          <button>登录</button>
        </div>
      </div>
      <!-- 重新设置密码盒子 -->
      <div v-if="showPwdForget" class="forget-box">
        <p class="login-title">
          请设置登陆密码，8-20位字符，至少包括字母/数字/符号2种组合
        </p>
        <div class="login-content">
          <input type="password" v-model="pwd" maxlength="20" minlength="8" />
        </div>

        <div
          class="login-btn"
          :class="{ 'login-btn-on': pwdVerify() }"
          @click="pwdVerify() ? pwdFind() : ''"
        >
          <button>下一步</button>
        </div>
      </div>
    </div>

    <!-- 手机验证码登录页面/忘记密码页面 -->
    <div
      class="login-code"
      v-if="(loginStatus && test === 'code') || (isPwdForget && !showPwdForget)"
    >
      <p class="login-title">请输入验证码</p>
      <div class="login-content">
        <p class="login-text">
          {{ `已发送至${country}  ${handlePhone(phone)}` }}<i></i>
        </p>
        <p class="code-agin" @click="getCodeAgain">{{ CodeStatus }}</p>
      </div>
      <div class="code-box">
        <input type="text" v-model="code" maxlength="4" />
        <div class="code_bottom">
          <div
            v-for="index in 4"
            :key="index"
            :class="{ on: code.charAt(index - 1) }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqCountries } from "@/service/index";
import { IndexList, IndexSection, Popup, Cell, Toast } from "mint-ui";
import {
  reqCaptchaSent,
  reqCaptchaVerify,
  reqLoginCellphone,
  reqRegisterCellphone,
  reqcellphoneCheck,
} from "@/service/index";
import { mapActions } from "vuex";
export default {
  components: {
    [IndexList.name]: IndexList,
    [IndexSection.name]: IndexSection,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
  },
  data() {
    return {
      countryShow: false, //国家列表显示状态
      countryList: [], //国家列表数据
      countryIndex: [],
      styles: {
        popup: {
          width: "100%",
          height: "90%",
          "border-radius": "20px 20px 0px 0px",
        },
      },
      loginStatus: 0, //登录方式状态
      CodeStatus: "重新获取", //手机验证码状态
      isPwdForget: false, //是否忘记密码
      showPwdForget: false,
      isRegPhone: false,
      nickname: "",
      phone: "",
      code: "",
      pwd: "",
    };
  },
  computed: {
    test() {
      return this.$route.query.test;
    },
    //索引组件高度
    indexListHeight() {
      return document.documentElement.clientHeight * 0.9 * 0.92;
    },
    //国家对应手机前缀号
    country() {
      let indexsection = document.getElementsByClassName("mint-indexsection")[
        this.countryIndex[0] * 1
      ];
      if (indexsection)
        return indexsection.getElementsByClassName("mint-cell-value")[
          this.countryIndex[1] * 1
        ].innerText;
      else return "+86";
    },
  },
  methods: {
    ...mapActions(["getUserinfo"]),
    /*
     * 更改国家列表显示状态
     * 如果未请求国家列表，则先请求
     */
    async handleCountry() {
      if (!this.countryList.length) {
        let result = await reqCountries();
        this.countryList = result.data;
      }

      this.countryShow = !this.countryShow;
    },
    handlePopup(index) {
      this.countryShow = false;
      this.countryIndex = index.split("-");
    },
    //对手机号码做模糊处理
    handlePhone(phone) {
      return phone.slice(0, 3) + "****" + phone.slice(-4);
    },
    //请求再次获取验证码
    getCodeAgain() {
      this.CodeStatus = "60s";
      let time = 59;
      let interval = setInterval(() => {
        if (time) this.CodeStatus = time + "s";
        else {
          this.CodeStatus = "重新获取";
          clearInterval(interval);
        }
        time--;
      }, 1000);

      //发送ajax请求，请求再次获取验证码
      this.getCaptchaSent();
    },
    //请求登录
    async login() {
      let { phone, pwd } = this;
      phone *= 1;
      let result = await reqLoginCellphone({ phone, password: pwd });
      if (result.code != 200) {
        Toast(result.message ? result.message : "登录失败,请重新登录");
      } else {
        //存储用户信息profile与cookie值到vuex
        this.getUserinfo({ userInfo: result.profile, cookie: result.cookie });

        //跳转到主页面
        this.$router.push("/findIndex");
      }
    },
    //请求验证码
    async getCaptchaSent() {
      let phone = this.phone * 1;
      let result = await reqCaptchaSent({ phone });
      if (result.code != 200) Toast(result.message);
    },
    //请求验证验证码
    async captchaVerify() {
      let phone = this.phone * 1;
      let captcha = this.code * 1;
      let result = await reqCaptchaVerify({ phone, captcha });
      if (result.code != 200) {
        Toast('验证码错误');
        this.code = "";
        return false;
      }
      return true;
    },
    //手机格式验证
    async phoneVerify() {
      //如果是手机验证码登录，则只进行格式验证
      //如果是手机密码登录，则需再进行验证手机号是否注册

      let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!reg.test(this.phone)) return (this.isRegPhone = false);
      if (this.test === "code") {
        return (this.isRegPhone = true);
      } else if (this.test === "pwd") {
        let isCheck = await this.getcellphoneCheck();
        if (!isCheck) Toast("请输入已注册过的手机号码");
        return (this.isRegPhone = isCheck);
      }
    },
    //密码格式验证
    pwdVerify() {
      let reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/;
      if (reg.test(this.pwd)) return true;
      return false;
    },
    //找回密码
    async pwdFind() {
      let result = await this.getRegisterCellphone();
      if(result.code == 200) {
        //更改成功，自动登录
        Toast('修改成功!')
        this.login()
      } else {
        Toast('修改失败!')
      }
    },
    //请求修改密码
    async getRegisterCellphone() {
      let { code, phone, pwd } = this;
      let result = await reqRegisterCellphone({
        captcha: code * 1,
        phone,
        password: pwd,
        nickname: "",
      });
      return result;
    },
    //请求验证手机是否被注册过
    async getcellphoneCheck() {
      let result = await reqcellphoneCheck({ phone: this.phone * 1 });
      if (result.code === 200 && result.exist === 1) return true;
      return false;
    },

  },
  watch: {
    async code() {
      //发送ajax请求，请求验证验证码
      if (this.code.length === 4) {
        //登录：如果成功，则登录
        if (!this.isPwdForget && (await this.captchaVerify())) {
          Toast("抱歉,暂未开发手机验证码登录功能");
        }
        //忘记密码：如果成功，则显示修改信息页面
        else if (this.isPwdForget && (await this.captchaVerify())) {
          Toast("验证成功");
          this.showPwdForget = true;
        } 
      }
    },
    loginStatus() {
      //用户进入页面时，发送验证码
      if (this.loginStatus && this.test === "code") {
        this.getCaptchaSent();
      }
    },
    isPwdForget () {
       //用户进入页面时，发送验证码
       this.getCaptchaSent();
    }
  },
};
</script>

<style scoped>
* {
  font-size: 16px;
}

input,
button {
  border: none;
  background: none;
  outline: none;
}

.login {
  padding: 20px;
}
.list-head {
  height: 8%;
  padding-left: 20px;
  line-height: 50px;
  font-size: 18px;
}

.login-back .iconfont {
  margin-right: 10px;
  color: #4b4a4a;
}

.login-title {
  margin-top: 30px;
}

.login-text {
  margin-top: 15px;
  font-size: 12px;
  color: #9c9a9a;
}

.phone-box {
  position: relative;
  margin: 30px auto;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(221, 215, 215);
}

.phone-box .icon-guanbi {
  position: absolute;
  right: 0;
  color: rgb(173, 171, 171);
}

.next-btn,
.login-btn {
  width: 100%;
  margin: auto;
}

.next-btn button,
.login-btn button {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background: rgb(204, 204, 518);
  color: white;
}

.phone-box input,
.login-pwd input {
  caret-color: rgb(247, 0, 255);
}

.code-box {
  margin-top: 20px;
  width: 100%;
}

.code-box .on {
  border-bottom: 1px solid;
}

.code-box input {
  padding-left: 12%;
  width: 100%;
  height: 40px;
  letter-spacing: 60px;
  caret-color: rgba(240, 248, 255, 0);
}

.code_bottom {
  display: flex;
  width: 80%;
  height: 10px;
  margin-left: 15px;
}

.code_bottom div {
  width: 40px;
  height: 1px;
  margin: auto;
  border-bottom: 1px solid rgb(221, 215, 215);
}

.login-content {
  position: relative;
}

.code-agin {
  position: absolute;
  top: 0px;
  right: 0;
  font-size: 12px;
  color: rgb(43, 156, 231);
}

.next-btn-on button,
.login-btn-on button {
  background: rgb(175, 175, 251);
}

.login-btn {
  margin-top: 40px;
}

.set-pwd .login-content {
  margin-top: 50px;
}

.set-pwd .login-content {
  padding: 10px 5px;
  border-bottom: 1px solid rgb(221, 215, 215);
}

.set-pwd .login-content span {
  position: absolute;
  right: 0px;
  top: 15px;

  color: rgb(43, 156, 231);
  font-size: 12px;
}

.icon-guanbi {
  font-size: 12px;
}

.icon-houtui {
  font-size: 16px;
}

.forget-box .login-title {
  font-size: 14px;
  color: #9c9a9a;
}

.forget-box .login-content {
  height: 50px;
  margin-top: 20px;
}

.forget-box input {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid rgb(221, 215, 215);
  font-size: 16px;
}
</style>