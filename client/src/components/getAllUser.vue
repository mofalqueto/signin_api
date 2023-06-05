
<template>
    <div>
        <h1>~*Lista de Usuários*~</h1>
        <form @submit.prevent="getUsers">
            <button type="submit">Mostrar todos</button>
            <p>{{ msg }}</p>
        </form>
        <ul v-if="users.length">
            <li v-for="user in users" :key="user.id">{{ user.id }} - {{ user.nome }} - {{ user.email }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '',
            users: []
        }
    },
    methods: {
        async getUsers() {
            try {
                const response = await fetch('http://localhost:3000/api/getUsers');
                const data = await response.json();
                this.users = data;
            } catch (error) {
                this.msg = error.message;
            }
        }
    },
}
</script>

<style scoped>
button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #0e7934;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #07281b;
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
</style>