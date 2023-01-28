<script setup>
import CasperMenu from './components/chatbot/CasperMenu.vue';
import ButtonMenu from './components/staples/menu/ButtonMenu.vue';
import NotificationDisplayer from './components/notifications/NotificationDisplayer.vue';
import NotificationProvider from './provider/notification/NotificationProvider.vue';
import SecurityProvider from "./provider/security/SecurityProvider.vue";
</script>

<template>
    <SecurityProvider>
        <ButtonMenu :title="'CASPER'">
            <CasperMenu />
        </ButtonMenu>

        <NotificationProvider>
            <NotificationDisplayer />
            <main>
                <RouterView />
            </main>
        </NotificationProvider>
    </SecurityProvider>
  </template>
