<script setup>
import { useRouter } from 'vue-router';
import { reactive, inject } from 'vue';
import { SECURITY_login } from '../api/security.js';
import { SECURITY_CURRENT_KEY } from '../provider/security/SecurityUserProviderKeys';


const router = useRouter();
const redirectRoute = router.currentRoute.value.query.redirect;
const { setCurrentUser } = inject(SECURITY_CURRENT_KEY);

const formData = reactive({
    email: '',
    password: ''
});

const connect = async () => {
    if (formData.email === '' || formData.password === '') {
        return;
    }

    const userConnected = await SECURITY_login(formData);
    setCurrentUser(userConnected);

    if (redirectRoute) {
        router.push(redirectRoute);
    } else {
        router.push("/profile");
    }
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
            <p class="text-center mt-5">Pas encore inscrit ? <router-link to="/register" class="text-decoration-underline">Créer un compte</router-link></p>
        </div>
    </section>
</template>
