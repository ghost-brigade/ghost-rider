<script setup>
import { inject } from 'vue';
import { SECURITY_CURRENT_KEY } from '../../provider/security/SecurityUserProviderKeys';

const { currentUser, disconnect } = inject(SECURITY_CURRENT_KEY);

</script>

<template>
    <p>Nom : {{ currentUser.lastname }}</p>
    <p>Prénom : {{ currentUser.firstname }}</p>
    <p>Email : {{ currentUser.email }}</p>

    <button @click="disconnect">Se déconnecter</button>
</template>