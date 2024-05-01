<!-- if interactive scale wanted, rewrite the scaleMax and valueScale functions -->
<script setup lang="ts">

const { formatedData: data, dataView } = storeToRefs(useWeatherStore());

const gWidth = 300
const gHeight = 100
const scaleMod = 5;

// closest multiple of scaleMod to the maximum value from the dataset
const scaleMax = computed(() => {
    return data.value ? Math.ceil(Math.max(...data.value.values) / scaleMod) * scaleMod || 1 : 1;
})

// milestone values to display on the scale
const valuesScale = computed((): Array<string> => {
    if (data.value === null || data.value.values.length === 0)
        return [];
    const arr: Array<string> = [];
    for (let i = 0; i < scaleMod; i++) {
        arr.push(((i / scaleMod * scaleMax.value) + "").slice(0, 3))
    }
    return arr;
})

const arraySkip4 = arrSkip(4);
const hoursDisplayed = computed(() => arraySkip4(data.value?.time ?? []));

</script>

<template>
    <section :class="{ 'loading': dataView.pending }">

        <div class="info">
            <data>
                <span>{{ data?.name[0] ? data.name[0] : "" }}</span>
                <span>{{ data?.name[1] ? `, ${data.name[1]}` : "" }}</span>
            </data>
            <data>{{ data && `${data.unit} / hour (${data ? data.timezone : "GMT"})` }}</data>
            <data>{{ data ? data.date : "" }}</data>
        </div>

        <div class="graph-wrapper">
            <div class="scale-y">
                <data v-if="data" v-for="mm in valuesScale" class="scale-y-values"> {{ `${mm} mm` }} </data>
                <svg v-if="data" class="ticks-y" :viewBox="`0 0 8 ${gHeight}`" preserveAspectRatio="xMaxYMid meet">
                    <rect v-for="(_, i) in new Array(scaleMax)" width="8" :height="0.5" x="0"
                        :y="i * gHeight / scaleMax" />
                </svg>
            </div>

            <div v-if="dataView.idle" class="plot">
                <svg :viewBox="`0 0 ${gWidth} ${gHeight}`">
                </svg>
            </div>

            <div v-else-if="dataView.pending" class="plot">
                <svg :viewBox="`0 0 ${gWidth} ${gHeight}`">
                </svg>
            </div>

            <div v-else-if="dataView.error" class="plot">
                <svg :viewBox="`0 0 ${gWidth} ${gHeight}`">
                </svg>
            </div>

            <GraphPlot v-else-if="data" class="plot" :data :gWidth :gHeight :scaleMax></GraphPlot>

            <div class="scale-x">
                <data v-if="data" v-for="hour in hoursDisplayed" class="scale-x-value"> {{ hour }} </data>
            </div>

        </div>
        <!-- <Spinner v-if="dataView.pending" class="spinner">
            <Logo></Logo>
        </Spinner> -->
    </section>
</template>

<style scoped>
section {
    background-color: var(--color-surface);
    border-radius: var(--border-radius);
    padding: var(--padding-c);
    display: flex;
    flex-direction: column;
    gap: var(--padding-c);
    position: relative;
    overflow: hidden;
}

.plot {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}


data {
    font-size: var(--font-size-s);
}

.ticks-y {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    stroke: var(--color-line);
}

.info {
    display: grid;
    grid-template-columns: auto auto;
    gap: var(--padding-b);
}

.info data {
    min-height: 1rem;
}

.info>data:nth-child(2) {
    text-align: end;
}

.graph-wrapper {
    display: grid;
    grid-template-columns: auto 1fr;

}

@keyframes loading {
    100% {
        transform: translateX(100%);
    }
}

section.loading::after {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: -webkit-gradient(linear, left top,
            right top, from(transparent),
            color-stop(rgba(255, 255, 255, 0.2)),
            to(transparent));

    background: linear-gradient(90deg, transparent,
            rgba(100, 100, 100, 0.2), transparent);

    animation: loading 0.8s infinite;
}

svg {
    width: 100%;
}

.scale-x {
    display: flex;
    grid-column: 2;
    height: 2em;
    align-items: end;
    user-select: none;
}

.scale-y {
    display: flex;
    flex-direction: column-reverse;
    width: 4em;
    position: relative;
    user-select: none;
}

data.scale-x-value,
data.scale-y-values {
    color: var(--color-text-b);
    width: 100%;
    height: 100%;
    text-overflow: clip;
    font-size: clamp(0rem, 1.5vw, var(--font-size-s));
}

data.scale-x-value {
    border-left: 1px solid var(--color-line);
    padding-left: 0.5ch;
    display: flex;
    align-items: end;
}

data.scale-y-values {
    display: flex;
    align-items: end;
    border-bottom: 1px solid var(--color-line);
    padding-bottom: 0.5ch;
}

.spinner {
    position: absolute;
    left: calc(50% - 1.375rem);
    top: calc(50% - 1.375rem);
    width: var(--spinner-size);
    height: var(--spinner-size);
    color: var(--color-accent);
}
</style>