<template lang="pug">
    section.group
        header.group__header
            h3.group__heading {{ group.title }}
            a.group__trigger(
                href="#"
                :class="{ 'group__trigger--active': showQuestions }"
                @click.prevent="showQuestions = !showQuestions"
            ) {{ showQuestions ? 'Show less' : 'Show more' }}
        TransitionExpand
            .group__questions(v-if="showQuestions")
                section.group__question(
                    v-for="question in groupQuestions"
                    :key="question.id"
                )
                    h4.group__question-heading {{ question.question }}
                    a.group__question-link(
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

    data() {
        return {
            showQuestions: false
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

<style lang="sass" scoped>
@use 'mixins' as *

.group
    margin: 4rem 0
    &__trigger
        flex-shrink: 0
        margin-left: 2rem
        text-decoration: none
        color: var(--color-blue-2000)
        position: relative
        padding-left: 1.3em
        &::before, &::after
            content: ''
            display: block
            height: 2px
            width: 1em
            background-color: var(--color-blue-2000)
            position: absolute
            left: 0
            top: calc(50% - .075em)
        &::after
            +transition(transform, .5s)
            transform: rotate(90deg)
        &--active
            &::after
                transform: rotate(0deg)
    &__header
        display: flex
        justify-content: space-between
        align-items: flex-start
        padding-bottom: 1rem
    &__heading
        margin: 0 0 1.5em
    &__questions
        & > * + *
            margin-top: 2.5rem
    &__question-heading
        font-weight: normal
        margin: 0 0 1.5em
    &__question-link
        +transition(filter)
        color: var(--color-gray-1000)
        text-decoration: none
        font-weight: 300
        &:hover
            filter: brightness(.8)
</style>
