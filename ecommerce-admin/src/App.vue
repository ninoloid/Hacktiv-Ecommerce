<template>
  <div id="app">
    <CustomAddProdModal v-if="addProduct"/>
    <LoginModal v-if="!isLogin"/>
    <Notifications />
    <router-view v-if="isLogin && !isLoading"/>
    <Loading v-if="isLoading"/>
  </div>
</template>

<script>
import CustomAddProdModal from '@/components/addProductModal'
import LoginModal from '@/components/login'
import Notifications from '@/components/notification'
import Loading from '@/components/loading'
import { mapState } from 'vuex'

export default {
  components: {
    CustomAddProdModal,
    LoginModal,
    Notifications,
    Loading
  },
  computed: {
    addProduct () {
      return this.$store.state.addProduct
    },
    ...mapState([
      'isLogin',
      'isLoading'
    ])
  },
  methods: {
    checkToken () {
      if (localStorage.access_token) {
        const payload = {
          token: localStorage.access_token,
          username: localStorage.username,
          isSuperAdmin: localStorage.isSuperAdmin
        }
        this.$store.commit('SET_USER_CREDENTIALS', payload)
        this.$store.commit('SET_LOGIN', true)
      }
    },
    fetchProduct () {
      this.$store.dispatch('fetchProducts')
    },
    fetchAllUsers () {
      this.$store.dispatch('fetchAllUsers')
    }
  },
  created () {
    this.checkToken()
    this.fetchProduct()
    this.fetchAllUsers()
    // console.log(this.$store.state.products)
  }
}
</script>

<style>
body {
  background: grey;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
