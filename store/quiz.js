import { v4 as uuid } from 'uuid'

export const state = () => ({
    groups: [],
    questions: [],
    currentQuestionIndex: 0
})

export const mutations = {
    SET_QUIZ_DATA(state, groups) {
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
    }
}

export const actions = {
    setQuizData({ commit }, groups) {
        commit('SET_QUIZ_DATA', groups)
    },

    setCurrentQuestionIndex({ commit }, index) {
        commit('SET_CURRENT_QUESTION_INDEX', index)
    }
}

export const getters = {
    groups: ({ groups }) => groups,
    questions: ({ questions }) => questions,
    questionCount: (_, { questions }) => questions.length,
    currentQuestionIndex: ({ currentQuestionIndex }) => currentQuestionIndex,
    currentQuestion: ({ questions, currentQuestionIndex }) => questions[currentQuestionIndex] || null
}
