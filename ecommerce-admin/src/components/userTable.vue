<template>
  <tr>
    <td>{{user.username}}</td>
    <td>{{user.email}}</td>
    <td v-if="currentFilter !== 'users'">{{user.isActivated ? "Yes" : "No"}}</td>
    <td v-if="currentFilter === 'active'">
      <ul>
        <li style="color: red;" @click="confirm('deleteAdmin')" :class="{ disabled: !superAdmin }"><i class="material-icons deleteButton">delete</i></li>
      </ul>
    </td>
    <td v-if="currentFilter === 'inactive'" style="width: 10vw;" :class="{ disabled: !superAdmin }">
      <ul>
        <form>
          <p>
            <label>
              <input type="checkbox" v-model="activate" @change="confirm('updateAdmin')"/>
              <span style="color: darkslategrey;">Set Active</span>
            </label>
          </p>
        </form>
      </ul>
    </td>
    <td v-if="currentFilter === 'users'" style="width: 30vw;">
      <form @submit.prevent="confirm('changeUserPassword')">
        <input
          id="password"
          type="password"
          class="validate"
          placeholder="New Password"
          style="width: 20vw;"
          v-model="newPassword"
        >
        <button
          class="btn waves-effect waves-light"
          type="submit"
          name="action"
          style="width: 7vw; margin-left: 1vw;"
        >
          Set
        </button>
      </form>
    </td>
    <td v-if="currentFilter === 'users'">
    </td>
  </tr>
</template>

<script>
export default {
  data () {
    return {
      newPassword: '',
      activate: false,
      userId: null,
      isActive: false
    }
  },
  props: {
    user: Object,
    currentFilter: String,
    superAdmin: Boolean
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
    deleteUser () {
      this.$store.commit('SET_IS_LOADING', true)
      this.$store.dispatch('deleteUser', this.user.id)
        .then(({ data }) => {
          this.$store.commit('SET_NOTIFICATION', data.msg)
          this.$store.dispatch('fetchAllUsers')
          this.$store.commit('SET_IS_LOADING', false)
        })
        .catch(err => {
          this.$store.commit('SET_ERROR', err)
          this.$store.commit('SET_IS_LOADING', false)
        })
    },

    deleteAdmin () {
      this.$store.commit('SET_IS_LOADING', true)
      this.$store.dispatch('deleteAdmin', this.user.id)
        .then(({ data }) => {
          this.$store.dispatch('fetchAllUsers')
          this.$emit('refresh')
          this.$store.commit('SET_NOTIFICATION', data.msg)
          this.$store.commit('SET_IS_LOADING', false)
        })
        .catch(err => {
          this.$store.commit('SET_ERROR', err)
          this.$store.commit('SET_IS_LOADING', false)
        })
    },

    activateAdmin () {
      this.$store.commit('SET_IS_LOADING', true)
      this.$store.dispatch('activateAdmin', this.user.id)
        .then(({ data }) => {
          this.$store.dispatch('fetchAllUsers')
          this.$emit('refresh')
          this.$store.commit('SET_NOTIFICATION', data.msg)
          this.$store.commit('SET_IS_LOADING', false)
        })
        .catch(err => {
          this.$store.commit('SET_ERROR', err)
          this.$store.commit('SET_IS_LOADING', false)
        })
    },

    confirm (type) {
      let title, msg, ifOk
      let ifCancel = function () {}

      if (type === 'deleteAdmin') {
        title = 'Delete Admin Account'
        msg = 'Are you sure want to delete this admin account?'
        ifOk = this.deleteAdmin
      } else if (type === 'updateAdmin') {
        title = 'Activate Admin Account'
        msg = 'Are you sure want to activate this admin account?'
        ifOk = this.activateAdmin
        ifCancel = () => { this.activate = false }
      } else if (type === 'changeUserPassword') {
        title = 'Change user password'
        msg = 'Are you sure want to change password of this user?'
        ifOk = this.changeUserPassword
        ifCancel = () => { this.newPassword = '' }
      }

      this.$alertify.confirmWithTitle(
        title,
        msg,
        () => ifOk(),
        () => ifCancel()
      )
    },

    changeUserPassword () {
      this.$store.commit('SET_IS_LOADING', true)
      this.$store.dispatch('changeUserPassword', {
        id: this.user.id,
        password: this.newPassword
      })
        .then(({ data }) => {
          this.$store.commit('SET_NOTIFICATION', data.msg)
          this.$store.dispatch('fetchAllUsers')
          this.newPassword = ''
          this.$store.commit('SET_IS_LOADING', false)
        })
        .catch(err => {
          this.$store.commit('SET_ERROR', err)
          this.$store.commit('SET_IS_LOADING', false)
        })
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
  padding: 0 5px;
}
.disabled {
  pointer-events: none;
  color: grey !important;
}
</style>
