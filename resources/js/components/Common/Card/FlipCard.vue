<template>
    <div v-bind:class="flipped ? 'flip-container flipped': 'flip-container'">
            <div class="front">
                <slot name="front"></slot>
            </div>
            <div class="back">
                <slot name="back"></slot>
            </div>
    </div>
</template>

<script>
    export default {
        name: 'FlipCard',
        props: {
            flipped: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    };
</script>

<style type='text/css' scoped>
    .flip-container {
        perspective: 800px;
        -moz-perspective: 800px;
        -webkit-perspective: 800px;
        transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
        -webkit-transform-style: preserve-3d;
        transition: 0.5s;
        -moz-transition: 0.5s;
        -webkit-transition: 0.5s;
    }
    .flip-container.flipped {
        transform: rotatey(-180deg);
        -moz-transform: rotatey(-180deg);
        -webkit-transform: rotatey(-180deg);
    }
    .flip-container .face {
        padding: 1em;
        backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }
    .front,
    .back {
        top: 0;
        left: 0;
        width: 100%;
    }
    .back {
        transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
        -webkit-transform: rotateY(180deg);
        display:none;
    }
    .flip-container.flipped .back {
        display:block;
    }
    .flip-container.flipped .front {
        display:none;
    }
    .front {
        display: block;
    }
</style>
