<script setup lang="ts">
  import DayCard from '../components/DayCard.vue'
  import { useRouter } from 'vue-router'
  import {computed} from 'vue'
  import useCalendar from '../composables/useCalendar'
  import Box from '@/components/DayBox.vue'
  const router = useRouter()
  const { number } = defineProps<{
    number: string,
    debug?: boolean
  }>()
  const { days } = useCalendar()

  // Redirect to current day when arriving on splashscreen
  if (!number) router.push(`/${new Date().getDate()}`)
  const isDayInFive = computed(() => {
    return parseInt(number) % 5 === 0
  })
  const expectationTitle = computed(() => {
    if (number == 25) return `Joyeux Noël ! ☃🎅🎄❄️☃️🎁🦌`
    console.log({number})
    if (number == 1) return 'Clique pour ouvrir la case'
    return `Plus que ${ 25 - parseInt(number) } jours !`
  })
</script>

<template>
  <main class="HomeView">
    <h1>{{ expectationTitle }}</h1>
    <DayCard v-if="!debug" :number="number" :imageUrl="`/calendar/${parseInt(number)}.jpeg`" :opened="!!days[parseInt(number) - 1]" />
    <RouterLink class="CalendarButton" to="calendar">
      <img width="100%" src="@/assets/date-icon.svg" alt="">
    </RouterLink>
    <Box v-if="debug" :number="number" />
  </main>
</template>

<style>
  .CalendarButton {
    display: block;
    background: aliceblue;
    border-radius: 50%;
    height: 64px;
    padding: 10px;
    width: 64px;
    /* position: absolute; */
    bottom: 48px;
    /* left: 50%; */
    /* transform: translateX(-50%); */
    border: 2px solid gold;
  }

  .HomeView {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 4rem);
    position: fixed;
    /* transform-origin: 0px 0px; */
  }
</style>