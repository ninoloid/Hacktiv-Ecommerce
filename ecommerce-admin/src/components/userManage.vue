<template>
  <div style="height: 90vh; overflow: auto;">
    <div><h4>User Management</h4></div>
    <div style="display: flex; justify-content: flex-end; margin: 1rem;">
      <a
        class="waves-effect waves-light btn"
        style="margin-right: 1rem;"
        @click.prevent="setCurrentFilter('active')"
      >
        ACTIVE ADMINS
      </a>
      <a
        class="waves-effect waves-light btn"
        style="margin-right: 1rem;"
        @click.prevent="setCurrentFilter('inactive')"
      >
        INACTIVE ADMINS
      </a>
      <a
        class="waves-effect waves-light btn"
        @click.prevent="setCurrentFilter('users')"
      >
        USERS
      </a>
    </div>
    <table>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th v-if="currentFilter !== 'users'">Activated</th>
        <th v-if="currentFilter === 'users'">Change Password</th>
        <th v-if="currentFilter !== 'users'">Menu</th>
      </tr>
      <!-- PRODUCT DETAIL HERE -->
      <UserTable :currentFilter="currentFilter" v-for="user in filter" :key="user.id" :user="user" @refresh="onload" :superAdmin="isSuperAdmin"/>
      <!--  -->
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import UserTable from '@/components/userTable'

export default {
  data () {
    return {
      currentFilter: '',
      filter: [],
      isSuperAdmin: false
    }
  },
  computed: {
    ...mapState(['superAdmin']),
    ...mapGetters(['getAdmins', 'getInactiveAdmins', 'getUsers'])
  },
  components: {
    UserTable
  },
  methods: {
    setCurrentFilter (current) {
      this.currentFilter = current
      if (current === 'inactive') {
        this.filter = this.getInactiveAdmins
      } else if (current === 'users') {
        this.filter = this.getUsers
      } else {
        this.filter = this.getAdmins
      }
    },
    onload () {
      this.filter = this.getUsers
      this.setCurrentFilter('users')
    }
  },
  created () {
    this.onload()
    this.isSuperAdmin = this.superAdmin
  }
}
</script>

<style>

</style>
