<script setup>
import { ref, reactive } from 'vue';
import { CHANNEL_post } from '../../api/channel.js';

const opened = ref(false);
const formData = reactive({
    name: '',
    limit: 2
});

const toggleOpen = () => {
    opened.value = !opened.value;
}

const create = () => {
    if (formData.name === '') {
        return;
    }

    const newChannel = CHANNEL_post(formData);
}
</script>

<template>
    <button @click="toggleOpen">{{ opened ? 'Fermer' : 'Créer' }}</button>
    <form @submit.prevent="create" v-show="opened">
        <div>
            <label for="name">Nom de la discussion</label>
            <input v-model="formData.name" id="name" type="text" placeholder="Définir un nom"/>
        </div>
        <div>
            <label for="limit">Limite</label>
            <input v-model="formData.limit" id="limit" type="number" min="2" max="100"/>
        </div>
        <button type="submit" class="cta">Créer</button>
    </form>
</template>