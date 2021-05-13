<template lang="pug">
    section.progress
        div(
            v-for="group in groups"
            :key="group.id"
        ) {{ getGroupProgress(group.id) }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters('quiz', ['groups', 'getGroupProgress'])
    }
}
</script>
