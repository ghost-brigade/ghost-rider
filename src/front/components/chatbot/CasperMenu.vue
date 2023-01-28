<script setup>
import { ref, reactive, onMounted, inject } from 'vue';
import { io } from "socket.io-client";
import { SECURITY_CURRENT_KEY } from '../../provider/security/SecurityUserProviderKeys';


const { currentUser } = inject(SECURITY_CURRENT_KEY);
const previous = reactive({});
const current = reactive({'message': 'Chargement...'});
const finished = ref(false);

const CHATBOT_socket = io(import.meta.env.VITE_WS_URL, {
  auth: {
    token: localStorage.getItem('token')
  }
});

const chatbot_send = async (choice) => {
    if (choice.last === true) {
        Object.assign(current, choice);
        Object.assign(previous, {});
        finished.value = true;
        return;
    }

    const data = {
        'current': {
            ...choice,
            'id': choice.id,
            'data': choice.data ?? {}
        }
    };

    if (choice.id !== 'root') {
        data.previous = {
            ...current,
            'id': current.id,
            'data': current.data ?? {}
        };
    }

    Object.assign(current, choice);
    CHATBOT_socket.emit("chatbot:ask", data);
}

CHATBOT_socket.on('chatbot:answer', (newData) => {
    current.choices = [];
    current.ask = null;

    if (newData.saved === true || newData.last === true) {
        Object.assign(current, {'message': newData.message});
        Object.assign(previous, {});
        finished.value = true;
        return;
    }

    Object.assign(previous, current);
    Object.assign(current, newData);
});


const selectChoice = (choice) => {
    chatbot_send(choice);
}

const askCurrent = () => {
    if (!current.ask) {
        return;
    }

    if (!current.ask.data) {
        return;
    }

    const choice = {
        'data': current.ask.data
    }
    if (current.ask.next) {
        choice.id = current.ask.next;
    }
    if (current.ask.save) {
        choice.id = current.ask.save;
    }

    chatbot_send(choice);
}

const restart = () => {
    Object.assign(current, {});
    Object.assign(previous, {});
    chatbot_send({'id': 'root'});
    finished.value = false;
}

onMounted(() => {
    restart();
});
</script>

<template>
    <div v-if="currentUser.id" class="app-chatbot">
        <p>{{ current.message }}</p>
        <template v-if="current">
            <p>{{ current.text }}</p>
            <template v-for="choice in current.choices">
                <button @click="() => selectChoice(choice)">
                    {{ choice.name }}
                </button>
            </template>

            <template v-if="current.ask">
                <template v-if="current.ask.choices">
                    <select v-model="current.ask.data">
                        <option v-for="choice in current.ask.choices">
                          {{ new Date(choice).toLocaleDateString() ?? choice }}
                        </option>
                    </select>
                    <button @click="askCurrent">
                        Envoyer
                    </button>
                </template>
                <template v-else>
                    <input :type="current.ask.type" v-model="current.ask.data" placeholder="Réponse"/>
                    <button @click="askCurrent">
                        Envoyer
                    </button>
                </template>
            </template>
        </template>

        <template v-if="finished">
            <button @click="restart">Effectuer une autre demande</button>
        </template>
    </div>

    <template v-else>
        <p>Vous devez être connecté pour utiliser le chatbot.</p>
    </template>
</template>
