<script setup>
const props = defineProps({
    vehicule: {
        type: Object,
        required: true,
        default: {}
    }
});
console.log(props.vehicule);
</script>

<template>
    <li class="app_vehicule-list-element">
        <RouterLink :to="`/moto/${props.vehicule.id}`">
            <div class="app_vehicule-list-element-img">
                <img :src="props.vehicule.img"/>
            </div>
            <div class="app_vehicule-list-element-content">
                <h2>{{ props.vehicule.brand }} {{ props.vehicule.name }}</h2>
            </div>
        </RouterLink>
    </li>
</template>