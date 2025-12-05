<script lang="ts" setup>
import { onMounted, ref, useTemplateRef, defineEmits } from 'vue'
const { number, defaultSide } = defineProps<{
    number: string,
    defaultSide?: 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom' | 'dance'
}>()
const emit = defineEmits(['flipped'])
const currentSide = ref(defaultSide)
const startTouchPoint = ref({ x: 0, y:0 })
const endTouchPoint = ref({ x: 0, y:0 })
const hintFinished = ref(false)
// const coords = ref({x: 0, y:0})
const debug = ref(defaultSide)
const flipSide = () => {
    // currentSide.value = currentSide.value === 'front' ? 'back' : 'front'
    currentSide.value = 'dance'
}
const boxRef = useTemplateRef('box')
onMounted(() => {
    boxRef.value!.addEventListener('touchmove', onMouseMove)

    boxRef.value!.addEventListener('animationend', ({ animationName }) => {
        console.log({animationName})
        if (animationName === 'dance') {
            currentSide.value = 'back'
            emit('flipped')
        } else if (animationName === 'hint') {
            boxRef.value!.classList.remove('hint')
            hintFinished.value = true
        }
        boxRef.value!.style.transform = ``
    })

    if (defaultSide === 'front') {
        boxRef.value!.classList.add('hint')
    } 
})
function onMouseMove(event: TouchEvent) {
    // alert('touchmove')
    if (currentSide.value === 'dance') return
    const rotateFactor = currentSide.value === 'back' ? 8 : 36
    const rotateYOffset = currentSide.value === 'back' ? -180 : 0
    const box = boxRef.value!
    const rect = box.getBoundingClientRect()
    // const x = event.touches[0].clientX
    // const y = event.touches[0].clientY
    const x = event.touches[0].clientX - rect.left
    const y = event.touches[0].clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -rotateFactor
    const rotateY = (((x - centerX) / centerX) * rotateFactor) + rotateYOffset
    // debug.value = `RX: ${rotateX}, RY: ${rotateY}`
    box.style.transform = `translateZ(-50px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    // console.log({rotateX, rotateY})
    // if (rotateY < -25 && currentSide.value === 'front') {
    //     flipSide()
    // }
}
function onTouchEnd (event: TouchEvent) {
    boxRef.value!.style.transform = ``
    if (!hintFinished.value) return
    endTouchPoint.value = {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY
    }
    const deltaX = endTouchPoint.value.x - startTouchPoint.value.x
    // debug.value = debug.value + ` | deltaX: ${deltaX}`
    const flipCondition = deltaX < -200 && currentSide.value !== 'dance' && currentSide.value !== 'back' 
    // alert(flipCondition)
    if (flipCondition) {
        flipSide()
    }
}

function onTouchStart (e: TouchEvent) {
    console.log('touchstart')
    startTouchPoint.value = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    }
}
</script>

<template>
    
    <div class="scene" @click="flipSide">
        <!-- X: {{ coords.x }}, Y: {{ coords.y }} -->
        <!-- {{ debug }} -->
        <div class="box" :class="'show-' + currentSide" 
             ref="box" 
             @touchend="onTouchEnd" 
             @touchstart="onTouchStart">
            <div class="box__face box__face--front">
                <div class="box__faceCenter">
                    {{ number }}
                </div>
            </div>
            <div class="box__face box__face--back">
                <div class="box__faceCenter">
                    <slot name="back"></slot>
                </div>
            </div>
            <div class="box__face box__face--right">
                <div class="box__faceCenter">
                    
                </div>
            </div>
            <div class="box__face box__face--left">
                <div class="box__faceCenter">
                    
                </div>
            </div>
            <div class="box__face box__face--top">
                <div class="box__faceCenter">
                    
                </div>
            </div>
            <div class="box__face box__face--bottom">
                <div class="box__faceCenter">
                    
                </div>
            </div>
        </div>
    </div>
    
</template>

<style>
:root {
    --box-width: 300px;
    --box-height: 60vh;
}

.scene {
    width: var(--box-width);
    height: var(--box-height);
    margin: 20px;
    perspective: 400px;
}

.box {
    width: var(--box-width);
    height: var(--box-height);
    position: relative;
    transform-style: preserve-3d;
    transform: translateZ(-50px);
    transition: transform 1s, box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.box:not(.show-dance) {
    cursor: pointer;
    box-shadow: #1D1D1D 0px 0px 50px 20px;
}

.box.show-front  { transform: translateZ( -50px) rotateY(   0deg); }
.box.show-back   { 
    transform: translateZ( -50px) rotateY(-180deg);
    box-shadow: gold 0px 0px 50px 20px;
}
.box.show-right  { transform: translateZ(-150px) rotateY( -90deg); }
.box.show-left   { transform: translateZ(-150px) rotateY(  90deg); }
.box.show-top    { transform: translateZ(-100px) rotateX( -90deg); }
.box.show-bottom { transform: translateZ(-100px) rotateX(  90deg); }
/* .box.show-zoom {
    animation: zoom 2s ease-in-out forwards;
} */
.box.show-dance {
  animation: 2s cubic-bezier(.98,.02,.69,.02) 0s forwards dance;
  /*transform: translateZ(00px) rotateY(360deg) rotateZ(360deg); */
}

.box.hint {
    animation: 1s ease-in-out 0.5s 2 forwards hint;
}


.box__face {
    position: absolute;
    font-size: 40px;
    font-weight: bold;
    color: white;
    text-align: center;
    background: #FFD61F;
    background: linear-gradient(145deg, rgba(255, 214, 31, 1) 0%, rgba(255, 246, 194, 1) 100%);
}

.box__face--front,
.box__face--back {
    width: var(--box-width);
    height: var(--box-height);
    line-height: var(--box-height);
}

.box__face--front {
    font-size: 150px;
}

.box__face--right,
.box__face--left {
    width: 100px;
    height: var(--box-height);
    left: 100px;
    line-height: var(--box-height);
}

.box__face--top,
.box__face--bottom {
    width: var(--box-width);
    height: 100px;
    top: 50px;
    line-height: 100px;
}

/* .box__face--front .box__faceCenter { 
transform: scale(.95);
background-color: firebrick;
} */
.box__face .box__faceCenter {
    transform: scale(.95);
    background: linear-gradient(145deg, rgb(187, 0, 0) 0%, rgb(92, 0, 0) 100%);
    height: 100%;
}

.box__face:not(.box__face--front):not(.box__face--back) .box__faceCenter {
    background-color: rgb(0, 75, 0);
}

.box__faceCenter img {
    width: 95%;
    max-height: 95%;
    object-fit: cover;
    display: inline-block;
    vertical-align: middle;
}
/* .box__face--right  { background: hsla( 60, 100%, 50%, 0.7); }
.box__face--back   { background: hsla(120, 100%, 50%, 0.7); }
.box__face--left   { background: hsla(180, 100%, 50%, 0.7); }
.box__face--top    { background: hsla(240, 100%, 50%, 0.7); }
.box__face--bottom { background: hsla(300, 100%, 50%, 0.7); } */

.box__face--front  { transform: rotateY(  0deg) translateZ( 50px); }
.box__face--back   { transform: rotateY(180deg) translateZ( 50px); }

.box__face--right  { transform: rotateY( 90deg) translateZ(150px); }
.box__face--left   { transform: rotateY(-90deg) translateZ(150px); }

.box__face--top    { transform: rotateX( 90deg) translateZ(100px); }
.box__face--bottom { transform: rotateX(-90deg) translateZ(200px); }

@keyframes hint {
  0% {
    transform: rotateY(0) translateZ(-50px);
  }
  50% {
    transform: rotateY(-25deg) translateZ(-50px);
  }
  100% {
    transform: rotateY(0) translateZ(-50px);
  }
}

@keyframes dance {
  /* 0% {
    transform: rotateY(0deg) translateZ(-50px);

  } */
  /* 50% {
    transform: rotateY(90deg) translateZ(00px);
  } */
  100% {
    transform: rotateY(-180deg) translateZ(50px);
  }
}

label { margin-right: 10px; }
</style>