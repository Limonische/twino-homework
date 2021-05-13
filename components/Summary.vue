<template lang="pug">
    section.summary
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
