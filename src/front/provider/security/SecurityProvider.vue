<script setup>
import { ref, reactive, provide, onMounted } from "vue";
import { SECURITY_CURRENT_KEY } from "./SecurityUserProviderKeys";
import { SECURITY_current } from '../../api/security';
import { useRoute, useRouter } from "vue-router";
import { io } from "socket.io-client";

const $route = useRoute();
const $router = useRouter();
const loading = ref(true);
const currentUser = reactive({});

const setCurrentUser = (data) => {
    Object.assign(currentUser, data);
}

const CONSEILLERS_socket = io(import.meta.env.VITE_WS_URL, {
    auth: {
        token: localStorage.getItem('token')
    }
});

const disconnect = () => {
    if (currentUser.id) {
        CONSEILLERS_socket.emit("user:conseiller:disconnect", currentUser);
    }

    Object.assign(currentUser, {});
    localStorage.removeItem('token');
    $router.push('/login');
}

provide(SECURITY_CURRENT_KEY, {
    currentUser,
    setCurrentUser,
    disconnect
});

onMounted(async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const user = await SECURITY_current();
        if (!user.id) {
            localStorage.removeItem('token');
            $router.push('/login');
            return;
        }

        setCurrentUser(user);
        loading.value = false;
    } else {
        loading.value = false;
    }
});
</script>

<template>
    <section v-if="loading">
        <p>Chargement de l'application...</p>
    </section>
    <slot v-else></slot>
</template>
