<script setup lang="ts">
    import {ref} from 'vue'
    defineProps<{
        number: string,
        imageUrl: string
    }>()

    const isFlipped = ref(false)
    const toggle = () => {
        isFlipped.value = !isFlipped.value
    }
</script>

<template>
    <div class="DayCard">
        <a class="DayCard__Button" :onclick="toggle">
            <Transition name="flip">
                <div class="DayCard__Title" v-if="!isFlipped">
                    <span class="">{{ number }}</span>
                </div>
                <img class="DayCard__Image" v-else :src="imageUrl" alt="">
            </Transition>
        </a>
    </div>
</template>

<style lang="scss">
    .DayCard {
        width: 80vw;
        aspect-ratio: 1;
        
        color: #1D1D1B;
        text-align: center;
        
        &__Title {
            color: #1D1D1B;
            border-radius: 12px;
            font-size: 86px;
            background-color: #fff9d6;
            border: 6px solid gold;
        }

        &__Button, &__Title {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__Button {
            position: relative;
        }

        &__Title, &__Image {
            position: absolute;
            backface-visibility: hidden;
            border-radius: 12px;
            font-size: 86px;
            background-color: #fff9d6;
            border: 6px solid gold;
            box-shadow: rgb(41, 3, 41) 0 0 20px;
        }

        &__Image {
            width: 100%;
            height: auto;
        }
    }

    .flip-enter-active,
    .flip-leave-active {
        transition: all 0.5s ease-out;
    }

    .flip-enter-from {
        opacity: 0;
        transform: rotateY(180deg);
    }

    .flip-leave-to {
        opacity: 0;
        transform: rotateY(-180deg);
    }
</style>