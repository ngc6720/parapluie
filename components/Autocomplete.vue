<script setup lang="ts">

interface Props {
    results: Array<AutocompleteResult>
}
const props = defineProps<Props>();
const emit = defineEmits(['update', 'submit'])

enum Direction {
    'up' = -1,
    'down' = 1
}

const limit = makeLimit();


let input: Ref<any> = ref(null)
let resultsContainer: Ref<any> = ref(null)
let current = ref("")
let show = ref(true);  // true to avoid bug when input is focused by user before events are bound
let ariaActivedescendant = ref('');


const resultsLength = computed((): number => props.results.length)

let ariaExpanded = computed(() => {
    return show.value && resultsLength.value > 0;
});

watch(current, (nextInput) => {
    if (!nextInput)
        return;
    limit(() => {
        emit('update', nextInput.trim())
    }, 500)
})

watchEffect(() => selectReset())

function getSelectedId(): number {
    return props.results.findIndex(result => result.id === ariaActivedescendant.value);
}
function getResultFromId(id: string): AutocompleteResult {
    return props.results.find(result => result.id === id) || props.results[0];
}

function select(id: string) {
    ariaActivedescendant.value = id;
}
function selectReset() {
    resultsLength.value > 0 ? select(props.results[0].id) : select('');
}

function jump(direction: Direction) {
    if (resultsLength.value <= 0)
        return;
    let newSelectedId = wrapInt(getSelectedId() + direction, 0, resultsLength.value - 1);
    select(props.results[newSelectedId].id)
    clipSelectedElementInContainer();
}

function clipSelectedElementInContainer() {
    resultsContainer.value.querySelector(`#${ariaActivedescendant.value}`).scrollIntoView({ block: "nearest" });
}

function submitResult(id: string) {
    emit('submit', id)
    current.value = getResultFromId(id).name;
}

const on = Object.create(null);

on.focus = () => {
    selectReset();
    show.value = true;
    input.value.select();
}
on.down = () => jump(Direction.down)
on.up = () => jump(Direction.up)
on.mouseenter = (eve: any) => select(eve.target.id)
on.mousedown = (eve: any) => submitResult(eve.target.id)

on.enter = () => {
    if (resultsLength.value <= 0)
        return;
    submitResult(ariaActivedescendant.value)
    input.value?.blur();
}
on.escape = () => {
    current.value = "";
    input.value?.blur()
}
on.leftRight = () => selectReset();
on.blur = () => {
    show.value = false;
}

</script>

<template>
    <section role="search">
        <label>
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M17 10.5C17 14.0899 14.0899 17 10.5 17C6.91015 17 4 14.0899 4 10.5C4 6.91015 6.91015 4 10.5 4C14.0899 4 17 6.91015 17 10.5ZM15.7617 17.1761C14.3144 18.3183 12.4868 19 10.5 19C5.80558 19 2 15.1944 2 10.5C2 5.80558 5.80558 2 10.5 2C15.1944 2 19 5.80558 19 10.5C19 12.4869 18.3182 14.3146 17.1759 15.762L21.712 20.298C22.1025 20.6886 22.1025 21.3217 21.712 21.7122C21.3215 22.1028 20.6883 22.1028 20.2978 21.7122L15.7617 17.1761Z" />
            </svg>
            <input v-model="current" placeholder="Find a city..." ref="input" @focus="on.focus" @blur="on.blur"
                @keyup.enter="on.enter" @keydown.escape="on.escape" @keydown.down.prevent="on.down"
                @keydown.up.prevent="on.up" @keydown.left="on.leftRight" @keydown.right="on.leftRight" type="text"
                role="combobox" aria-autocomplete="list" :aria-expanded="ariaExpanded" aria-controls="listbox"
                :aria-activedescendant="ariaActivedescendant">
        </label>
        <ul v-if="ariaExpanded" ref="resultsContainer" id="listbox" role="listbox" aria-label="Cities">
            <li :id="result.id" role="option" v-for="result in results"
                :class="{ 'is-selected': result.id === ariaActivedescendant }" @mouseenter="on.mouseenter"
                @mousedown="on.mousedown">
                {{ result.name }}
            </li>
        </ul>
    </section>
</template>

<style scoped>
section {
    --padding: var(--padding-c);
    display: flex;
    flex-direction: column;
    position: relative;
}

input {
    font-size: var(--font-size-l);
    padding: var(--padding);
    width: 100%;
    padding-left: calc(2rem + var(--padding));
}

ul {
    --fullheight: calc(var(--font-size-l) + var(--padding) * 2);
    font-size: var(--font-size-l);
    padding: 0;
    margin: 0;
    border: 1px solid var(--color-text-b);
    border-radius: var(--border-radius);
    position: absolute;
    z-index: 1;
    top: 100%;
    width: 100%;
    background-color: var(--color-surface);
    max-height: calc((var(--font-size-l) + var(--padding) * 2) * 5 + 2px);
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: var(--color-scrollbar) var(--color-surface);
}


li {
    display: block;
    padding: var(--padding);
    height: var(--fullheight);
}

li:hover {
    cursor: pointer;
}

li.is-selected {
    background-color: var(--color-accent);
    color: var(--color-background);
    border-radius: var(--border-radius);
}

label {
    position: relative;
    cursor: pointer;
}

label svg {
    fill: var(--color-text-b);
    position: absolute;
    height: 100%;
    top: 0;
    left: var(--padding-c);
}
</style>