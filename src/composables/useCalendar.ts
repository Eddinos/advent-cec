import { ref } from "vue";

const days = ref<boolean[]>([])

export default function useCalendar () {
    function fetchOpenedDays () {
        const localStorageValue = localStorage.getItem('openedDays')
        if (!localStorageValue) return days.value
        days.value = JSON.parse(localStorageValue)
        return days.value
    }

    function setOpenedDays (openedDays: boolean[]) {
        days.value = openedDays
        localStorage.setItem('openedDays', JSON.stringify(openedDays))
    }

    function openDay (dayIndex: number) {
        days.value[dayIndex - 1] = true
        setOpenedDays(days.value)
    }

    return {
        fetchOpenedDays,
        setOpenedDays,
        days,
        openDay
    }
}