import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

import Progress from '@/components/Progress.vue'

const groupsMock = [
    { id: 1, title: 'Group 1' },
    { id: 2, title: 'Group 2' }
]

const getGroupProgressMock = jest.fn()

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Progress', () => {
    let store

    beforeEach(() => {
        getGroupProgressMock.mockReturnValue(() => 0)

        store = new Vuex.Store({
            modules: {
                quiz: {
                    namespaced: true,
                    getters: {
                        groups: () => groupsMock,
                        currentGroup: () => groupsMock[0],
                        getGroupProgress: getGroupProgressMock
                    }
                }
            }
        })
    })

    it('is a Vue instance', () => {
        const wrapper = shallowMount(Progress, { localVue, store })

        expect(wrapper.vm).toBeTruthy()
    })

    it('has the same number of progress bars as groups', () => {
        const wrapper = shallowMount(Progress, { localVue, store })

        expect(wrapper.findAll('.progress__bar')).toHaveLength(2)
    })

    it('shows correct completion percentage', () => {
        getGroupProgressMock.mockReturnValue(() => 50)

        const wrapper = shallowMount(Progress, { localVue, store })

        expect(wrapper.find('.progress__percentage').html()).toContain('50% completed')
    })
})
