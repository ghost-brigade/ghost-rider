<script setup>
import { useRouter } from 'vue-router';
import { reactive, inject, ref } from 'vue';
import { SECURITY_login } from '../api/security.js';
import { SECURITY_CURRENT_KEY } from '../provider/security/SecurityUserProviderKeys';


const router = useRouter();
const redirectRoute = router.currentRoute.value.query.redirect;
const { setCurrentUser } = inject(SECURITY_CURRENT_KEY);

const message = ref(null);
const formData = reactive({
    email: '',
    password: ''
});

const connect = async () => {
    if (formData.email === '' || formData.email === undefined || formData.password === '' || formData.password === undefined) {
        message.value = 'Veuillez remplir tous les champs';
        return;
    }

    try {
      const response = await SECURITY_login(formData);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setCurrentUser(userConnected);

        if (redirectRoute) {
          router.push(redirectRoute);
        } else {
          router.push("/profile");
        }
      } else {
        throw new Error(data.messages)
      }
    } catch (error) {
      message.value = error.message;
    }
}
</script>

<template>
    <section class="app_padding-section">
        <div class="content">
            <form @submit.prevent="connect">
                <h1>Connexion</h1>
                <div v-if="message" class="text text-danger mt-2 mb-2">{{ message }}</div>
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
