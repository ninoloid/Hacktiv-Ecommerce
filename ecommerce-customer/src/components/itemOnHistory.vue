<template>
  <md-card id="historyCart">
    <md-card-content style="width: 100px; padding: 0">
    <md-card-title>{{ product.name }}</md-card-title>
      <md-card-media class="imageRatio">
        <img :src=product.imageUrl>
      </md-card-media>
    </md-card-content>
    <!-- <md-card-content style="position: absolute; top: 0; left: 150px;">
      <table style="font-size: 1rem;">
        <tr align="left">
          <th width="160;" align="left">Product Name</th>
          <td>{{ product.name }}</td>
        </tr>
        <tr align="left">
          <th>Price</th>
          <td>{{ product.price }}</td>
        </tr>
        <tr align="left">
          <th>Quantity</th>
          <td>
            <input type="number" style="width: 3rem;" :value=product.Cart.quantity disabled>
          </td>
        </tr>
      </table>
    </md-card-content> -->
  </md-card>
</template>

<script>
export default {
  props: {
    product: Object
  }
}
</script>

<style scoped>
  #historyCart {
    width: 100%;
    /* width: 150px; */
    background: rgba(0,0,0,.5);
    margin-bottom: 1rem;
    color:powderblue;
    display: flex;
    justify-content: center;
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
    height: 100%;
    position: absolute;
    top: 75%;
    right: 0;
    left: 0;
    transform: translateY(-75%)
  }
</style>
