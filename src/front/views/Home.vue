<script setup>
import data from '../assets/domain/motos_data.json';
import MotoList from '../components/moto/MotoList.vue';

const visibleMotosId = data.visible_home;
const vehicules = data.vehicules.filter(vehicule => visibleMotosId.includes(vehicule.id));
</script>

<template>
    <section class="app_full-section app_img-section app_padding-section">
        <img class="img-background" src="../assets/images/fond_moto.jfif"/>
        <div class="content">
            <h1>Ghost riders</h1>
            <h2>Le site qui vous permet de partager votre passion de la vitesse</h2>
            <div class="app_button-container">
                <button class="cta">Découvrir</button>
            </div>
        </div>
    </section>

    <section>
        <div class="app_padding-content">
            <h2>Produits</h2>
            <p>Profitez d’une sélection unique de motos.</p>
        </div>

        <MotoList :vehicules="vehicules"></MotoList>

        <div class="app_padding-content">
            <div class="app_button-container">
                <RouterLink :to="'/shop'">
                    <button class="cta">Voir plus</button>
                </RouterLink>
            </div>
        </div>
    </section>
    
    <section class="app_img-section app_padding-section">
        <img class="img-background" src="../assets/images/fond_entretien.jfif"/>
        <div class="content">
            <h2>Entretien</h2>
            <p>Profitez des services de nos professionnels pour l’entretien de votre bolide.</p>
            <div class="app_button-container">
                <button class="cta">Voir plus</button>
            </div>
        </div>
    </section>
</template>