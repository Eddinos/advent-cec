<script setup lang="ts">
import { onMounted, computed } from 'vue'
import useCalendar from '../composables/useCalendar'
const { days } = defineProps<{
    days: string[]
}>()
const { fetchOpenedDays, days: storedDays } = useCalendar()

onMounted(() => {
    fetchOpenedDays()
})

function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const today = new Date().getDate();

const calendarSlots = computed(() => {
    // Shuffle all days
    const shuffled = shuffle([...days])
    return shuffled.map((d) => ({
        done: !!storedDays.value[d-1],
        label: d,
        visible: Number(d) <= today
    }))
})
</script>

<template>
    <div class="Calendar">
      <h1 class="Calendar__title">Calendrier de l'avent de Thessa</h1>
      <div class="Calendar__list">
        <component 
            :is="day.visible ? 'router-link' : 'span'"
            :to="`/${day.label}`"
            :class="[
                { 'isDone': day.done },
                'Calendar__item'
            ]" 
            v-for="(day, i) in calendarSlots" 
            :key="i"
        >
            {{ day.label }}
        </component>
      </div>
    </div>
</template>
  
<style>
.Calendar__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
    gap: 10px;
    width: 100%;
    background-image: url('/calendar/calendar-bg.jpeg');
    background-size: cover;
    min-height: 60vh;
}

.Calendar__item {
    aspect-ratio: 1;
    /* background-color: #eee; */
    color: #fff9d6;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    border: 2px dashed #fff9d6;
}

.isDone {
    box-shadow: gold 0 0 12px;
    background-color: rgb(178, 34, 34, .4);
}

.isInvisible {
    visibility: hidden;
}

.Calendar__title {
    font-family: 'Christmas';
    color: gold;
    text-align: center;
    font-size: 36px;
}

.Calendar {
    /* background-color: aqua; */
}
</style>
  