<template>
  <div>
    <h2>TestPage</h2>
    <h3>Users</h3>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>

    <h3>Select User</h3>
    <select v-model="selectedUserId">
      <option v-for="user in users" :value="user.id">{{ user.name }}</option>
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
      <input type="text" v-model="selectedUser.name" />
      <button @click="updateUser">Update</button>
    </div>

    <h3>Delete User</h3>
    <div>
      <button @click="deleteUser">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '@/api'

export default {
  name: 'TestPage',
  data() {
    return {
      users: [] as any[],
      selectedUserId: 0,
      selectedUser: null as any,
      newName: ''
    }
  },
  async created() {
    this.users = await getUsers()
    this.selectedUserId = this.users[0]?.id
    if (this.selectedUserId) {
      this.selectedUser = await getUserById(this.selectedUserId)
    }
  },
  methods: {
    async createUser() {
      const newUser = await createUser({ name: this.newName })
      this.users.push(newUser)
      this.newName = ''
    },

    async updateUser() {
      await updateUser(this.selectedUser.id, this.selectedUser.name)
    },

    async deleteUser() {
      await deleteUser(this.selectedUser.id)
      this.users = this.users.filter((user) => user.id !== this.selectedUser.id)
      this.selectedUserId = this.users[0]?.id
      if (this.selectedUserId) {
        this.selectedUser = await getUserById(this.selectedUserId)
      } else {
        this.selectedUser = null
      }
    }
  }
}
</script>
