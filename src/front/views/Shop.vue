<script setup>
import data from "../assets/domain/motos_data.json";
import MotoList from '../components/moto/MotoList.vue';

const vehicules = data.vehicules;
</script>

<template>
    <section>
        <div class="app_padding-content">
            <h1>Nos véhicules</h1>
            <p>Consulter nos véhicules dans la liste située ci-dessous.</p>
        </div>
        <MotoList :vehicules="vehicules"></MotoList>
    </section>
</template>