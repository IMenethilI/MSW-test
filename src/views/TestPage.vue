<template>
  <div>
    <h2>TestPage</h2>
    <h3>Users</h3>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>

    <h3>Select User</h3>
    <select v-model="selectedUser">
      <option :key="user.id" v-for="user in users" :value="user">{{ user.name }}</option>
    </select>

    <h3>Selected User</h3>
    <div v-if="selectedUser">{{ selectedUser.name }}</div>

    <h3>Create User</h3>
    <div>
      <input type="text" v-model="newName" />
      <button @click="createUser">Create</button>
    </div>

    <h3>Update User</h3>
    <div>
      <input type="text" v-model="updateName" />
      <button @click="updateUser">Update</button>
    </div>

    <h3>Delete User</h3>
    <div>
      <button @click="deleteUser" :disabled="users && !selectedUser">Delete</button>
    </div>
  </div>
</template>


<script lang="ts">
import { getUsers, createUser, updateUser, deleteUser } from '../api/api'

export default {
  name: 'TestPage',
  data() {
    return {
      users: [] as any[],
      selectedUserId: 0,
      selectedUser: {} as any,
      newName: '',
      updateName: ''
    }
  },
  async created() {
    this.users = await getUsers()
    if (this.users.length > 0) {
      this.selectedUser = this.users[0]
    }
  },
  methods: {
    async createUser() {
      const newUser = await createUser(this.newName)
      this.users.push(newUser)
      this.newName = ''
    },

    async updateUser() {
      // パラメータを改修__zf
      this.selectedUser.name = this.updateName
      const data = await updateUser(this.selectedUser.id, this.selectedUser.name)
      this.users[this.selectedUserId - 1] = data
    },

    async deleteUser() {
      if (this.users.length > 0 && !this.selectedUser) {
        this.selectedUser = this.users[0]
      }
      this.users = await deleteUser(this.selectedUser.id)
      if (this.users.length == 0) {
        this.selectedUser = {}
      } else {
        this.selectedUser = this.users[0]
      }
      // this.users = this.users.filter((user) => user.id !== this.selectedUser.id)
      // this.selectedUserId = this.users[0]?.id
      // if (this.selectedUserId) {
      //   this.selectedUser = await getUserById(this.selectedUserId)
      // } else {
      //   this.selectedUser = null
      // }
    }
  }
}
</script>