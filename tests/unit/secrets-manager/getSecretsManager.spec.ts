/* eslint-disable max-len */
import { GetObjectRequest } from 'aws-sdk/clients/s3'
import getSecret from '../../../src/secrets-manager/lib/getSecretValue'
import CustomError from '../../../src/util/ErrorHandler'
// import { JsonObject } from '../../../src/shared/interfaces'

import {
  secretsRequestWithoutTargetSecretArgs,
  fetchedSecret,
  secretsRequestWithTargetSecretArgs,
  expectedValueOfSecret,
  secretsRequestBase64ArgsAndTargetProperty,
  decodedBase64Value,
  secretsRequestWithMockArgs,
  improperlyConfiguredKeyOfTargetSecret,
} from '../test-data/secretsManager'

const mockedGetSecret = jest.fn()
jest.mock('aws-sdk/clients/secretsmanager', () => {
  return class SecretsManager {
    getSecretValue(params: GetObjectRequest) {
      return {
        promise() {
          mockedGetSecret(params)
          return {
            SecretString: JSON.stringify(fetchedSecret),
          }
        },
      }
    }
  }
})

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Secrets Manager - Get Secret Value', () => {
  test('Fetching an entire secret returns the desired output', async () => {
    const secret = await getSecret(secretsRequestWithoutTargetSecretArgs)
    expect(secret).toStrictEqual(fetchedSecret)
  })
  test('Fetching a secret with declaring a target key, returns the value of that target key', async () => {
    const secret = await getSecret(secretsRequestWithTargetSecretArgs)
    expect(secret).toBe(expectedValueOfSecret)
  })
  test('Fetching a secret with declaring a target key, and properties to decode returns the decoded value of that target key', async () => {
    const secret = await getSecret(secretsRequestBase64ArgsAndTargetProperty)
    expect(secret).toBe(decodedBase64Value)
  })
  test('Fetching a secret and declaring a mock secret, returns the mock secret', async () => {
    const secret = await getSecret(secretsRequestWithMockArgs)
    expect(secret).toStrictEqual(fetchedSecret)
  })
  test('An improperly configured target key is caught and an error is thrown', async () => {
    expect.assertions(1)
    await getSecret(improperlyConfiguredKeyOfTargetSecret).catch(error => {
      expect(error).toBeInstanceOf(CustomError)
    })
  })
})
