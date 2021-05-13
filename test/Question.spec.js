import { mount } from '@vue/test-utils'

import Question from '@/components/Question.vue'

const mockQuestion = {
    id: 1,
    question: 'Test question',
    answers: ['Answer 1', 'Answer 2', 'Answer 3'],
    selectedAnswer: null
}

const propsData = {
    question: mockQuestion
}

describe('Question', () => {
    it('is a Vue instance', () => {
        const wrapper = mount(Question, {
            propsData: {
                question: mockQuestion
            }
        })

        expect(wrapper.vm).toBeTruthy()
    })

    it('shows correct number of answers', () => {
        const wrapper = mount(Question, { propsData })

        expect(wrapper.findAll('.question__answer')).toHaveLength(mockQuestion.answers.length)
    })

    it('selects an answer', async () => {
        const wrapper = mount(Question, { propsData })
        const input = wrapper.find('.question__input')

        await input.trigger('change')

        expect(wrapper.vm.selectedAnswer).toEqual(mockQuestion.answers[0])
    })
})
