<script setup>
import { ref, reactive, onMounted } from 'vue';
import { CHATBOT } from '../../api/chatbot';
import { io } from "socket.io-client";

const current = reactive({});
const finished = ref(false);

const CHATBOT_socket = io("ws://localhost:5000", {
  auth: {
    token: localStorage.getItem('token')
  }
});

const chatbot_send = async (choice) => {
    if (choice.last) {
        Object.assign(current, choice);
        finished.value = true;
        return;
    }

    const data = {'current': choice};

    if (choice.id !== 'root') {
        data.previous = current;
    }

    CHATBOT_socket.emit("chatbot:ask", data);
}

CHATBOT_socket.on('chatbot:answer', (newData) => {
    current.choices = [];
    Object.assign(current, newData);
});


const selectChoice = (choice) => {
    chatbot_send(choice);
}

const askCurrent = () => {
    chatbot_send({'id': current.ask.next});
}

const restart = () => {
    Object.assign(current, {'message': 'Définissez votre demande :'});
    chatbot_send({'id': 'root'});
    finished.value = false;
}

onMounted(() => {
    restart();
});
</script>

<template>
    <p>{{ current.message }}</p>
    <template v-if="current">
        <p>{{ current.text }}</p>
        <template v-for="choice in current.choices">
            <button @click="() => selectChoice(choice)">
                {{ choice.name }}
            </button>
        </template>

        <template v-if="current.ask">
            <input :type="current.ask.type" v-model="current.ask.value" />
            <button @click="askCurrent">
                Envoyer
            </button>
        </template>
    </template>

    <template v-if="finished">
        <button @click="restart">Effectuer une autre demande</button>
    </template>
</template>