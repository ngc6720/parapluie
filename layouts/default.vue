<script setup>

let isExpandedFavourites = ref(false);
const favouritesStore = useFavouritesStore();
watch(favouritesStore.favourites, () => {
    isExpandedFavourites.value = true;
})

</script>
<template>
    <header>
        <input id="toggle-sidebar" name="toggle-sidebar" type="checkbox" aria-controls="sidebar">
        <label id="toggle-sidebar-label" for="toggle-sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-menu">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 8l16 0" />
                <path d="M4 16l16 0" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-x">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
            </svg>
        </label>
        <aside id="sidebar">
            <nav>
                <NuxtLink to="/">
                    <Logo id="logo"></Logo>
                </NuxtLink>
                <!-- <NuxtLink to="/signup">Sign up</NuxtLink>
                <NuxtLink to="/login">Log in</NuxtLink> -->
                <!-- <NuxtLink to="/">Log out</NuxtLink> -->
            </nav>
            <div>
                <button id="toggle-favourites" class="button-with-icon" :class="{ expanded: isExpandedFavourites }"
                    type="button" :aria-expanded="isExpandedFavourites" aria-controls="favourites"
                    @click="isExpandedFavourites = !isExpandedFavourites">
                    <span>
                        Favourites
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 9l6 6l6 -6" />
                    </svg>
                </button>
                <ul v-show="isExpandedFavourites" id="favourites">
                    <li v-for="fav in favouritesStore.favouritesSorted">
                        <button @click="() => favouritesStore.remove(fav)"
                            :aria-label="`remove-favourite-${fav.name[0]}`"><svg xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M18 6l-12 12" />
                                <path d="M6 6l12 12" />
                            </svg></button>
                        <button @click="() => favouritesStore.select(fav)"
                            :aria-labelledby="`select-favourite-${fav.name[0]}`">{{
                        fav.name[0] }}</button>
                    </li>
                    <span class="no-data" v-if="favouritesStore.favouritesSorted.length <= 0">No favourite</span>
                </ul>
            </div>
        </aside>
    </header>
    <main>
        <slot />
    </main>
    <footer>
        <div>
            <p>A small Vue/Nuxt/TS website that uses the Météo France and open-meteo APIs. Made as a personal
                project
                for
                practicing web libraries.</p>
        </div>
    </footer>
</template>

<style scoped>
header {
    display: flex;
    align-items: center;
    justify-content: end;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-size);
    padding: 0 var(--padding-a);
    z-index: 1;
}



main,
footer {
    width: var(--main-column-width);
    max-width: 100%;
    padding: var(--padding-a);
    padding-left: calc(var(--sidebar-width) + var(--padding-a));
    margin: auto;
}

main {
    margin-bottom: calc(var(--padding-a) * 2);
}

footer {
    font-size: var(--font-size-s);
}

nav {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: var(--padding-b);
}

nav::after {
    content: "";
    width: 100%;
    height: 0px;
    position: absolute;
    border-bottom: 1px solid var(--color-line);
    bottom: calc(-0.5 * var(--padding-a));
}

aside {
    width: var(--sidebar-width);
    height: 100%;
    border-right: 1px solid var(--color-line);
    position: fixed;
    top: 0;
    left: clamp(0rem, calc(50% - var(--main-column-width) * 0.5), 100%);
    bottom: 0;
    padding: var(--padding-a);
    display: flex;
    flex-direction: column;
    background-color: var(--color-background);
    gap: var(--padding-a);
}

main,
aside {
    padding-top: calc(var(--padding-a) + var(--header-size));

}

button {
    text-align: start;
    display: flex;
    align-items: center;
    width: 100%;
}

button>svg {
    display: flex;
    height: fit-content;
    width: fit-content;
}

.button-with-icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.2em;
}

#toggle-favourites svg {
    transition: transform var(--transition-b);
}

#toggle-favourites.expanded svg {
    transform: rotate(-180deg);
}

footer>div {
    border-top: 1px solid var(--color-line);
}

ul {
    padding: 0;
    margin: var(--padding-c) 0 0 0;
    display: flex;
    flex-direction: column;
    gap: var(--padding-b)
}

li {
    display: flex;
    color: var(--color-accent);
    gap: var(--padding-b);
    /* background-color: ; */
}

li button {
    display: flex;
    color: var(--color-accent);
    background-color: var(--color-accent-dark);
    border-radius: var(--border-radius);
    text-overflow: ellipsis;
    overflow: hidden;
}

li button:nth-child(1) {
    width: fit-content;
    text-transform: uppercase;
    background-color: var(--color-background);
}

.no-data {
    font-size: var(--font-size-s);
    color: var(--color-text-b);
}

#logo {
    stroke: var(--color-text-b);
}

a:hover #logo {
    stroke: var(--color-accent);
}

label#toggle-sidebar-label {
    display: flex;
    visibility: hidden;
    cursor: pointer;
    z-index: 2;
    user-select: none;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid currentColor;
    border-radius: var(--border-radius);
    background-color: var(--color-background);
}

label#toggle-sidebar-label>svg {
    width: var(--icon-size);
    height: var(--icon-size);
}

input#toggle-sidebar {
    display: none;
}


input[type='checkbox']:checked~aside {
    transform: translateX(0);
}

input[type='checkbox']+label svg:nth-child(1) {
    display: flex;
}

input[type='checkbox']:checked+label svg:nth-child(1) {
    display: none;
}

input[type='checkbox']+label svg:nth-child(2) {
    display: none;
}

input[type='checkbox']:checked+label svg:nth-child(2) {
    display: flex;
}


@media screen and (max-width: 45rem) {
    aside {
        transform: translateX(calc(-100%));
        width: 100%;
    }

    main,
    footer {
        padding-left: var(--padding-a);
    }

    label#toggle-sidebar-label {
        visibility: visible;
    }
}
</style>