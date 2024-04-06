import { capitalFirst } from "./capitalFirst"

describe('Capical First util Test Cases', () => {
  it('converts the string\'s first letter capital', async () => {
    expect(capitalFirst('hello')).toBe('H')
    expect(capitalFirst('bye')).toBe('B')
    expect(capitalFirst('123')).toBe('1')
    expect(capitalFirst('#@&')).toBe('#')
  })
})
