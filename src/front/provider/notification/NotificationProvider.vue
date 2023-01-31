<script setup>
import { io } from "socket.io-client";
import { NOTIFICATIONS_PROVIDER } from "./NotificationProviderKeys";
import { provide, reactive, inject } from "vue";
import { SECURITY_CURRENT_KEY } from "../security/SecurityUserProviderKeys";

const notifications = reactive([]);
const currentUser = inject(SECURITY_CURRENT_KEY);
const sendNotification = (notificationData) => {
    NOTIFICATIONS_socket.emit('notification:send', currentUser, notificationData);
};

provide(NOTIFICATIONS_PROVIDER, {
    notifications,
    sendNotification
});

const NOTIFICATIONS_socket = io(import.meta.env.VITE_WS_URL, {
    auth: {
        token: localStorage.getItem('token')
    }
});

NOTIFICATIONS_socket.on('notification:receive', (notification) => {
    notifications.push(notification);
});

const eventSource = new EventSource(import.meta.env.VITE_API_URL + '/notifications/sse');

eventSource.onopen = () => {
  // OPEN SSE CONNECTION
  // console.log('connection OPEN');
};

eventSource.addEventListener('open', () => {
  // OPEN SSE CONNECTION
});

eventSource.addEventListener('message', (event) => {
  // RECEIVE SSE MESSAGE
  let notificationResponse = JSON.parse(event.data);
  console.log(notificationResponse)
  let notification = {
    message: notificationResponse.event.data.message,
    type: notificationResponse.event.data.type
  }

  notifications.push(notification);
});
</script>

<template>
    <slot></slot>
</template>
