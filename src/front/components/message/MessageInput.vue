<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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

    MESSAGE_add(formData);
}
</script>

<template>
    <form class="app_message-send-input" @submit.prevent="send">
        <input v-model="formData.message" id="message" type="text" placeholder="Ecrire ici..."/>
        <button type="submit" class="cta">
            <FontAwesomeIcon icon="paper-plane"/>
        </button>
    </form>
</template>