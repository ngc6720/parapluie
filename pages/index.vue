<script setup lang="ts">

const geocodeStore = useGeocodeStore();
const weatherStore = useWeatherStore();
const favouritesStore = useFavouritesStore();

const searchResults = computed(() => geocodeStore.results.map(result => result.info))

</script>

<template class="page">

    <div>
        <h1>
            Do i need my parapluie ?
            <span>Do i need my umbrella ?</span>
        </h1>
        <h2>Search a city to find out</h2>
        <div id="pluie">
            <Autocomplete :results="searchResults" @update="geocodeStore.update" @submit="geocodeStore.select">
            </Autocomplete>
            <Graph></Graph>
        </div>
        <button id="add-to-favourites" v-show="weatherStore.data" @click="favouritesStore.add">Add to
            favourites</button>
    </div>

</template>

<style>
h1 {
    display: flex;
    flex-direction: column;
    gap: var(--padding-b);
}

h1>span {
    font-size: var(--font-size-s);
    font-style: italic;
}

#pluie {
    display: flex;
    flex-direction: column;
    gap: var(--padding-a);
    margin-bottom: var(--padding-c);
}

button#add-to-favourites {
    display: flex;
    color: var(--color-accent);
    background-color: var(--color-accent-dark);
    border-radius: var(--border-radius)
}
</style>
