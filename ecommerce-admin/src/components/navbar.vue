<template>
    <nav style="height: 10vh; line-height: 10vh; background: #222d32">
    <div class="nav-wrapper">
      <a class="brand-logo center"><i class="large material-icons">add_shopping_cart</i>ELECTROSHOP </a>
      <ul class="right hide-on-med-and-down">
        <li style="margin-right: 2rem">{{ username }}</li>
        <li><a href="" @click.prevent="logout">Logout</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.commit('SET_NOTIFICATION', `See you next time, ${localStorage.username} <i class="material-icons">thumb_up</i>`)
      localStorage.clear()
      this.$store.commit('SET_LOGIN', false)
    }
  },
  computed: {
    username () {
      return this.$store.state.username
    }
  }
}
</script>

<style>

</style>
