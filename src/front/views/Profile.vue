<script setup>
import NotificationCenter from '../components/notifications/NotificationCenter.vue';
import ProfileEditor from '../components/profile/ProfileEditor.vue';

</script>

<template>
    <section class="app_padding-section">
        <div class="content">
            <h1>Profil</h1>
            
            <ProfileEditor></ProfileEditor>
        </div>
        <div class="content">
            <h2>Notifications</h2>
            <NotificationCenter />
        </div>
    </section>
</template>