<template>
  <div class="col m2" style="background: #222d32; height: 100%;">
    <div class="row menuItem" style="height: 3rem; line-height: 3rem; margin-bottom: 0;" @click="changePage('product')"><p>Manage Product</p></div>
    <div class="row menuItem" style="height: 3rem; line-height: 3rem; margin-bottom: 0;" @click="changePage('user')"><p>Manage User</p></div>
  </div>
</template>

<script>
export default {
  methods: {
    changePage (page) {
      const target = `/${page}`
      if (target !== this.$router.currentRoute.path) {
        this.$router.push(target)
      }
    }
  }
}
</script>

<style scoped>
.menuItem {
  background: #2c3b41;
    border-left: 0.3rem solid #2c3b41;
  color: white;
  transition: .5s;
  text-align: left
}
.menuItem:hover {
  background:#1e282c;
  border-left: 0.3rem solid #808080;
  transition: .5s;
  cursor: pointer;
}
.menuItem p {
  margin: 0;
  margin-left: .5rem;
}
</style>
