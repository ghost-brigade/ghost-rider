<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import Menu from './Menu.vue';

const props = defineProps({
    title: {
        type: String,
        required: false,
        default: 'Demande'
    }
});

const opened = ref(false);
const toggleOpen = () => opened.value = !opened.value;

</script>
<template>
    <div class="app_menu_with_button">
        <button class="app_menu_button" @click="toggleOpen">
            <div class="app_menu_button_content">
                <FontAwesomeIcon :icon="'ghost'"></FontAwesomeIcon>
            </div>
        </button>
        <div class="app_menu_content" :class="opened ? 'opened' : ''">
            <div class="app_menu_content_title">
                <h2>{{ props.title }}</h2>
                <FontAwesomeIcon :icon="'close'" @click="toggleOpen"></FontAwesomeIcon>
            </div>
            <slot></slot>
        </div>
        <Menu></Menu>
    </div>
</template>