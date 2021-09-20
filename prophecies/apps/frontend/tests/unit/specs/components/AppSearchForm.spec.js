import { createLocalVue, shallowMount } from '@vue/test-utils'
import AppSearchForm from '@/components/AppSearchForm'
import Core from '@/core'
import Task from '@/models/Task'

describe('AppSearchForm', () => {
  describe('with 2 tasks', () => {
    let wrapper

    beforeAll(async () => {
      await Task.api().get()
    })

    beforeEach(async () => {
      const localVue = createLocalVue()
      const core = Core.init(localVue).useAll()
      const { i18n, store, wait } = core
      const stubs = ['router-link', 'app-waiter']
      await core.configure()
      // Finally, instantiate the component
      wrapper = shallowMount(AppSearchForm, { i18n, localVue, stubs, store, wait })
    })

    afterEach(async () => {
      // Prevent a Vue warning in the next tick when the parentNode doesnt exist:
      // > TypeError: Cannot read property 'createElement' of null
      // @see https://stackoverflow.com/a/62262333
      wrapper.destroy()
    })

    it('should search tips', async () => {
      const spy = jest.spyOn(wrapper.vm, 'searchTips')
      await wrapper.vm.search('foo')
      expect(spy).toBeCalledWith('foo', expect.anything())
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should not search tips twice because of throttle', async () => {
      const spy = jest.spyOn(wrapper.vm, 'searchTips')
      await wrapper.vm.searchWithThrottle('foo')
      expect(spy).toBeCalledWith('foo', expect.anything())
      expect(spy).toHaveBeenCalledTimes(1)
      await wrapper.vm.searchWithThrottle('bar')
      expect(spy).not.toBeCalledWith('bar', expect.anything())
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should search reviews for tasks 1 and 2', async () => {
      const spy = jest.spyOn(wrapper.vm, 'searchTaskRecordReview')
      await wrapper.vm.search('foo')
      expect(spy).toHaveBeenCalledTimes(2)
      expect(spy).toBeCalledWith('foo', expect.anything(), '1')
      expect(spy).toBeCalledWith('foo', expect.anything(), '2')
    })

    it('should return a queryset of 2 tips and 6 reviews', async () => {
      await wrapper.setData({ query: 'buz' })
      await wrapper.vm.search('buz')
      expect(wrapper.vm.queryset).toHaveLength(8)
      expect(wrapper.vm.queryset).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: '3', type: 'Tip' }),
          expect.objectContaining({ id: '4', type: 'Tip' }),
          expect.objectContaining({ id: '36', type: 'TaskRecordReview' }),
          expect.objectContaining({ id: '37', type: 'TaskRecordReview' }),
          expect.objectContaining({ id: '38', type: 'TaskRecordReview' })
        ])
      )
    })

    it('should count tips 2 tips and 3 reviews for each tasks', async () => {
      await wrapper.setData({ query: 'buz' })
      await wrapper.vm.search('buz')
      expect(wrapper.vm.counts).toHaveLength(3)
      expect(wrapper.vm.counts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ count: 2, querysetId: expect.anything() }),
          expect.objectContaining({ count: 3, querysetId: expect.anything() })
        ])
      )
    })
  })

  describe('without tasks', () => {
    let wrapper

    beforeEach(async () => {
      Task.deleteAll()
      const localVue = createLocalVue()
      const core = Core.init(localVue).useAll()
      const { i18n, store, wait } = core
      const stubs = ['router-link', 'app-waiter']
      await core.configure()
      // Finally, instantiate the component
      wrapper = shallowMount(AppSearchForm, { i18n, localVue, stubs, store, wait })
    })

    afterEach(async () => {
      // Prevent a Vue warning in the next tick when the parentNode doesnt exist:
      // > TypeError: Cannot read property 'createElement' of null
      // @see https://stackoverflow.com/a/62262333
      wrapper.destroy()
    })

    it('should not search reviews when no task in the store', async () => {
      const spy = jest.spyOn(wrapper.vm, 'searchTaskRecordReview')
      await wrapper.vm.search('baz')
      expect(spy).toHaveBeenCalledTimes(0)
    })

    it('should return a queryset of 2 tips', async () => {
      await wrapper.setData({ query: 'foo' })
      await wrapper.vm.search('foo')
      expect(wrapper.vm.queryset).toHaveLength(2)
      expect(wrapper.vm.queryset).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: '3', type: 'Tip' }),
          expect.objectContaining({ id: '4', type: 'Tip' })
        ])
      )
    })
  })
})
