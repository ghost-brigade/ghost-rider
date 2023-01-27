<script setup>
import { useRouter } from 'vue-router';
import {reactive, inject, ref} from 'vue';
import { SECURITY_register } from '../api/security.js';
import { SECURITY_CURRENT_KEY } from '../provider/security/SecurityUserProviderKeys';

const router = useRouter();
const redirectRoute = router.currentRoute.value.query.redirect;
const { setCurrentUser } = inject(SECURITY_CURRENT_KEY);

const message = ref(null);
const formData = reactive({
  email: 'test@test',
  plainPassword: 'tEsttest01',
  firstname: 'test',
  lastname: 'test',
});

const verify = ({email, password, firstname, lastname}) => {
  if (!email.includes('@')) {
    message.value = 'Email invalide';
    return false;
  }
  if (password.length < 8) {
    throw new Error('Le mot de passe doit contenir au moins 8 caractères');
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error('Le mot de passe doit contenir au moins une majuscule');
  }
  if (!/[a-z]/.test(password)) {
    throw new Error('Le mot de passe doit contenir au moins une minuscule');
  }
  if (firstname.length < 2) {
    throw new Error('Le prénom doit contenir au moins 2 caractères');
  }
  if (/[0-9]/.test(firstname)) {
    throw new Error('Le prénom ne doit pas contenir de chiffre');
  }
  if (lastname.length < 2) {
    throw new Error('Le nom doit contenir au moins 2 caractères');
  }
  if (/[0-9]/.test(lastname)) {
    throw new Error('Le nom ne doit pas contenir de chiffre');
  }
}

const register = async ({email, password, firstname, lastname}) => {
  console.table(email, password, firstname, lastname);
  message.value = null;

  if (email === '' || email === undefined || password === '' || password === undefined || firstname === '' || firstname === undefined || lastname === '' || lastname === undefined) {
    throw new Error('Tous les champs sont obligatoires');
  }

  verify({email, password, firstname, lastname});

  const response = await SECURITY_register({email, password, firstname, lastname}).catch((error) => {
    message.value = error.message;
  });

  if (response.ok) {
    return router.push('/login');
  }

  const data = await response.json();
  message.value = data.messages;
}

const handleRegistration = async () => {
  try {
    await register({email: formData.email, password: formData.password, firstname: formData.firstname, lastname: formData.lastname});
  } catch (err) {
    message.value = err.message;
  }
}
</script>

<template>
  <section class="app_padding-section">
    <div class="content">
      <form @submit.prevent="handleRegistration">
        <h1>Inscription</h1>
        <div v-if="message" class="text text-danger mt-2 mb-2">{{ message }}</div>
        <div class="form-row">
          <label for="email" class="form-label">Email</label>
          <input v-model="formData.email" id="email" type="email" class="form-control"/>
        </div>
        <div class="form-row">
          <label for="password" class="form-label">Mot de passe</label>
          <input v-model="formData.password" id="password" type="password" class="form-control"/>
        </div>
        <div class="form-row">
          <label for="firstname" class="form-label">Prénom</label>
          <input v-model="formData.firstname" id="firstname" type="text" class="form-control"/>
        </div>
        <div class="form-row">
          <label for="lastname" class="form-label">Nom</label>
          <input v-model="formData.lastname" id="lastname" type="text" class="form-control"/>
        </div>
        <button type="submit" class="cta">M'inscrire</button>
      </form>
      <p class="text-center mt-5">Déjà un compte ? <router-link to="/login" class="text-decoration-underline">Me connecter</router-link></p>
    </div>
  </section>
</template>
