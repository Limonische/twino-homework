<template lang="pug">
    .question
        h3.question__heading {{ question.question }}
        .question__answers
            label.question__answer(
                v-for="(answer, index) in question.answers"
                :key="answer + '-' + index"
            )
                input.question__input(
                    :value="answer"
                    v-model="selectedAnswer"
                    type="radio"
                )
                span.question__label
                    span.question__bullet
                    span.question__text {{ answer }}
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

<style lang="sass" scoped>
@use 'mixins' as *

.question
    margin: 3rem 0
    &__heading
        font-size: 1.5rem
    &__answers
        & > * + *
            margin-top: .75em
    &__answer
        cursor: pointer
        display: flex
        height: 1.15em
    &__label
        display: flex
    &__bullet
        +transition(border)
        height: 1em
        width: 1em
        border-radius: 50%
        border: 1px solid var(--color-gray-1000)
        margin-right: .5em
    &__input
        width: 0
        height: 0
        opacity: 0
        &:checked
            & + .question__label
                .question__bullet
                    border: 4px solid var(--color-blue-2000)
</style>
