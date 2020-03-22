<template>
  <div>
    <div><h4>Product Management</h4></div>
    <div style="display: flex; align-items: center; justify-content: flex-end">
      <form @submit.prevent="searchProduct">
        <div class="input-field col" style="margin: 0">
          <input id="searchQuery" v-model="searchQuery" type="text" class="validate">
          <label for="searchQuery">Search Product</label>
        </div>
      </form>
      <div class="col clearQuery" :class="{ disabled: !searchQuery }" @click.prevent="clearQuery">
        <i class="material-icons">close</i>
      </div>
      <div class="col addButton" @click.prevent="addProduct">
        <i class="material-icons">add_circle</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchQuery: ''
    }
  },
  methods: {
    searchProduct () {
      this.$emit('filterProduct', this.searchQuery)
    },
    addProduct () {
      this.$store.commit('SHOW_ADD_FORM', true)
    },
    clearQuery () {
      this.searchQuery = ''
    }
  },
  watch: {
    searchQuery (value) {
      this.searchProduct()
    }
  }
}
</script>

<style scoped>
.addButton i {
  font-size: 3rem;
  color: #2c3b41;
  transition: 1s;
  cursor: pointer;
}
.addButton i:hover {
  color: blue;
  transform: rotate(360deg);
  transition: 1s;
}
.disabled {
  visibility: hidden;
}
.clearQuery {
  padding-left: 0;
}
.clearQuery i {
  color: #2c3b41;
  transition: 1s;
  cursor: pointer;
}
.clearQuery i:hover {
  color: red;
  transition: 1s;
}
</style>
