<script setup>
import { onMounted, inject, watch } from 'vue';
import { SECURITY_CURRENT_KEY } from '../../provider/security/SecurityUserProviderKeys';

const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    getUser: {
        type: Function,
        required: true
    }
});
</script>

<template>
    <p>Edit</p>
    <template v-if="props?.user?.id">
        <p>{{ props.user.id }}</p>
    </template>
</template>