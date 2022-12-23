<script setup>
import { reactive, onMounted } from 'vue';
import { io } from "socket.io-client";
import { CHANNEL_find } from '../api/channel';
import { MESSAGE_list } from '../api/message';
import { useRoute } from 'vue-router';
import MessageInput from '../components/message/MessageInput.vue';
import Message from '../components/message/Message.vue';
import UserProvider from '../provider/users/UserProvider.vue';
import SecurityUserProvider from '../provider/security/SecurityUserProvider.vue';

const channel = reactive([]);
const messages = reactive([]);

// get id in url params
const $route = useRoute();
const channelId = $route.params.id;

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

const CHANNEL_socket = io("ws://localhost:5000", {
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
</script>

<template>
  <section class="app_padding-section">
    <div class="content app_discussion">
      <RouterLink :to="'/discussions'">Retour</RouterLink>
      <h1>{{ channel.name }}</h1>

      <SecurityUserProvider v-slot="{ currentUser }">
        <UserProvider v-slot="{ getUserById, getUserByPath }">
          <ul class="app_list-message">
            <template v-for="message in messages">
              <Message
                :message="message"
                :currentUser="currentUser"
                :getUserById="getUserById"
                :getUserByPath="getUserByPath"
              />
            </template>
          </ul>
        </UserProvider>
      </SecurityUserProvider>

      <MessageInput :channel_id="channelId"/>
    </div>
  </section>
</template>
