<template lang="pug">
    section.group
        h3.group__heading {{ group.title }}
        .group__question(
            v-for="question in groupQuestions"
            :key="question.id"
        )
            h4 {{ question.question }}
            a(
                href="#"
                @click.prevent="onQuestionClick(question)"
            ) {{ question.selectedAnswer }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        group: {
            type: Object,
            required: true
        }
    },

    computed: {
        ...mapGetters('quiz', ['questions', 'getGroupQuestions']),

        groupQuestions() {
            return this.getGroupQuestions(this.group.id)
        }
    },

    methods: {
        ...mapActions('quiz', ['setCurrentQuestionIndex']),

        onQuestionClick(question) {
            const questionIndex = this.questions.indexOf(question)

            this.setCurrentQuestionIndex(questionIndex)
        }
    }
}
</script>
