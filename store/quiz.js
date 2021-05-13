import Vue from 'vue'

import { v4 as uuid } from 'uuid'

export const state = () => ({
    groups: [],
    questions: [],
    currentQuestionIndex: 0,
    error: false
})

export const mutations = {
    SET_QUIZ_DATA(state, groups) {
        state.groups = []

        groups.forEach(group => {
            const groupId = uuid()

            state.groups.push({
                id: groupId,
                title: group.title
            })

            state.questions = [
                ...state.questions,
                ...group.questions.map(question => ({
                    ...question,
                    id: uuid(),
                    groupId,
                    selectedAnswer: ''
                }))
            ]
        })
    },

    SET_CURRENT_QUESTION_INDEX(state, index) {
        state.currentQuestionIndex = index
    },

    SET_ERROR(state, error) {
        state.error = error
    },

    CHANGE_SELECTED_ANSWER(state, { questionId, newSelectedAnswer }) {
        const questionToChange = state.questions.find(({ id }) => id === questionId)

        if (!questionToChange) return

        const questionIndex = state.questions.indexOf(questionToChange)

        Vue.set(state.questions, questionIndex, {
            ...questionToChange,
            selectedAnswer: newSelectedAnswer
        })
    }
}

export const actions = {
    setQuizData({ commit }, groups) {
        commit('SET_QUIZ_DATA', groups)
    },

    setCurrentQuestionIndex({ commit }, index) {
        commit('SET_CURRENT_QUESTION_INDEX', index)
    },

    setError({ commit }, error) {
        commit('SET_ERROR', error)
    },

    changeSelectedAnswer({ commit }, { questionId, newSelectedAnswer = '' }) {
        commit('CHANGE_SELECTED_ANSWER', { questionId, newSelectedAnswer })
    }
}

export const getters = {
    groups: ({ groups }) => groups,
    questions: ({ questions }) => questions,
    questionCount: (_, { questions }) => questions.length,
    currentQuestionIndex: ({ currentQuestionIndex }) => currentQuestionIndex,
    currentQuestion: ({ questions, currentQuestionIndex }) => questions[currentQuestionIndex] || null,
    currentGroup: (_, { groups, currentQuestion }) =>
        groups.find(group => group.id === currentQuestion?.groupId) || null,
    error: ({ error }) => error,

    getGroupQuestions:
        (_, { questions }) =>
        groupId =>
            questions.filter(question => question.groupId === groupId),

    getGroupProgress:
        (_, { getGroupQuestions }) =>
        groupId => {
            const questions = getGroupQuestions(groupId)
            const questionsWithAnswer = questions.filter(question => question.selectedAnswer)

            return parseInt((questionsWithAnswer.length / questions.length) * 100, 10)
        }
}
