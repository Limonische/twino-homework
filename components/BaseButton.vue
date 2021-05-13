<template lang="pug">
    button.button(@click="$emit('click')")
        slot
</template>

<style lang="sass" scoped>
@use 'mixins' as *

.button
    +transition(background-color)
    appearance: none
    border: none
    border-radius: 5px
    background-color: var(--color-blue-2000)
    color: var(--color-white-1000)
    font-size: 1.2rem
    padding: 1em
    margin: .75em 0
    display: block
    width: 100%
    font-weight: bold
    cursor: pointer
    &:hover
        background-color: var(--color-blue-1000)
</style>
