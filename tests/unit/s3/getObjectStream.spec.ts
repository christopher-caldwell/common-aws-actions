import { Readable } from 'stream'
import { GetObjectRequest } from 'aws-sdk/clients/s3'
import getObjectStream from '../../../src/s3/lib/getObjectStream'
import CustomError from '../../../src/util/ErrorHandler'
import { getObjectParams } from '../test-data/s3'

const mockedGetObjectStream = jest.fn()
jest.mock('aws-sdk/clients/s3', () => {
  return class S3 {
    getObject(params: GetObjectRequest) {
      return {
        createReadStream() {
          mockedGetObjectStream(params)
          return new Readable()
        },
      }
    }
  }
})

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('S3 - Get Object Stream', () => {
  test('Params are used correctly', () => {
    getObjectStream(getObjectParams)
    expect(mockedGetObjectStream).toHaveBeenCalledWith(getObjectParams)
  })
  test('An error is caught and handled properly', () => {
    mockedGetObjectStream.mockImplementation(() => {
      throw new Error('oops')
    })
    const runTest = () => {
      getObjectStream(getObjectParams)
    }
    expect(runTest).toThrow(CustomError)
  })
})
