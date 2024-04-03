import { mountSuspended } from '@nuxt/test-utils/runtime'
import Avatar from '@/components/UI/avatar/Avatar.vue'

describe('Avatar Test Cases', () => {
  it('loading the avatar component', async () => {
    const component = await mountSuspended(Avatar, { props: { loading: true } })
    const elements = component.findAll('div')
    expect(elements[1].attributes('class')).toContain('skeleton rounded-full shrink-0')
  })

  it('capitalize the first letter of the name', async () => {
    const component = await mountSuspended(Avatar, { props: { name: 'abc' } })
    const element = component.find('span')
    expect(element.text()).toBe('A')
  })
})
