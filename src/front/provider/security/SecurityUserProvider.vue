<script setup>
import { provide, reactive } from 'vue';
import { SECURITY_current } from '../../api/security';
import { SECURITY_CURRENT_KEY, SECURITY_GET_CURRENT_KEY } from './SecurityUserProviderKeys';

const currentUser = reactive({});

const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    if (currentUser.id) return currentUser;

    const user = await SECURITY_current();
    if (user) {
        Object.assign(currentUser, user);
    }
    return user;
}
getCurrentUser();

provide(SECURITY_CURRENT_KEY, currentUser);
provide(SECURITY_GET_CURRENT_KEY, getCurrentUser);
</script>

<template>
    <slot 
        :currentUser="currentUser"
        :getCurrentUser="getCurrentUser"
    >
    </slot>
</template>