import { mount } from '@vue/test-utils'
import Error from '@/components/Error.vue'

describe('Error', () => {
    it('is a Vue instance', () => {
        const wrapper = mount(Error)

        expect(wrapper.vm).toBeTruthy()
    })

    it('contains correct message', () => {
        const wrapper = mount(Error)

        expect(wrapper.html()).toContain('Please provide answer')
    })
})
