import { mountSuspended } from '@nuxt/test-utils/runtime'
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue'

describe('Breadcrumbs Test Cases', () => {
  it('The link is forming correct', async () => {
    const props = {
      data: [
        { name: 'login', link: '/login' },
        { name: 'communities', link: '/communities' },
        { name: 'explore', link: '/explore' }
      ]
    }
    const component = await mountSuspended(Breadcrumbs, { props })
    const list = component.findAll('li')
    expect(list).toHaveLength(props.data.length)

  })
})
