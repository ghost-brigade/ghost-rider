<script setup>
import MotoListElement from './MotoListElement.vue';

const props = defineProps({
    vehicules: {
        type: Object,
        required: true,
        default: []
    }
});

</script>

<template>
    <ul class="app_vehicule-list">
        <MotoListElement v-for="vehicule in props.vehicules" :vehicule="vehicule"></MotoListElement>
    </ul>
</template>