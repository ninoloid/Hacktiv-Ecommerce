<template>
  <div style="height: 90vh; overflow: auto;">
    <!-- PRODUCT HEADER HERE -->
    <ProductHeader @filterProduct="filterProduct" />
    <!--  -->
    <table>
      <tr>
        <th style="width: 17%;">Name</th>
        <th style="width: 23%;">Description</th>
        <th>Category</th>
        <th>Price</th>
        <th>Stock</th>
        <th style="width: 15%">Image</th>
        <th>Menu</th>
      </tr>
      <!-- PRODUCT DETAIL HERE -->
      <ProductTable v-for="product in filteredProducts" :key="product.id" :product="product"/>
      <!--  -->
    </table>
  </div>
</template>

<script>
import ProductTable from '@/components/productTable'
import ProductHeader from '@/components/productHeader'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    ProductTable,
    ProductHeader
  },
  methods: {
    filterProduct (words) {
      const regex = new RegExp(words, 'gi')
      const data = this.products.filter(product => product.name.match(regex))
      this.$store.commit('SET_FILTERED_PRODUCTS', data)
    }
  },
  computed: {
    ...mapState(['products', 'filteredProducts']),
    ...mapGetters(['getFilteredProducts'])
  }
}
</script>

<style>

</style>
