import { getObject, getObjectStream, getObjectMetadata } from '../../../src/s3'

describe('Secrets Manager - Centralized Imports`', () => {
  test('Importing Get Object is successful', () => {
    expect(getObject).toBeTruthy()
  })
  test('Importing Get Object Stream is successful', () => {
    expect(getObjectStream).toBeTruthy()
  })
  test('Importing Get Object Metadata is successful', () => {
    expect(getObjectMetadata).toBeTruthy()
  })
})
