<template lang="pug">
    section.summary
        h2.summary__heading Answers overview
        h4.summary__subheading here you can see and change your answers
        Group(
            v-for="group in groups"
            :key="group.id"
            :group="group"
        )
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters('quiz', ['groups'])
    }
}
</script>

<style lang="sass" scoped>
.summary
    &__subheading
        font-weight: normal
        font-size: .75rem
</style>
