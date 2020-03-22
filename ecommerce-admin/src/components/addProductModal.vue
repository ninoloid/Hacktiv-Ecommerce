<template>
  <div class="modalContainer">
    <div class="row" style="display: flex; justify-content: center">
      <div class="col">
        <div class="card-panel blue-grey lighten-4">
          <div style="width: 60vw; display: flex; justify-content: center;">
            <form class="col s12" @submit.prevent="addProduct">
              <div class="row">
                <div class="input-field col s12">
                  <input id="name" type="text" class="validate" v-model="name">
                  <label for="name">Product Name</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <textarea id="description" class="materialize-textarea" v-model="description"></textarea>
                  <label for="description">Product Description</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s4">
                  <select class="browser-default" v-model="CategoryId">
                    <option value="1">Computer</option>
                    <option value="2">Smartphone</option>
                    <option value="3">Peripheral</option>
                    <option value="4">Accessories</option>
                  </select>
                </div>
                <div class="input-field col s4">
                  <input id="price" type="number" class="validate" min="0" v-model="price">
                  <label for="price">Price</label>
                </div>
                <div class="input-field col s4">
                  <input id="stock" type="number" class="validate" min="0" v-model="stock">
                  <label for="stock">Stock</label>
                </div>
              </div>
              <div class="file-field input-field">
                <div class="btn">
                  <span>Image</span>
                  <input type="file" @change="processFile">
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text">
                </div>
              </div>
              <div style="margin-top: 2rem;">
                <button style="margin-right: 2rem;" class="btn waves-effect waves-light" type="submit" name="action">Submit
                  <i class="material-icons right">send</i>
                </button>
                <button class="btn waves-effect waves-light" @click.prevent="closeModal">Cancel
                  <i class="material-icons right">cancel</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      description: '',
      CategoryId: 1,
      price: '',
      stock: '',
      imageUrl: ''
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('SHOW_ADD_FORM', false)
    },
    addProduct () {
      this.$store.commit('SET_IS_LOADING', true)
      this.$store.commit('SHOW_ADD_FORM', false)
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('CategoryId', this.CategoryId)
      formData.append('price', this.price)
      formData.append('stock', this.stock)
      formData.append('imageUrl', this.imageUrl)

      this.$store.dispatch('addProduct', formData)
        .then(({ data }) => {
          this.$store.commit('SET_NOTIFICATION', data.msg)
          this.$store.dispatch('fetchProducts')
          this.$store.commit('SET_IS_LOADING', false)
        })
        .catch(err => {
          this.$store.commit('SET_ERROR', err)
          this.$store.commit('SET_IS_LOADING', false)
        })
    },
    processFile (event) {
      this.imageUrl = event.target.files[0]
    }
  }
}
</script>

<style>
  .modalContainer {
    position: absolute;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
