import { getSecret } from '../../../src/secrets-manager'

describe('Secrets Manager - Centralized Imports`', () => {
  test('Importing Get Secret is successful', () => {
    expect(getSecret).toBeTruthy()
  })
})
