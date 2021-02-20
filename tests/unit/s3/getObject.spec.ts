import { GetObjectRequest } from 'aws-sdk/clients/s3'
import getObject from '../../../src/s3/lib/getObject'
import CustomError from '../../../src/util/ErrorHandler'
import { getObjectParams, getObjectResponseBody, getObjectResponse } from '../test-data/s3'

const mockedGetObject = jest.fn()
jest.mock('aws-sdk/clients/s3', () => {
  return class S3 {
    getObject(params: GetObjectRequest) {
      return {
        promise() {
          mockedGetObject(params)
          return getObjectResponse
        },
      }
    }
  }
})

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('S3 - Get Object', () => {
  test('Params are used correctly', async () => {
    await getObject(getObjectParams)
    expect(mockedGetObject).toHaveBeenCalledWith(getObjectParams)
  })
  test('If specified, parsed json is returned', async () => {
    const data = await getObject(getObjectParams, true)
    expect(data).toStrictEqual(getObjectResponseBody)
  })
  test('An error is caught and handled properly', async () => {
    mockedGetObject.mockImplementation(() => {
      throw new Error('oops')
    })
    expect.assertions(1)
    getObject(getObjectParams).catch(error => {
      expect(error).toBeInstanceOf(CustomError)
    })
  })
})
