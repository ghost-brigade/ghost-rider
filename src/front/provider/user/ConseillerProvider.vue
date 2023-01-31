<script setup>
import {CONSEILLERS_PROVIDER} from './UsersProviderKeys';
import { reactive, provide, inject } from 'vue';
import { io } from 'socket.io-client';
import { SECURITY_CURRENT_KEY } from '../security/SecurityUserProviderKeys';

const conseillers = reactive([]);
const { currentUser } = inject(SECURITY_CURRENT_KEY);

provide(CONSEILLERS_PROVIDER, { conseillers });

const CONSEILLERS_socket = io(import.meta.env.VITE_WS_URL, {
  auth: {
    token: localStorage.getItem('token')
  }
});

CONSEILLERS_socket.on("connect", () => {
    if (currentUser.id) {
        CONSEILLERS_socket.emit("user:conseiller:connect", currentUser);
    }
});
CONSEILLERS_socket.on("user:conseiller:update", (e) => {
    Object.assign(conseillers, e);
});
</script>
<template>
    <slot></slot>
</template>
