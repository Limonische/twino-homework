<template lang="pug">
    .question
        h3.question__heading {{ question.question }}
            label(
                v-for="(answer, index) in question.answers"
                :key="answer + '-' + index"
            )
                | {{ answer }}
                input(
                    :value="answer"
                    v-model="selectedAnswer"
                    type="radio"
                )
</template>

<script>
export default {
    props: {
        question: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            selectedAnswer: this.question.selectedAnswer || null
        }
    },

    watch: {
        selectedAnswer(newSelectedAnswer) {
            this.$emit('changeSelectedAnswer', { questionId: this.question.id, newSelectedAnswer })
        }
    }
}
</script>
