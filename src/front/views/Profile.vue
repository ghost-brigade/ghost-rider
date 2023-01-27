<script setup>
import { inject } from 'vue';
import ProfileEditor from '../components/profile/ProfileEditor.vue';
import { SECURITY_CURRENT_KEY } from '../provider/security/SecurityUserProviderKeys';

const { currentUser } = inject(SECURITY_CURRENT_KEY);

</script>

<template>
    <h1>Profil</h1>
    
    <ProfileEditor :user="currentUser" :getUser="getCurrentUser"></ProfileEditor>
</template>