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
    <section class="app_padding-section">
        <div class="content">
            <form @submit.prevent="connect">
                <h1>Connexion</h1>
                <div class="form-row">
                    <label for="email" class="form-label">Email</label>
                    <input v-model="formData.email" id="email" type="email" class="form-control"/>
                </div>
                <div class="form-row">
                    <label for="password" class="form-label">Mot de passe</label>
                    <input v-model="formData.password" id="password" type="password" class="form-control"/>
                </div>
                <button type="submit" class="cta">Me connecter</button>
            </form>
        </div>
    </section>
</template>