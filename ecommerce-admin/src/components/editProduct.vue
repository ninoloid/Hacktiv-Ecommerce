<template>
    <div style="width: 80vw; display: flex; justify-content: center;">
      <form class="col s12" @submit.prevent="editProduct">
        <div class="row">
          <div class="input-field col s12">
            <input id="name" type="text" class="validate" v-model="name">
            <label for="name" class="active">Product Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="description" class="materialize-textarea" v-model="description"></textarea>
            <label for="description" class="active">Product Description</label>
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
            <label for="price" class="active">Price</label>
          </div>
          <div class="input-field col s4">
            <input id="stock" type="number" class="validate" min="0" v-model="stock">
            <label for="stock" class="active">Stock</label>
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
          <button class="btn waves-effect waves-light" name="action" @click.prevent="backToProduct">Cancel
            <i class="material-icons right">cancel</i>
          </button>
        </div>
      </form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      description: '',
      CategoryId: '',
      price: '',
      stock: '',
      imageUrl: ''
    }
  },
  methods: {
    backToProduct () {
      this.$router.push('/product')
    },
    setProduct (product) {
      this.name = product.name
      this.description = product.description
      this.CategoryId = product.CategoryId
      this.price = product.price
      this.stock = product.stock
    },
    processFile (event) {
      this.imageUrl = event.target.files[0]
    },
    editProduct () {
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('CategoryId', this.CategoryId)
      formData.append('price', this.price)
      formData.append('stock', this.stock)
      formData.append('imageUrl', this.imageUrl)

      const data = {
        formData, query: this.$route.query
      }

      this.$store.dispatch('editProduct', data)
        .then(({ data }) => {
          this.$store.commit('SET_NOTIFICATION', data.msg)
          this.$store.dispatch('fetchProducts')
          this.$router.push('/product')
        })
        .catch(err => this.$store.commit('SET_ERROR', err))
    }
  },
  created () {
    this.$store.dispatch('fetchOneProduct', this.$route.query)
      .then(({ data }) => {
        this.$store.commit('FETCH_ONE_PRODUCT', data)
        this.setProduct(data.product)
      })
      .catch(err => this.$store.commit('SET_ERROR', err))
  },
  computed: {
    oneProduct () {
      return this.$store.state.oneProduct
    }
  }
}
</script>

<style>

</style>
