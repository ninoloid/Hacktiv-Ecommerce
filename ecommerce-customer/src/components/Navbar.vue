<template>
  <b-navbar toggleable="lg" style="background: rgba(0,0,0,0.3);">
    <b-navbar-brand href="">LOGO</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="" @click.prevent="changePage('')">Home</b-nav-item>
        <b-nav-item href="" @click.prevent="changePage('catalog')">Catalog</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->

        <b-nav-item href="" @click.prevent="changePage('cart')">Cart</b-nav-item>
        <b-nav-item href="" @click.prevent="logout" v-if="isLogin">Logout</b-nav-item>
        <b-nav-item href="" @click.prevent="changePage('login')" v-if="!isLogin">Login</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    changePage (page) {
      const target = `/${page}`
      this.$router
        .push(target)
        .catch(() => {})
    },
    logout () {
      localStorage.clear()
      this.$store.commit('SET_NOTIFICATION', "You're logged out successfully")
      this.$store.commit('SET_LOGIN', false)
      this.changePage('')
    }
  },
  computed: mapState(['isLogin'])
}
</script>

<style>

</style>
