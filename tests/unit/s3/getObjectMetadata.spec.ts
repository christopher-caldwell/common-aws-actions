import { HeadObjectRequest } from 'aws-sdk/clients/s3'
import getObjectMetadata from '../../../src/s3/lib/getMetadata'
import CustomError from '../../../src/util/ErrorHandler'
import { getObjectMetadataParams, getObjectMetadataLength, getObjectMetadataResponse } from '../test-data/s3'

const mockedGetObjectMetadata = jest.fn()
jest.mock('aws-sdk/clients/s3', () => {
  return class S3 {
    headObject(params: HeadObjectRequest) {
      return {
        promise() {
          mockedGetObjectMetadata(params)
          return getObjectMetadataResponse
        },
      }
    }
  }
})

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('S3 - Get Object Metadata', () => {
  test('Params are used correctly', async () => {
    const metadata = await getObjectMetadata(getObjectMetadataParams)
    expect(mockedGetObjectMetadata).toHaveBeenCalledWith(getObjectMetadataParams)
    expect(metadata).toStrictEqual(getObjectMetadataResponse)
  })
  test('The content length is returned when requested', async () => {
    const objectLength = await getObjectMetadata(getObjectMetadataParams, true)
    expect(objectLength).toBe(getObjectMetadataLength)
  })
  test('An error is caught and handled properly', async () => {
    mockedGetObjectMetadata.mockImplementation(() => {
      throw new Error('oops')
    })
    expect.assertions(1)
    await getObjectMetadata(getObjectMetadataParams).catch(error => {
      expect(error).toBeInstanceOf(CustomError)
    })
  })
})
