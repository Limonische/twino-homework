<template lang="pug">
    transition(
        name="expand"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
    )
        slot
</template>

<script>
/* eslint-disable */
export default {
    methods: {
        enter(element) {
            const width = getComputedStyle(element).width

            element.style.width = width
            element.style.position = 'absolute'
            element.style.visibility = 'hidden'
            element.style.height = 'auto'

            const height = getComputedStyle(element).height

            element.style.width = null
            element.style.position = null
            element.style.visibility = null
            element.style.height = 0

            getComputedStyle(element).height

            requestAnimationFrame(() => {
                element.style.height = height
            })
        },

        afterEnter(element) {
            element.style.height = 'auto'
        },

        leave(element) {
            const height = getComputedStyle(element).height

            element.style.height = height

            getComputedStyle(element).height

            requestAnimationFrame(() => {
                element.style.height = 0
            })
        }
    }
}
</script>

<style lang="sass" scoped>
*
    will-change: height
    transform: translateZ(0)
    backface-visibility: hidden
    perspective: 1000px
</style>
