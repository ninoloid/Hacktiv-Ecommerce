<template>
  <div id="app">
    <NavBar />
    <router-view/>
    <MainFooter />
    <NotifErrorHandler />
    <Loading v-if="isLoading"/>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar'
import MainFooter from '@/components/Footer'
import NotifErrorHandler from '@/components/NotifErrorHandler'
import Loading from '@/components/Loading'
import { mapState } from 'vuex'

export default {
  components: {
    NavBar,
    MainFooter,
    NotifErrorHandler,
    Loading
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    },
    checkToken () {
      if (localStorage.access_token && localStorage.username) {
        this.$store.commit('SET_LOGIN', true)
        this.$alertify.success(`Welcome back, ${localStorage.username}`)
        this.$router.push('/catalog')
        this.fetchCart()
      }
    },
    fetchCart () {
      this.$store.dispatch('getCart')
    }
  },
  created () {
    this.fetchProducts()
    this.checkToken()
    // this.fetchCart()
  },
  computed: {
    ...mapState([
      'products',
      'notification',
      'error',
      'isLoading'
    ])
  }
}
</script>

<style>
#app {
  background: url('https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/ecBG.jpg');
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

::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(0,0,0,.2);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: coral;
  border-radius: 7px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(250, 100, 50);
}
</style>
