import { validEmail } from '@/domain/entities'

describe('Email validation', () => {
  it('should not accept empty strings', () => {
    const email = ''
    expect(validEmail(email)).toBeFalsy()
  })

  it('should accept valid email', () => {
    const email = 'any@mail.com'
    expect(validEmail(email)).toBeTruthy()
  })

  it('should not accept strings larger than 320 chars', () => {
    const email = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(validEmail(email)).toBeFalsy()
  })

  it('should not accept domain part larger than 255 chars', () => {
    const email = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(validEmail(email)).toBeFalsy()
  })

  it('should not accept local part larger than 64 chars', () => {
    const email = 'l'.repeat(65) + '@mail.com'
    expect(validEmail(email)).toBeFalsy()
  })

  it('should not accept empty local part', () => {
    const email = '@mail.com'
    expect(validEmail(email)).toBeFalsy()
  })

  it('should not accept empty domain', () => {
    const email = 'any@'
    expect(validEmail(email)).toBeFalsy()
  })

  it('should not accept domain with a part larger than 63 chars', () => {
    const email = 'any@' + 'd'.repeat(64) + '.com'
    expect(validEmail(email)).toBeFalsy()
  })

  it('should not accept local part with invalid char', () => {
    const email = 'any email@mail.com'
    expect(validEmail(email)).toBeFalsy()
  })

  it('should not accept local part with two dots', () => {
    const email = 'any..email@mail.com'
    expect(validEmail(email)).toBeFalsy()
  })

  it('should not accept local part with ending dot', () => {
    const email = 'any.@mail.com'
    expect(validEmail(email)).toBeFalsy()
  })

  it('should not accept email without an at-sign', () => {
    const email = 'anymail.com'
    expect(validEmail(email)).toBeFalsy()
  })
})
