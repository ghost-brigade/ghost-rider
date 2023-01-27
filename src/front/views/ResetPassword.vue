<script setup>
import { useRouter, useRoute } from 'vue-router';
import {reactive, ref} from 'vue';
import { SECURITY_reset_password } from '../api/security.js';

const router = useRouter();

const { token } = useRoute().params
const message   = ref(null);
const formData  = reactive({
  password: '',
  password_confirm: '',
});

const validate = async ({email}) => {
  message.value = null;

  if (
    token === '' || token === undefined ||
    formData.password === '' || formData.password === undefined ||
    formData.password_confirm === '' || formData.password_confirm === undefined
  ) {
    throw new Error('Tous les champs sont obligatoires');
  }
  if (formData.password !== formData.password_confirm) {
    throw new Error('Les mots de passe ne correspondent pas');
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

  const response = await SECURITY_reset_password({token, password: formData.password}).catch((error) => {
    message.value = error.message;
  });

  if (response.ok) {
    return router.push('/login');
  }

  const data = await response.json();
  message.value = data.messages;
}

const handleConfirmation = async () => {
  try {
    await validate({email: formData.email});
  } catch (err) {
    message.value = err.message;
  }
}
</script>

<template>
  <section class="app_padding-section">
    <div class="content">
      <form @submit.prevent="handleConfirmation">
        <h1>Réinitialisation de mot de passe</h1>
        <div v-if="message" class="text text-danger mt-2 mb-2">{{ message }}</div>
        <div class="form-row">
          <label for="password" class="form-label">Mot de passe</label>
          <input v-model="formData.password" id="password" type="password" class="form-control"/>
        </div>
        <div class="form-row">
          <label for="password_confirm" class="form-label">Confirmation du mot de passe</label>
          <input v-model="formData.password_confirm" id="password_confirm" type="password" class="form-control"/>
        </div>
        <button type="submit" class="cta">Réinitialiser mon mot de passe</button>
      </form>
    </div>
  </section>
</template>
