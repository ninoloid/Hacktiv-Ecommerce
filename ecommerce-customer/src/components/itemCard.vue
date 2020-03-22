<template>
  <b-col md="2" sm="6">
    <md-card class="my-2" style="background: rgba(0,0,0,0.3)">
      <!-- <img src="https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/STRIX-GL702ZC.png" alt=""> -->
      <md-card-media-cover>
        <md-card-media class="imageRatio">
          <img :src="product.imageUrl">
        </md-card-media>
        <md-card-area>
          <md-card-header style="padding: 0">
            <span class="md-title" style="font-size: .9rem;">{{ product.name }}</span>
            <span class="md-subhead" style="font-size: .8rem;">Rp {{ product.price.toLocaleString('id-ID') }}</span>
          </md-card-header>
          <md-card-actions>
            <md-button class="md-icon-button" @click.prevent="setData(true, product)">
              <md-icon>blur_circular</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click.prevent="addToCart">
              <md-icon>add_shopping_cart</md-icon>
            </md-button>
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
  </b-col>
</template>

<script>
export default {
  props: {
    showDialog: Boolean,
    product: Object
  },
  methods: {
    setData (bool, product) {
      this.setProduct(product)
      this.modalToggle(bool)
    },
    modalToggle (bool) {
      this.$emit('modalToggle', bool)
    },
    setProduct (product) {
      this.$emit('setProduct', product)
    },
    addToCart () {
      this.$emit('addToCart', this.product.id)
    }
  }
}
</script>

<style>
  .md-card-area {
    background: rgba(0,0,0,.54)
  }
  .imageRatio {
    overflow: hidden
  }
  .imageRatio:before {
    width: 100%;
    padding-top: 125%;
    display: block;
    content:" "
  }
  .imageRatio img {
    position: absolute;
    top: 75%;
    right: 0;
    left: 0;
    transform: translateY(-75%)
  }
</style>
