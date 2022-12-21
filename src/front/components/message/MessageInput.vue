<script setup>
import { ref, reactive } from 'vue';
import { MESSAGE_add } from '../../api/message';

const props = defineProps({
    channel_id: {
        required: true
    }
});

const formData = reactive({
    channelId: parseInt(props.channel_id),
    message: ''
});

const send = async () => {
    if (!formData.channelId || formData.message === '') {
        return;
    }

    const newMessage = await MESSAGE_add(formData);
    console.log(newMessage);
}
</script>

<template>
    <form @submit.prevent="send">
        <input v-model="formData.message" id="message" type="text" placeholder="Ecrire ici..."/>
        <button type="submit" class="cta">Envoyer</button>
    </form>
</template>