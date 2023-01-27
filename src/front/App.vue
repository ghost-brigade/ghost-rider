<script setup>
import CasperMenu from './components/chatbot/CasperMenu.vue';
import ButtonMenu from './components/staples/menu/ButtonMenu.vue';
import SecurityProvider from "./provider/security/SecurityProvider.vue";
</script>

<template>
    <SecurityProvider>
        <ButtonMenu :title="'CASPER'">
            <CasperMenu />
        </ButtonMenu>
        <main>
            <RouterView />
        </main>
    </SecurityProvider>
  </template>
