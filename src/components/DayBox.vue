<script lang="ts" setup>
import { onMounted, ref, useTemplateRef } from 'vue'
const { number, isOpened } = defineProps<{
    number: string,
    isOpened?: boolean
}>()
const currentSide = ref(isOpened ? 'front' : 'back')
const flipSide = () => {
    // currentSide.value = currentSide.value === 'front' ? 'back' : 'front'
    currentSide.value = 'dance'
}
const boxRef = useTemplateRef('box')
onMounted(() => {
    console.log(boxRef.value)
    boxRef.value!.addEventListener('dragstart', console.log)
    boxRef.value!.addEventListener('animationend', () => {
        console.log('animation ended')
        currentSide.value = 'back'
    })
})
</script>

<template>
    
    <div class="scene" @click="flipSide">
        <div class="box" :class="'show-' + currentSide" ref="box">
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
    background-color: firebrick;
    height: 100%;
}

.box__faceCenter img {
    width: 95%;
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

@keyframes zoom {
  0% {
    transform: translateX(00px) scale(1);
  }
  50% {
    transform: translateX(100px) scale(1.45);
  }
  90% {
    transform: translateX(100px) scale(1.495);
  }
  98% {
    transform: translateX(100px) scale(1.5);
  }
  100% {
    transform: translateX(100px) scale(1);
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