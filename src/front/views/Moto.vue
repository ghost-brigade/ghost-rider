<script setup>
import { useRoute } from "vue-router";
import data from "../assets/domain/motos_data.json";

const $route = useRoute();

const selectedVehicule = data.vehicules.find(
    vehicule => vehicule.id === parseInt( $route.params.id)
);
</script>


<template>
    <section class="app_padding-section">
        <div class="app_vehicule-main-img">
            <img :src="selectedVehicule.img"/>
        </div>
        
        <div class="content">
            <div class="app_vehicule-top">
                <div class="app_vehicule-title">
                    <p>{{ selectedVehicule.brand }}</p>
                    <h1>{{ selectedVehicule.name }}</h1>
                </div>

                <h3 class="m-0">{{ selectedVehicule.price }} €</h3>
            </div>

            <RouterLink to="/discussions">
                <button class="cta full-size mb-5">Contacter un conseiller</button>
            </RouterLink>
            
            <p>{{ selectedVehicule.description }}</p>
        </div>
    </section>
</template>