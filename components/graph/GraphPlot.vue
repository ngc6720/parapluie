<script setup lang="ts">

interface Props {
    data: WeatherData
    gWidth: number
    gHeight: number
    scaleMax: number
}
const props = defineProps<Props>();
const plotElement = ref(null)
const { xNorm } = useMouse(plotElement)

const hoveredData = computed(() => {
    let i = clip(Math.floor(xNorm.value * props.data.time.length), 0, props.data.time.length - 1);
    return {
        x: denormalise(normalise(i, props.data.time.length), 100),
        y: denormalise(invert(normalise(props.data.values[i], props.scaleMax)), 100),
        v: props.data.values[i]
    };
})

const polylinePoints = computed((): string => {
    const values = props.data.values;
    const arr: any = [];
    for (let i = 0; i < values.length; i++) {
        arr.push(denormalise(normalise(i, values.length), props.gWidth));
        arr.push(denormalise(invert(normalise(values[i], props.scaleMax)), props.gHeight))
    }
    return arr.toString();
})

const normalise = (v: number, max: number) => scale(v, 0, max, 0, 1);
const denormalise = (v: number, max: number) => scale(v, 0, 1, 0, max);

function scaleXToViewbox(v: number): number {
    return denormalise(normalise(v, props.data.values.length), props.gWidth);
}

</script>

<template>
    <div ref="plotElement">
        <svg class="line" :viewBox="`0 0 ${gWidth} ${gHeight}`" preserveAspectRatio="xMidYMid meet">
            <polyline :points="polylinePoints" />
        </svg>

        <svg class="ticks" :viewBox="`0 0 ${gWidth} ${gHeight}`" preserveAspectRatio="xMidYMid meet">
            <rect v-for="(_, i) in data.time" width="1" :height="gHeight" :x="scaleXToViewbox(i)" />
        </svg>
        <div class="hovered-data" :style="{ left: `${hoveredData.x}%`, top: `${hoveredData.y}%` }">
            <data value="">{{ `${hoveredData.v}`.slice(0, 5) }}</data>
        </div>
    </div>
</template>

<style scoped>
svg.line {
    stroke: var(--color-accent);
    fill: none;
    position: absolute;
    z-index: 0;
    pointer-events: none;
    width: 100%;
    height: 100%;
}

svg.ticks {
    stroke: none;
    fill: var(--color-line);
    border-right: 1px dashed var(--color-line);
}

rect {
    pointer-events: none;
}

.hovered-data {
    position: absolute;
    border-radius: 50%;
    background-color: var(--color-accent);
    width: 8px;
    height: 8px;
    transform: translate(-4px, -4px);
    display: none;
    pointer-events: none;
    user-select: none;
}

.hovered-data>data {
    position: absolute;
    transform: translate(-50%, -150%);
    width: 5em;
    width: fit-content;
    color: var(--color-accent);
    text-align: center;
    padding: var(--padding-b);
    background: var(--color-surface);
    border: 1px solid var(--color-accent);
    display: flex;
}

.plot:hover>.hovered-data {
    display: block;
}
</style>