<template lang="pug">
    .index-page
        Question(
            v-if="currentQuestion"
            :question="currentQuestion"
        )
        button(@click="nextQuestion") Next question
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    async fetch() {
        try {
            const { groups = [] } = await this.$axios.$get(this.$config.apiPrefix + this.$config.suitabilityURL)

            this.setQuizData(groups)
        } catch {
            this.$nuxt.error({ message: '', statusCode: 404 })
        }
    },

    computed: {
        ...mapGetters('quiz', ['questionCount', 'currentQuestionIndex', 'currentQuestion'])
    },

    methods: {
        ...mapActions('quiz', ['setQuizData', 'setCurrentQuestionIndex']),

        nextQuestion() {
            if (this.currentQuestionIndex === this.questionCount - 1) {
                return
            }

            if (!this.currentQuestion.selectedAnswer) {
                return
            }

            this.setCurrentQuestionIndex(this.currentQuestionIndex + 1)
        }
    }
}
</script>
