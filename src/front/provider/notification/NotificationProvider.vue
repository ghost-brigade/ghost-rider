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
</script>

<template>
    <slot></slot>
</template>
