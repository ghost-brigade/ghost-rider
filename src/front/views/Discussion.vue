<script setup>
import { reactive, onMounted, inject } from 'vue';
import { io } from "socket.io-client";
import { CHANNEL_find } from '../api/channel';
import { MESSAGE_list } from '../api/message';
import { useRoute } from 'vue-router';
import MessageInput from '../components/message/MessageInput.vue';
import Message from '../components/message/Message.vue';
import { SECURITY_CURRENT_KEY } from '../provider/security/SecurityUserProviderKeys';
import UsersProvider from '../provider/user/UsersProvider.vue';

const channel = reactive([]);
const messages = reactive([]);
const error = reactive(null);

// get id in url params
const $route = useRoute();
const channelId = $route.params.id;

const { currentUser } = inject(SECURITY_CURRENT_KEY);

onMounted(() => {
  loadChannel();
  loadMessages();
})

const loadChannel = async () => {
  const fetched_channel = await CHANNEL_find(channelId);
  Object.assign(channel, fetched_channel);
}

const loadMessages = async () => {
  const fetched_messages = await MESSAGE_list(channelId);
  Object.assign(messages, fetched_messages);
}

const CHANNEL_socket = io(import.meta.env.VITE_WS_URL, {
  auth: {
    token: localStorage.getItem('token')
  }
});

CHANNEL_socket.on("connect", () => {
  CHANNEL_socket.emit("channel:join", channelId);
});
CHANNEL_socket.on('message:new', (e) => {
  messages.unshift(e);
});
CHANNEL_socket.on('channel:leave:error', (err) => {
  error.value = err.message;
});
CHANNEL_socket.on('channel:join:error', (err) => {
  error.value = err.message;
});
</script>

<template>
  <section class="app_padding-section">
    <div class="content app_discussion">
      <RouterLink :to="'/discussions'">Retour</RouterLink>
      <p v-if="error">{{ error }}</p>
      <h1>{{ channel.name }}</h1>

      <UsersProvider>
        <ul class="app_list-message">
          <template v-for="message in messages">
            <Message
              :message="message"
              :currentUser="currentUser"
            />
          </template>
        </ul>
      </UsersProvider>

      <MessageInput :channel_id="channelId"/>
    </div>
  </section>
</template>
