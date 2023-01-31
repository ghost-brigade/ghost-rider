<script setup>
import { ref, reactive } from 'vue';
import { CHANNEL_post, CHANNEL_get } from '../../api/channel.js';

const emits = defineEmits(['update:discussions']);
const props = defineProps({
    currentUser: {
        type: Object,
        required: true,
        default: {}
    }
});

const opened = ref(false);
const formData = reactive({
    name: '',
    limit: 2
});

const toggleOpen = () => {
    opened.value = !opened.value;
}

const create = async () => {
  if (formData.name === '') {
    return;
  }

  const newChannel = await CHANNEL_post(formData);
  opened.value = false;
  emits('update:discussions', newChannel);
}

const authorized = ref(props.currentUser.id !== undefined
    && props.currentUser.roles.includes('ROLE_ADMIN'));
</script>

<template>
    <div v-if="authorized" class="app_toggle-button-form">
        <button @click="toggleOpen" class="app_toggle-button">{{ opened ? 'Fermer' : 'Créer' }}</button>
        <form @submit.prevent="create" v-show="opened">
            <div class="form-row">
                <label for="name" class="form-label">Nom de la discussion</label>
                <input v-model="formData.name" id="name" type="text" placeholder="Définir un nom" class="form-control"/>
            </div>
            <div class="form-row">
                <label for="limit" class="form-label">Limite</label>
                <input v-model="formData.limit" id="limit" type="number" min="2" max="100" class="form-control"/>
            </div>
            <button type="submit" class="cta">Créer</button>
        </form>
    </div>
</template>
