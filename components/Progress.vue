<template lang="pug">
    section.progress
        .progress__bars
            .progress__bar(
                v-for="group in groups"
                :key="group.id"
                :class="{ 'progress__bar--active': currentGroup && group.id === currentGroup.id }"
            )
                .progress__fill(
                    :style="{ width: `${getGroupProgress(group.id)}%` }"
                )
        .progress__info(v-if="currentGroup")
            h2.progress__heading(v-if="currentGroup.title") {{ currentGroup.title }}
            span.progress__percentage {{ getGroupProgress(currentGroup.id) }}% completed
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters('quiz', ['groups', 'currentGroup', 'getGroupProgress'])
    }
}
</script>

<style lang="sass" scoped>
@use 'mixins' as *

.progress
    &__bars
        display: flex
        & > * + *
            margin-left: 8px
    &__bar
        +transition(background-color)
        height: 4px
        background-color: var(--color-gray-2000)
        position: relative
        flex: 1
        &--active
            background-color: var(--color-green-2000)
    &__fill
        +transition(width)
        position: absolute
        top: 0
        height: 100%
        background-color: var(--color-green-1000)
    &__info
        display: flex
        align-items: center
        justify-content: space-between
        margin: .8rem 0
        & > * + *
            margin-left: 2rem
    &__heading
        font-size: 1.17rem
    &__percentage
        color: var(--color-gray-1000)
</style>
