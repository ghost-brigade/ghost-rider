<script setup>
import { ref, reactive, provide, onMounted } from "vue";
import { SECURITY_CURRENT_KEY } from "./SecurityUserProviderKeys";
import { SECURITY_current } from '../../api/security';
import { useRoute } from "vue-router";

const $route = useRoute();
const loading = ref(true);
const currentUser = reactive({});
const setCurrentUser = (data) => {
    Object.assign(currentUser, data);
}
provide(SECURITY_CURRENT_KEY, {
    currentUser,
    setCurrentUser
});
onMounted(async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const user = await SECURITY_current();
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