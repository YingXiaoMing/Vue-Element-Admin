<template>
  <div class="login-container">
    <div class="login-main">
      <div class="login-area">
        <div class="mylog_area">
          <img src="../../assets/logo.jpg">
          <div class="tradeVersion">
            <span class="title">上海棱启视光分析系统
</span>
          </div>
        </div>
        <div class="custlog_area">
          <div class="custlog_area_leftarea">
            <img src="../../assets/lg.jpg">
          </div>
          <p class="tips_area"><a>温馨提示：为了达到最佳使用效果，建议在Chrome浏览器下使用本系统，也可以使用360极速模式或IE9以上浏览器！</a></p>
        </div>
      </div>
      <div class="right">

        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <div class="loginTitle">
            <span class="login_title_text">登录</span>
          </div>
          <el-form-item prop="account">
            <el-input
              ref="account"
              v-model="loginForm.account"
              class="login_input_group"
              style="width:100%"
              placeholder="账号"
              name="account"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>

          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="passWord">
              <el-input
                :key="passWordType"
                ref="passWord"
                v-model="loginForm.passWord"
                style="width:100%"
                class="login_input_group"
                :type="passWordType"
                placeholder="密码"
                name="passWord"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @keyup.enter.native="handleLogin"
              />
              <span v-if="false" class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passWordType === 'passWord' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>

          <el-form-item v-if="false" prop="businessdate">
            <span class="svg-container">
              <i class="el-icon-date" />
            </span>
            <el-date-picker
              v-model="loginForm.businessdate"
              style="width:90%"
              :rereadonly="true"
              :editable="false"
              :clearable="true"
              prefix-icon="none"
              align="center"
              type="date"
              placeholder="业务日期"
            />
          </el-form-item>

          <el-form-item v-if="false" prop="collect">
            <span class="svg-container">
              <i class="el-icon-tickets" />
            </span>
            <el-select v-model="loginForm.collect" value placeholder="套账" style="width:90%">
              <el-option
                v-for="item in collectList"
                :key="item.id"
                :label="item.accName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-button
            :loading="loading"
            :plain="true"
            :round="true"
            type="primary"
            class="loginBotton"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validaccount } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateaccount = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('请输入正确的账号'))
      } else {
        callback()
      }
    }
    const validatepassWord = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validatebusinessdate = (rule, value, callback) => {
      if (value.length <= 0 && this.userType != 1) {
        callback(new Error('请选择业务日期'))
      } else {
        callback()
      }
    }
    const validatecollect = (rule, value, callback) => {
      if (value.length <= 0 && this.userType != 1) {
        callback(new Error('请选择套账'))
      } else {
        callback()
      }
    }
    return {
      userType: 1,
      collectList: [],
      loginForm: {
        account: '',
        passWord: '',
        businessdate: '',
        collect: ''
      },
      loginRules: {
        account: [
          { required: true, trigger: 'blur', validator: validateaccount }
        ],
        passWord: [
          { required: true, trigger: 'blur', validator: validatepassWord }
        ],
        businessdate: [
          { trigger: 'blur', validator: validatebusinessdate }
        ],
        collect: [
          { trigger: 'blur', validator: validatecollect }
        ]
      },
      passWordType: 'passWord',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.account === '') {
      this.$refs.account.focus()
    } else if (this.loginForm.passWord === '') {
      this.$refs.passWord.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= 'a' && key <= 'z')) ||
          (!shiftKey && (key >= 'A' && key <= 'Z'))
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    passWordBlur() {
      this.capsTooltip = false
    },
    showPwd() {
      if (this.passWordType === 'passWord') {
        this.passWordType = ''
      } else {
        this.passWordType = 'passWord'
      }
      this.$nextTick(() => {
        this.$refs.passWord.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        console.log(this.loginForm);
        if (valid) {
          this.loading = true
          this.$store.dispatch('account/login', this.loginForm)
            .then(res => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })

          // this.$store
          //   .dispatch('account/login', this.loginForm)
          //   .then(res => {
          //     console.log(this.$router)
          //     this.$router.push({
          //       path: this.redirect || '/',
          //       query: this.otherQuery
          //     })
          //     this.loading = false
          //   })
          //   .catch(() => {
          //     this.loading = false
          //   })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #ffffff;
  $light_gray: #fff;
  $cursor: #000000;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }
  $login_green: #00a0ea;
  $bg: #ffffff;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      color: #000000;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 5px;
        padding: 12px 5px 12px 15px;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      width: 90%;
      margin: 0 auto;
      margin-bottom: 18px;
      border-radius: 5px;
      border-bottom: #eaeaea 1px solid;
    }
  }

  .login-container {
    // min-height: 100%;
    width: 100%;
    margin: 0 auto;
    background-color: $bg;
    // background: url("../../assets/bg2.jpg");
    background-size: cover;
    overflow: hidden;

    .logo {
      width: 100%;
      height: 50px;
      text-align: left;
      margin-top: 30px;
      margin-bottom: 20px;

      .logo-image {
        width: 150px;
        height: 50px;
      }
    }
    .login-main {
      width: 100%;
      height: 515px;
      margin: 0 auto;
      margin-top: 10%;
      position: relative;
      .login-area {
        .mylog_area {
          padding: 36px 0 0 35px;
          height: 90px;
          position: relative;
          img {
            float: left;
            width: 40px;
            height: 40px;
            overflow: hidden;
          }
          .tradeVersion {
            float: left;
            margin-left: 20px;
            padding-top: 10px;
            font-size: 18px;
            color: #00a0ea;
            font-family: "微软雅黑, 'Microsoft YaHei', 华文中宋, 宋体";
            span, p {
              height: 20px;
              line-height: 20px;
            }
            span {
              font-weight: bold;
              letter-spacing: 6px;
            }
            p {
              letter-spacing: 0px;
              font-size: 12px;
            }
          }
        }
      }
      .custlog_area {
        background-color: $login_green;
        width: 100%;
        height: 390px;
        border-top: 1px solid #ccc;
        display: block;
        position: relative;
        .custlog_area_leftarea {
          width: 58%;
          margin-top: 70px;
          margin-left: 20%;
          overflow: hidden;
          height: 200px;
          img {
            display: block;
            height: 100%;
          }
        }
        .tips_area {
          position: absolute;
          bottom: 0;
          font-size: 12px;
          color: #fff;
          padding: 5px 0;
          width: 100%;
          text-align: center;
        }
      }
      .left {
        float: left;
        width: 50%;
        height: 513px;
        .leftbg {
          width: 100%;
          height: 513px;
        }
      }

      .right {
        .login-form {
          width: 425px;
          position: absolute;
          box-shadow: 2px 2px 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #fff;
          margin: -480px 0 0 58%;
          height: 455px;
        }
        .loginTitle {
          width: 100%;
          height: 115px;
          background-color: #fff;
          .login_title_text {
            color: $login_green;
            font-size: 18px;
            float: left;
            font-weight: 700;
            padding: 20px 0 0 45px;
          }
        }
        .login_input_group {
          border: 1px solid #ccc;
          // position: relative;
        }
        .tips {
          font-size: 14px;
          color: #fff;
          margin-bottom: 10px;

          span {
            &:first-of-type {
              margin-right: 16px;
            }
          }
        }

        .svg-container {
          padding: 6px 5px 6px 15px;
          vertical-align: middle;
          width: 30px;
          display: inline-block;
        }

        .title-container {
          position: relative;
          .title {
            font-size: 52px;
            font-family: STFangsong;
            margin: 30px auto 40px auto;
            text-align: center;
            font-weight: bold;
            color: #238ff3;
          }
        }

        .show-pwd {
          position: absolute;
          right: 10px;
          top: 7px;
          font-size: 16px;
          cursor: pointer;
          user-select: none;
        }

        .thirdparty-button {
          position: absolute;
          right: 0;
          bottom: 6px;
        }

        @media only screen and (max-width: 470px) {
          .thirdparty-button {
            display: none;
          }
        }

        .loginBotton {
          width: 90%;
          height: 45px;
          margin: 0 auto;
          margin-left: 20px;
          margin-bottom: 80px;
          margin-top: 30px;
          border-radius: 5px;
          background: $login_green;
          color: white;
          font-size: 20px;
          border-color: $login_green;
        }
      }
    }
  }
</style>
