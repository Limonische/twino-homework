<template lang="pug">
    .index-page
        .index-page__container
            h1.index-page__heading Suitability test
            Progress
            Question(
                v-if="currentQuestion"
                :question="currentQuestion"
                :key="currentQuestion.id"
                @changeSelectedAnswer="onChangeSelectedAnswer"
            )
            Summary(v-if="!currentQuestion")
            Error(v-if="error")
            BaseButton(
                v-if="currentQuestion"
                @click="nextQuestion"
            ) {{ currentQuestionIndex === questionCount - 1 ? 'Show summary' : 'Next question' }}
            BaseLink(
                v-if="currentQuestionIndex !== 0"
                @click="previousQuestion"
            ) Previous question
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
        },

        onChangeSelectedAnswer(e) {
            this.setError(false)
            this.changeSelectedAnswer(e)
        }
    }
}
</script>

<style lang="sass" scoped>
.index-page
    padding: 0 2rem
    &__container
        max-width: 700px
        margin: 0 auto
</style>
