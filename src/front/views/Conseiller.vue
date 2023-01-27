<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CHANNEL_conseiller } from '../api/channel';

// get id in url params
const $route = useRoute();
const $router = useRouter();
const conseillerId = $route.params.id;

onMounted(async() => {
    const channel_conseiller = await CHANNEL_conseiller(conseillerId);
    $router.push(`/discussion/${channel_conseiller.id}`);
})
</script>

<template>
    <section class="app_padding-section">
        <div class="content">
            <p>Connexion avec le conseiller...</p>
        </div>
    </section>
</template>