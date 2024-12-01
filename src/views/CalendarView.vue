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

    const calendarSlots = computed(() => {
        return days.map(d => ({
            done: !!storedDays.value[d-1],
            label: d
        }))
    })
</script>

<template>
    <div class="Calendar">
      <h1 class="Calendar__title">Calendrier de l'avent de Cec</h1>
      <div class="Calendar__list">
        <RouterLink 
            :to="`/${day.label}`" 
            :class="[{ 'isDone': day.done }, 'Calendar__item']" 
            v-for="(day, i) in calendarSlots" 
            :key="i">
            {{ day.label }}
        </RouterLink>
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
  