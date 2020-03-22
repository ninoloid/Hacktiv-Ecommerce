<template>
  <md-dialog
    :md-active.sync="localShowDialog"
    :md-click-outside-to-close="false"
    :md-close-on-esc="false"
    style="background: white;"
    id="ifMobile"
  >
    <!-- <md-dialog-title>Product Detail</md-dialog-title> -->
    <div>
      <b-card no-body class="overflow-hidden" id="cardContainer">
        <b-row no-gutters>
          <b-col md="3" id="imageContainer">
            <b-card-img
              :src="product.imageUrl || defaultImage"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col md="9">
            <b-card-body>
              <b-card-title>
                {{ product.name ? product.name : '' }}
              </b-card-title>
              <b-card-text>
                <b-card-text class="mb-2" style="font-weight: bold;"
                  >Description</b-card-text
                >
                <b-card-text>{{ product.description ? product.description : ''}}</b-card-text>
              </b-card-text>
              <b-card-text>
                <b-card-text class="mb-2" style="font-weight: bold;"
                  >Category</b-card-text
                >
                <b-card-text>{{ product.Category ? product.Category.name : '' }}</b-card-text>
              </b-card-text>
              <b-card-text>
                <b-card-text class="mb-2" style="font-weight: bold;"
                  >Price</b-card-text
                >
                <b-card-text>Rp {{ product.price ? product.price.toLocaleString('id-ID') : '' }}</b-card-text>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <md-dialog-actions>
      <md-button
        class="md-raised"
        style="background: coral;"
        @click="modalToggle(false)"
        size="sm"
        >CLOSE</md-button
      >
      <md-button
        class="md-raised"
        style="background: lightgreen;"
        @click="addToCart(product.id)"
        size="sm"
        >ADD TO CART</md-button
      >
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  data () {
    return {
      localShowDialog: false,
      defaultImage: 'https://radscanmedical.com/wp-content/uploads/2018/11/coming-soon.png'
    }
  },
  props: {
    showDialog: Boolean,
    product: Object
  },
  methods: {
    modalToggle (bool) {
      this.$emit('modalToggle', bool)
    },
    addToCart (id) {
      this.$emit('addToCart', id)
    }
  },
  watch: {
    showDialog (value) {
      this.localShowDialog = value
    }
  }
}
</script>

<style scoped>
.card {
  width: 70vw;
}

@media (max-width: 600px) {
  .card {
    width: 100%;
    text-align: justify;
  }
  #imageContainer {
    display: flex;
    justify-content: center;
  }
  .card img {
    width: 50%;
  }
}

@media (max-width: 800px) {
  #ifMobile {
    overflow: auto;
  }
}
</style>
