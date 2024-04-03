import { mountSuspended } from '@nuxt/test-utils/runtime'
import AvatarGroup from '@/components/UI/avatar/AvatarGroup.vue'

describe('Avatar Group Test Cases', () => {
  it('The link is forming correct', async () => {
    const props = { id: 123 }
    const component = await mountSuspended(AvatarGroup, { props })
    const link = component.find('a')
    expect(link.attributes('href')).toBe('/user/' + props.id)
  })
})
