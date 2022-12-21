<script setup>
import { reactive } from 'vue';
import { SECURITY_login } from '../api/security.js';

const formData = reactive({
    email: '',
    password: ''
});

const connect = () => {
    if (formData.email === '' || formData.password === '') {
        return;
    }
    
    const userConnected = SECURITY_login(formData);
}
</script>

<template>
    <form @submit.prevent="connect">
        <input v-model="formData.email" type="email"/>
        <input v-model="formData.password" type="password"/>
        <button type="submit" class="cta">Me connecter</button>
    </form>
</template>