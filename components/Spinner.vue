<script setup lang="ts">

</script>

<template>
    <div class="spinner">
        <slot></slot>
    </div>
</template>

<style scoped>
.spinner {
    border-radius: 50%;
    border: 2px dashed currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: spin 3s infinite linear, blink 500ms infinite linear alternate;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes blink {
    from {
        opacity: 0.6;
    }

    to {
        opacity: 1;
    }
}
</style>