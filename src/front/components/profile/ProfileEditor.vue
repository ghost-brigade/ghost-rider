<script setup>
import { inject } from 'vue';
import { SECURITY_CURRENT_KEY } from '../../provider/security/SecurityUserProviderKeys';

const { currentUser, disconnect } = inject(SECURITY_CURRENT_KEY);
console.log(currentUser);

const getRole = () => {
    if (currentUser.roles.includes('ROLE_ADMIN')) {
        return 'Administrateur';
    } else if (currentUser.roles.includes('ROLE_SELLER')) {
        return 'Vendeur';
    } else if (currentUser.roles.includes('ROLE_USER')) {
        return 'Utilisateur';
    }
};

</script>

<template>
    <p>Nom : {{ currentUser.lastname }}</p>
    <p>Prénom : {{ currentUser.firstname }}</p>
    <p>Email : {{ currentUser.email }}</p>
    <p>Role : {{ getRole() }}</p>

    <button @click="disconnect">Se déconnecter</button>
</template>
