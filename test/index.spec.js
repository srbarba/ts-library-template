import HelloWorld from '@/index'

describe('HelloWorld', () => {
  it('returns Hello world when execute HelloWorld method', () => {
    expect(HelloWorld()).toBe('Hello world')
  })
})
