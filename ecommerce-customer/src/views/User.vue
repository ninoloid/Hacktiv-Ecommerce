<template>
  <div>
    <b-jumbotron fluid container-fluid class="pt-2 pb-0" style="height: 90vh; background: none;">
        <LoginForm v-if="isRegistered" @changeStatus="changeStatus" />
        <RegisterForm v-if="!isRegistered" @changeStatus="changeStatus" />
    </b-jumbotron>
  </div>
</template>

<script>
import LoginForm from '@/components/Login'
import RegisterForm from '@/components/Register'

export default {
  name: 'User',
  data () {
    return {
      isRegistered: true
    }
  },
  methods: {
    changeStatus (status) {
      this.isRegistered = status
    }
  },
  components: {
    LoginForm,
    RegisterForm
  }
}
</script>
