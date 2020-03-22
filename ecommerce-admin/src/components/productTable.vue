<template>
  <tr>
    <td>{{product.name}}</td>
    <td>{{hundredCharString}}</td>
    <td>{{product.Category.name}}</td>
    <td>{{getPrice}}</td>
    <td>{{product.stock}}</td>
    <td><img style="width: 8rem" :src=product.imageUrl></td>
    <td>
      <ul>
        <li style="color: green;" @click="editProduct"><i class="material-icons editButton">edit</i></li>
        <li style="color: red;" @click="confirm"><i class="material-icons deleteButton">delete</i></li>
      </ul>
    </td>
  </tr>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    product: Object
  },
  created () {
  },
  computed: {
    hundredCharString () {
      const { description } = this.product
      let str = ''
      if (description.length > 100) {
        for (let i = 0; i < 100; i++) {
          str += description[i]
        }
        str += '...'
      } else {
        str = description
      }
      return str
    },
    getPrice () {
      const { price } = this.product
      return `Rp ${Number(price).toLocaleString('id-ID')}`
    }
  },
  methods: {
    editProduct () {
      this.$router.push({ path: 'editProduct', query: { id: this.product.id } })
    },
    delProduct () {
      this.$store.commit('SET_IS_LOADING', true)
      this.$store.dispatch('deleteProduct', this.product.id)
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
    confirm () {
      this.$alertify.confirmWithTitle(
        'Delete Product',
        'Are you sure want to delete this product?',
        () => this.delProduct()
      )
    }
  }
}
</script>

<style scoped>
.editButton {
  transition: .7s
}
.editButton:hover {
  cursor: pointer;
  color: rgb(0, 75, 0);
  transform: rotate(360deg);
  transition: .7s
}
.deleteButton {
  transition: .7s
}
.deleteButton:hover {
  cursor: pointer;
  color: darkred;
  transform: rotate(360deg);
  transition: .7s
}
td {
  padding: 5px;
}
</style>
