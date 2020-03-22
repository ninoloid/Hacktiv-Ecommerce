<template>
  <b-row class="d-flex justify-content-center align-items-center" style="background: rgba(0,0,0,.3); height: 90vh;">
    <b-card style="height: 45vh">
      <b-card-body class="pb-0">
        <form style="width: 300px;" @submit.prevent="login">
          <div class="grey-text">
            <md-field style="border-bottom: 1px solid rgba(0,0,0,.3)">
              <label>Username or Email</label>
              <md-input v-model="identification"></md-input>
            </md-field>
            <md-field style="border-bottom: 1px solid rgba(0,0,0,.3)">
              <label>Password</label>
              <md-input v-model="password" type="password"></md-input>
            </md-field>
          </div>
          <div class="text-center py-4 mt-3">
            <b-button variant="outline-primary" style="width: 150px;" type="submit">Login</b-button>
          </div>
          <p>Not a member? <span><a href="" @click.prevent="changeStatus(false)">Sign Up</a></span></p>
        </form>
      </b-card-body>
    </b-card>
  </b-row>
</template>

<script>
export default {
  data () {
    return {
      identification: '',
      password: ''
    }
  },
  methods: {
    changeStatus (status) {
      this.$emit('changeStatus', status)
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
          this.$router.push('/').catch(() => {})
          this.$store.commit('SET_NOTIFICATION', `Welcome back, ${data.username}`)
          this.$store.commit('SET_LOGIN', true)
          this.clearForm()
        })
        .catch(err => {
          this.$store.commit('SET_ERROR', err)
          this.clearForm()
        })
    },
    clearForm () {
      this.identification = ''
      this.password = ''
    }
  }
}
</script>

<style>

</style>
