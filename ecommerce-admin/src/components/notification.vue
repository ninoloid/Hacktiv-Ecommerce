<template>
  <div></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    showError (error) {
      this.$alertify.error(error)
    },
    showNotification (notif) {
      this.$alertify.success(notif)
    }
  },
  computed: mapState(['error', 'notification']),
  watch: {
    error (value) {
      const { errObj } = value.response.data
      if (errObj.errors) {
        this.showError(errObj.errors[0])
      } else {
        this.showError(errObj.msg)
      }
    },
    notification (value) {
      this.showNotification(value)
    }
  }
}
</script>

<style>

</style>
