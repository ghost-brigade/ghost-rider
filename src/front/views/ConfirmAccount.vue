<script setup>
import { useRouter, useRoute } from 'vue-router';
import {reactive, ref} from 'vue';
import { SECURITY_account_confirmation } from '../api/security.js';

const router = useRouter();

const { token } = useRoute().params
const message   = ref(null);
const formData  = reactive({email: ''});

const validate = async ({email}) => {
  message.value = null;

  if (email === '' || email === undefined) {
    throw new Error('Tous les champs sont obligatoires');
  }

  const response = await SECURITY_account_confirmation({email, token}).catch((error) => {
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
        <h1>Confirmation de compte</h1>
        <div v-if="message" class="text text-danger mt-2 mb-2">{{ message }}</div>
        <div class="form-row">
          <label for="email" class="form-label">Email</label>
          <input v-model="formData.email" id="email" type="email" class="form-control"/>
        </div>
        <button type="submit" class="cta">Valider mon compte</button>
      </form>
    </div>
  </section>
</template>
