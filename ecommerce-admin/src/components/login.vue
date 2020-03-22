<template>
  <div class="loginContainer">
    <div style="max-width: 600px;" class="mainLogin">
      <div class="col s12 m12">
        <div class="card horizontal">
          <div class="card-image loginImage">
            <img src="https://picsum.photos/300/400" />
          </div>
          <div class="card-stacked" style="align-self: center;">
            <div class="card-content">
              <div class="row">
                <form
                  class="col s12"
                  @submit.prevent="haveAccount ? login() : register()"
                >
                  <div class="row" v-if="haveAccount">
                    <div class="input-field col s12 loginBox">
                      <input
                        id="identification"
                        type="text"
                        class="validate"
                        v-model="identification"
                      />
                      <label for="identification">Username or email</label>
                    </div>
                  </div>

                  <div class="row registerItem" v-if="!haveAccount">
                    <div class="input-field col s12 loginBox">
                      <input
                        id="username"
                        type="text"
                        class="validate"
                        v-model="username"
                      />
                      <label for="username">Username</label>
                    </div>
                  </div>

                  <div class="row registerItem" v-if="!haveAccount">
                    <div class="input-field col s12 loginBox">
                      <input
                        id="email"
                        type="email"
                        class="validate"
                        v-model="email"
                      />
                      <label for="email">Email Address</label>
                    </div>
                  </div>

                  <div class="row">
                    <div class="input-field col s12 loginBox">
                      <input
                        id="password"
                        type="password"
                        class="validate"
                        v-model="password"
                      />
                      <label for="password">Password</label>
                    </div>
                  </div>

                  <button
                    class="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                    style="width: 100%;"
                    v-if="haveAccount"
                  >
                    Login
                    <i class="material-icons right">send</i>
                  </button>

                  <button
                    class="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                    style="width: 100%;"
                    v-if="!haveAccount"
                  >
                    Register
                    <i class="material-icons right">send</i>
                  </button>

                  <p
                    v-if="haveAccount"
                    style="margin-top: 15px"
                    class="labelContainer"
                  >
                    <span class="linkLabel">Don't have account? </span>
                    <a href="" @click.prevent="isRegistered(false)"
                      >Register here!</a
                    >
                  </p>

                  <p
                    v-if="!haveAccount"
                    style="margin-top: 15px"
                    class="labelContainer"
                  >
                    <span class="linkLabel">Have an account? </span>
                    <a href="" @click.prevent="isRegistered(true)"
                      >Login here!</a
                    >
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      haveAccount: true,
      identification: '',
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    isRegistered (bool) {
      this.identification = ''
      this.username = ''
      this.email = ''
      this.password = ''
      this.haveAccount = bool
    },

    login () {
      const payload = {
        identification: this.identification,
        password: this.password
      }
      this.$store.dispatch('login', payload)
        .then(({ data }) => {
          localStorage.access_token = data.token
          localStorage.username = data.username
          localStorage.isSuperAdmin = data.isSuperAdmin
          this.$store.commit('SET_NOTIFICATION', `Welcome back, ${this.identification}`)
          this.$store.commit('SET_USER_CREDENTIALS', data)
          this.$store.commit('SET_LOGIN', true)
        })
        .catch(err => this.$store.commit('SET_ERROR', err))
    },

    register () {
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password,
        isAdmin: true
      }
      this.$store.dispatch('register', payload)
        .then(({ data }) => {
          localStorage.access_token = data.token
          localStorage.username = data.username
          this.$store.commit('SET_NOTIFICATION', `Welcome, ${this.username}`)
          this.$store.commit('SET_USER_CREDENTIALS', data)
          this.$store.commit('SET_LOGIN', true)
          this.$store.dispatch('fetchAllUsers')
        })
        .catch(err => this.$store.commit('SET_ERROR', err))
    }
  }
}
</script>

<style scoped>
.loginContainer {
  width: 100%; height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: rgb(70, 70, 70);
  z-index: 100;
}

.registerItem {
  margin-bottom: 0;
}

.loginBox {
  margin-bottom: 0;
}

@media (max-width: 992px) {
  .loginImage {
    align-self: center;
  }
}

@media (max-width: 480px) {
  .loginBox {
    margin: 0;
  }

  .mainLogin {
    padding: 0.5rem;
  }

  .linkLabel {
    display: none;
    color: red;
  }

  .labelContainer {
    font-size: 0.9rem;
  }

  .loginImage {
    display: none;
  }
}
</style>
