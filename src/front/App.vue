<script setup>
import ButtonMenu from './components/staples/menu/ButtonMenu.vue';
</script>

<template>
    <ButtonMenu :title="'CASPER'" />
    <main>
        <RouterView />
    </main>
  </template>
