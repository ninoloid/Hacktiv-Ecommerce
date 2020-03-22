import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    oneProduct: {},
    notification: '',
    error: {},
    isLoading: false,
    isLogin: false,
    userCart: {}
  },
  mutations: {
    FETCH_PRODUCTS (state, data) {
      state.products = data
    },
    FETCH_ONE_PRODUCT (state, data) {
      state.oneProduct = data.product
    },
    SET_IS_LOADING (state, data) {
      state.isLoading = data
    },
    SET_NOTIFICATION (state, data) {
      state.notification = data
      setTimeout(() => {
        state.notification = ''
      }, 50)
    },
    SET_ERROR (state, data) {
      state.error = data
      setTimeout(() => {
        state.error = ''
      }, 50)
    },
    SET_LOGIN (state, data) {
      state.isLogin = data
    },
    SET_USER_CART (state, data) {
      state.userCart = data
    }
  },
  actions: {
    fetchProducts (context) {
      context.commit('SET_IS_LOADING', true)
      axios({
        method: 'get',
        url: process.env.VUE_APP_BASEURL + 'product'
      })
        .then(({ data }) => {
          const filtered = data.products.filter(product => product.stock > 0)
          context.commit('FETCH_PRODUCTS', filtered)
          context.commit('SET_IS_LOADING', false)
        })
        .catch(err => {
          context.commit('SET_ERROR', err)
          context.commit('SET_IS_LOADING', false)
        })
    },

    fetchOneProduct (context, product) {
      context.commit('SET_IS_LOADING', true)
      return axios({
        method: 'get',
        url: process.env.VUE_APP_BASEURL + 'product/' + product.id
      })
    },

    login (context, data) {
      return axios({
        method: 'post',
        url: process.env.VUE_APP_BASEURL + 'login',
        data: {
          identification: data.identification,
          password: data.password
        }
      })
    },

    register (context, data) {
      return axios({
        method: 'post',
        url: process.env.VUE_APP_BASEURL + 'register',
        data: {
          username: data.username,
          email: data.email,
          password: data.password
        }
      })
    },

    addToCart (context, data) {
      return axios({
        method: 'post',
        url: process.env.VUE_APP_BASEURL + 'cart',
        data: {
          ProductId: data.ProductId,
          quantity: data.quantity,
          checkout: false,
          type: data.type
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
    },

    getCart (context) {
      context.commit('SET_IS_LOADING', true)
      axios({
        method: 'get',
        url: process.env.VUE_APP_BASEURL + 'cart',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('SET_USER_CART', data)
          context.commit('SET_IS_LOADING', false)
        })
        .catch(err => {
          context.commit('SET_ERROR', err)
          context.commit('SET_IS_LOADING', false)
        })
    },

    getDiscount (context, data) {
      return axios({
        method: 'post',
        url: process.env.VUE_APP_BASEURL + 'cart/discount',
        data: {
          voucherCode: data
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
    },

    checkout (context, data) {
      return axios({
        method: 'patch',
        url: process.env.VUE_APP_BASEURL + 'cart/checkout',
        headers: {
          access_token: localStorage.access_token
        }
      })
    },

    deleteFromCart (context, data) {
      return axios({
        method: 'delete',
        url: process.env.VUE_APP_BASEURL + 'cart',
        data: {
          UserId: data.UserId,
          ProductId: data.ProductId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
    }
  },
  modules: {
  }
})
