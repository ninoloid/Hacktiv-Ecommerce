<template>
  <div>
    <ProductDetail :showDialog="showDialog" @modalToggle="modalToggle" :product="product" @addToCart="addToCart"/>
    <b-jumbotron fluid container-fluid class="pt-2 pb-0" style="background: rgba(0,0,0,0)">
      <b-row>
        <b-col>
          <md-tabs class="md-primary" style="background: rgba(0,0,0,0.3);" md-alignment="centered">
            <md-tab md-label="ALL" @click.prevent="filterProducts()"></md-tab>
            <md-tab md-label="PC" @click.prevent="filterProducts(1)"></md-tab>
            <md-tab md-label="PHONE" @click.prevent="filterProducts(2)"></md-tab>
            <md-tab md-label="HW" @click.prevent="filterProducts(3)"></md-tab>
            <md-tab md-label="ACC" @click.prevent="filterProducts(4)"></md-tab>
          </md-tabs>
        </b-col>
      </b-row>
      <b-row style="min-height: 50vh;">
        <!-- items -->
        <ItemCard @modalToggle="modalToggle" @setProduct="setProduct" v-for="product in allProducts" :key="product.id" :product="product" @addToCart="addToCart"/>
        <!-- end of items -->
      </b-row>
    </b-jumbotron>
  </div>
</template>

<script>
import ItemCard from '@/components/itemCard'
import ProductDetail from '@/components/productDetail'
import { mapState } from 'vuex'

export default {
  name: 'Catalog',
  data () {
    return {
      showDialog: false,
      product: {},
      allProducts: []
    }
  },
  components: {
    ItemCard,
    ProductDetail
  },
  methods: {
    modalToggle (bool) {
      this.showDialog = bool
    },
    setProduct (product) {
      this.product = product
    },
    reFetchProducts () {
      this.$store.dispatch('fetchProducts')
      this.setAllProducts()
    },
    setAllProducts () {
      this.allProducts = this.products
    },
    filterProducts (id) {
      if (id) {
        this.allProducts = this.products.filter(product => product.CategoryId === id)
      } else {
        this.allProducts = this.products
      }
    },
    addToCart (id) {
      const payload = {
        ProductId: id,
        type: 'add'
      }
      this.$store.dispatch('addToCart', payload)
        .then(({ data }) => {
          this.$store.commit('SET_NOTIFICATION', data.msg)
        })
        .catch(err => {
          this.$store.commit('SET_ERROR', err)
        })
    }
  },
  computed: {
    ...mapState([
      'products'
    ])
  },
  created () {
    this.reFetchProducts()
  },
  watch: {
    products () {
      this.setAllProducts()
    }
  }
}
</script>
