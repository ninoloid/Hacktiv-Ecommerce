<template>
  <div>
    <!-- {{ userCart }} -->
    <md-card class="my-2" style="background: rgba(0,0,0,.3)" v-if="!showThanksPage">
      <md-card-content>
        <b-row>
            <!-- ITEM -->
          <b-col md="6" sm="12" style="padding-right: 0; height: 84vh; overflow: auto;">
            <ItemOnCart v-for="product in onCart" :key="product.id" :product="product"/>
          </b-col>
            <!-- END OF ITEM -->
            <!-- TOTAL -->
          <b-col md="4" sm="12">
            <md-card class="innercard">
              <md-card-header>
                <div class="md-title mb-4" style="font-size: 2rem;">TOTAL</div>
              </md-card-header>
              <md-card-content style="font-size: 1.2rem;" class="pb-0">
                QUANTITY
              </md-card-content>
              <md-card-content style="font-size: 1.2rem;">
                {{ reduceQty }}
              </md-card-content>
              <md-card-content style="font-size: 1.2rem;" class="pb-0 pt-4">
                TOTAL PRICE
              </md-card-content>
              <md-card-content style="font-size: 1.2rem;">
                Rp {{ afterDiscount.toLocaleString('id-ID') }}
              </md-card-content>
              <md-card-content>
                <form @submit.prevent="getDiscount">
                  <md-field>
                    <label style="margin-left: 10px;">Voucher Code</label>
                    <md-input v-model="voucherCode" style="padding: 10px; background: rgba(0,0,0,.2);"></md-input>
                    <b-button variant="success" size="sm" style="margin-left: 10px; width: 100px;" type="submit">USE</b-button>
                  </md-field>
                </form>
              </md-card-content>
              <md-card-content style="padding-top: 0">
                <b-button variant="primary" @click.prevent="checkout">CHECKOUT</b-button>
              </md-card-content>
            </md-card>
          </b-col>
          <!-- END OF TOTAL -->
            <!-- HISTORY -->
          <b-col md="2" sm="12" style="height: 84vh; overflow: auto; ">
            <h5 style="font-weight: bold; font-size: 1.2rem; margin-bottom: 1rem;">Transaction History</h5>
            <ItemOnHistory v-for="product in checkedOut" :key="product.id" :product="product"/>
          </b-col>
            <!-- END OF HISTORY -->
        </b-row>
      </md-card-content>
    </md-card>

    <ThanksPage v-if="showThanksPage" />
  </div>
</template>

<script>
import ItemOnCart from '@/components/itemOnCart'
import ItemOnHistory from '@/components/itemOnHistory'
import ThanksPage from '@/components/Thankspage'

export default {
  name: 'Cart',
  data () {
    return {
      voucherCode: '',
      discount: 0,
      showThanksPage: false
    }
  },
  components: {
    ItemOnCart,
    ItemOnHistory,
    ThanksPage
  },
  methods: {
    fetchUserCart () {
      this.$store.dispatch('getCart')
    },
    getDiscount () {
      this.$store.dispatch('getDiscount', this.voucherCode)
        .then(({ data }) => {
          this.$store.commit('SET_NOTIFICATION', `Voucher code applied, ${data.value}% off`)
          this.discount = data.value
        })
        .catch(err => {
          this.$store.commit('SET_ERROR', err)
        })
    },
    checkout () {
      this.$store.dispatch('checkout')
        .then(({ data }) => {
          this.$store.commit('SET_NOTIFICATION', data.msg)
          this.showThanksPage = true
        })
        .catch(err => {
          this.$store.commit('SET_ERROR', err)
        })
    }
  },
  computed: {
    userCart () {
      return this.$store.state.userCart
    },
    onCart () {
      return this.userCart.filter(product => !product.Cart.checkout)
    },
    checkedOut () {
      return this.userCart.filter(product => product.Cart.checkout)
    },
    reduceQty () {
      return this.onCart.reduce((acc, curr) => acc + curr.Cart.quantity, 0)
    },
    reducePrice () {
      return this.onCart.reduce((acc, curr) => acc + (curr.price * curr.Cart.quantity), 0)
    },
    afterDiscount () {
      return this.reducePrice - (this.reducePrice * this.discount / 100)
    }
  },
  created () {
    this.fetchUserCart()
  }
}
</script>

<style scoped>
  .md-card {
    width: 95vw;
    display: inline-block;
    vertical-align: top;
  }
  .innercard {
    width: 100%;
    background: rgba(0,0,0,.5);
    margin-bottom: 1rem;
    color:powderblue;
  }
</style>
