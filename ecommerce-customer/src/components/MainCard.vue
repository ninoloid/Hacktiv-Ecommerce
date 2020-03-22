<template>
  <div>
    <b-card
      title=" Best selection of electronics at Every Day Low Prices."
      img-src="https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/cityview3.jpg"
      img-alt="Image"
      img-top
      tag="article"
      style="width: 100%; text-align: left; background: none; border: none;"
      class="mb-2"
    >
      <b-card style="position: absolute; top: 0; left: 0; width: 100%; background: rgba(0,0,0,.3); font-size: 1.2rem; color: white;">SPECIAL PROMO 15% OFF! Use voucher code "payday" to get this special discount.</b-card>
      <b-button href="" variant="primary" @click.prevent="toCatalog">CATALOG</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  methods: {
    toCatalog () {
      this.$router.push('/catalog')
    }
  }
}
</script>

<style>

</style>
