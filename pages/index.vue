<template lang="pug">
    .index-page
        Question(
            v-if="currentQuestion"
            :question="currentQuestion"
            :key="currentQuestion.id"
            @changeSelectedAnswer="changeSelectedAnswer"
        )
        Summary(v-if="!currentQuestion")
        Error(v-if="error")
        button(
            v-if="currentQuestionIndex !== 0"
            @click="previousQuestion"
        ) Previous question
        button(
            v-if="currentQuestion"
            @click="nextQuestion"
        ) Next question
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
        ...mapGetters('quiz', ['questionCount', 'currentQuestionIndex', 'currentQuestion', 'error'])
    },

    methods: {
        ...mapActions('quiz', ['setQuizData', 'setCurrentQuestionIndex', 'setError', 'changeSelectedAnswer']),

        previousQuestion() {
            if (this.currentQuestionIndex === 0) return

            if (!this.currentQuestionIndex) {
                this.setCurrentQuestionIndex(this.questionCount - 1)

                return
            }

            this.setError(false)
            this.setCurrentQuestionIndex(this.currentQuestionIndex - 1)
        },

        nextQuestion() {
            if (this.currentQuestionIndex === this.questionCount - 1) {
                this.setCurrentQuestionIndex(null)

                return
            }

            if (!this.currentQuestion.selectedAnswer) {
                this.setError(true)

                return
            }

            this.setError(false)
            this.setCurrentQuestionIndex(this.currentQuestionIndex + 1)
        }
    }
}
</script>
