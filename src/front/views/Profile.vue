<script setup>
import ProfileEditor from '../components/profile/ProfileEditor.vue';
import SecurityUserProvider from '../provider/security/SecurityUserProvider.vue';

</script>

<template>
    <h1>Profil</h1>
    
    <SecurityUserProvider v-slot="{currentUser, getCurrentUser}">
        <ProfileEditor :user="currentUser" :getUser="getCurrentUser"></ProfileEditor>
    </SecurityUserProvider>
</template>