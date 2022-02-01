import { createLocalVue, shallowMount } from '@vue/test-utils'

import '@/store'
import Core from '@/core'
import Task from '@/models/Task'
import Dashboard from '@/views/Dashboard'

describe('Dashboard', () => {
  let wrapper

  beforeAll(async () => {
    await Task.api().get()
  })

  beforeEach(async () => {
    const localVue = createLocalVue()
    // Configure the local vue with plugins
    const { i18n, wait, store } = Core.init(localVue).useAll()

    wrapper = await shallowMount(Dashboard, {
      i18n,
      localVue,
      store,
      wait
    })
  })

  it('should sort the task with the closed ones at the end', () => {
    expect(wrapper.vm.tasks).toHaveLength(4)
    expect(wrapper.vm.tasks[3].status).toEqual('CLOSED')
    const element = wrapper.findAll('task-stats-card-stub')
    expect(element).toHaveLength(4)
    expect(element.at(3).attributes().taskid).toEqual('3')
  })

  it('should not display tasks with no task record', async () => {
    expect(wrapper.vm.tasks).toHaveLength(4)
    const element = wrapper.findAll('task-stats-card-stub')
    expect(element).toHaveLength(4)
  })

  it('should show the link to the stats', () => {
    const element = wrapper.find('.dashboard__container__left-panel__stats-link')
    expect(element.text()).toBe('All stats')
  })
})
