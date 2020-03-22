<template>
  <div class="home">

  <NavBar />

    <div class="row" style="width: 100%; height: 90vh; margin: 0;">
      <SideBar />
      <div class="col m10" style="background: #e4e4f7; height: 100%; margin: 0; padding-right: 0">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/navbar'
import SideBar from '@/components/sidebar'

export default {
  name: 'Dashboard',
  components: {
    NavBar,
    SideBar
  }
}
</script>

<style scoped>
</style>
