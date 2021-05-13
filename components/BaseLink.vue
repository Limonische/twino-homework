<template lang="pug">
    a.link(
        href="#"
        @click.prevent="$emit('click')"
    )
        slot
</template>

<style lang="sass" scoped>
@use 'mixins' as *

.link
    +transition(color)
    display: block
    color: var(--color-blue-2000)
    display: block
    width: 100%
    text-align: center
    font-size: 1.2em
    margin: .75em 0
    &:hover
        color: var(--color-blue-1000)
</style>
