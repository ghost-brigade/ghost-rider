<script setup>
import { inject } from 'vue';
import { CONSEILLERS_PROVIDER } from '../../provider/user/UsersProviderKeys';

const { conseillers } = inject(CONSEILLERS_PROVIDER);
</script>

<template>
    <p>Conseillers connectés</p>
    <ul v-if="conseillers.length" class="app_discussion-list">
        <template v-for="conseiller in conseillers">
            <RouterLink :to="`/conseiller/${conseiller.id}`">
                <li>{{ conseiller.firstname }} {{ conseiller.lastname }}</li>
            </RouterLink>
        </template>
    </ul>
    <p v-else>Aucun conseiller n'est actuellement disponible, veuillez vous tourner vers CASPER pour obtenir des informations. Merci.</p>
</template>