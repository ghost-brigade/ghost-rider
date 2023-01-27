<script setup>
import { inject } from 'vue';
import { CONSEILLERS_PROVIDER } from '../../provider/user/UsersProviderKeys';

const { conseillers } = inject(CONSEILLERS_PROVIDER);
</script>

<template>
    <template v-if="conseillers.length">
        <p>Conseillers connectés</p>
        <ul class="app_discussion-list">
            <template v-for="conseiller in conseillers">
            <RouterLink :to="`/conseiller/${conseiller.id}`">
                <li>{{ conseiller.firstname }} {{ conseiller.lastname }}</li>
            </RouterLink>
        </template>
      </ul>
    </template>
</template>