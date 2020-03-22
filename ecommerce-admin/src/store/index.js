import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    filteredProducts: [],
    addProduct: false,
    error: {},
    notification: '',
    access_token: '',
    isLogin: false,
    username: '',
    oneProduct: {},
    admin: [],
    inactiveAdmin: [],
    allUsers: [],
    superAdmin: false,
    isLoading: false
  },
  mutations: {
    FETCH_PRODUCTS (state, data) {
      state.products = data
    },
    FETCH_ONE_PRODUCT (state, data) {
      state.oneProduct = data.product
    },
    SET_FILTERED_PRODUCTS (state, data) {
      state.filteredProducts = data
    },
    SHOW_ADD_FORM (state, data) {
      state.addProduct = data
    },
    SET_ERROR (state, data) {
      state.error = data
    },
    SET_NOTIFICATION (state, data) {
      state.notification = data
    },
    SET_USER_CREDENTIALS (state, data) {
      state.access_token = data.token
      state.username = data.username
      state.superAdmin = data.isSuperAdmin
    },
    SET_LOGIN (state, data) {
      state.isLogin = data
    },
    FETCH_ALL_USERS (state, data) {
      state.allUsers = data
    },
    SET_IS_LOADING (state, data) {
      state.isLoading = data
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
          context.commit('FETCH_PRODUCTS', data.products)
          context.commit('SET_FILTERED_PRODUCTS', data.products)
          context.commit('SHOW_ADD_FORM', false)
          context.commit('SET_IS_LOADING', false)
        })
        .catch(err => {
          context.commit('SET_ERROR', err)
          context.commit('SET_IS_LOADING', false)
        })
    },

    fetchOneProduct (context, product) {
      return axios({
        method: 'get',
        url: process.env.VUE_APP_BASEURL + 'product/' + product.id
      })
    },

    addProduct (context, formData) {
      return axios
        .post(process.env.VUE_APP_BASEURL + 'product', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            access_token: this.state.access_token
          }
        })
    },

    editProduct (context, data) {
      const { formData, query } = data
      return axios
        .put(process.env.VUE_APP_BASEURL + 'product/' + query.id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            access_token: this.state.access_token
          }
        })
    },

    deleteProduct (context, id) {
      return axios({
        method: 'delete',
        url: process.env.VUE_APP_BASEURL + 'product/' + id,
        headers: {
          access_token: this.state.access_token
        }
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
          password: data.password,
          isAdmin: data.isAdmin
        }
      })
    },

    fetchAllUsers (context) {
      context.commit('SET_IS_LOADING', true)
      axios({
        method: 'get',
        url: process.env.VUE_APP_BASEURL + 'showUsers'
      })
        .then(({ data }) => {
          context.commit('FETCH_ALL_USERS', data)
          context.commit('SET_IS_LOADING', false)
        })
        .catch(err => {
          context.commit('SET_ERROR', err)
          context.commit('SET_IS_LOADING', false)
        })
    },

    deleteAdmin (context, id) {
      return axios({
        method: 'delete',
        url: process.env.VUE_APP_BASEURL + 'deleteAdmin/' + id,
        headers: {
          access_token: this.state.access_token
        }
      })
    },

    deleteUser (context, id) {
      return axios({
        method: 'delete',
        url: process.env.VUE_APP_BASEURL + 'deleteUser/' + id,
        headers: {
          access_token: this.state.access_token
        }
      })
    },

    activateAdmin (context, id) {
      return axios({
        method: 'patch',
        url: process.env.VUE_APP_BASEURL + 'updateAdmin/' + id,
        data: {
          isActivated: true
        },
        headers: {
          access_token: this.state.access_token
        }
      })
    },

    changeUserPassword (context, data) {
      return axios({
        method: 'patch',
        url: process.env.VUE_APP_BASEURL + 'updateUserPassword/' + data.id,
        data: {
          password: data.password
        },
        headers: {
          access_token: this.state.access_token
        }
      })
    }
  },

  modules: {
  },
  getters: {
    getFilteredProducts (state, words) {
      const regex = new RegExp(words, 'gi')
      return state.products.filter(product => product.name.match(regex))
    },
    getAdmins (state, words) {
      return state.allUsers.filter(user => user.isActivated && !user.isSuperAdmin)
    },
    getInactiveAdmins (state, words) {
      return state.allUsers.filter(user => !user.isActivated && user.isAdmin)
    },
    getUsers (state, words) {
      return state.allUsers.filter(user => !user.isAdmin)
    }
  }
})
