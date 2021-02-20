/* eslint-disable max-len */
import { PutItemInput } from '../../../src/dynamo/interfaces'
import putItem from '../../../src/dynamo/lib/putItem'

import { putItemArgs, tableName } from '../test-data/dynamo'

const mockedPutItem = jest.fn()
jest.mock('../../../src/dynamo/helpers/initializeDynamo.ts', () => {
  class DocumentClient {
    put(params: PutItemInput) {
      return {
        promise() {
          mockedPutItem(params)
        },
      }
    }
  }
  return new DocumentClient()
})

beforeEach(() => {
  // jest.spyOn(console, 'error').mockImplementation(() => { })
  jest.spyOn(console, 'log').mockImplementation(() => {})
})

describe('Dynamo - Put Item', () => {
  test('Calling get item with standard args is successful', async () => {
    const runTest = async () => {
      await putItem(tableName, putItemArgs, true)
    }
    expect(runTest).not.toThrow(Error)
  })
  test('An error caught, throws an error', async () => {
    mockedPutItem.mockImplementation(() => {
      throw new Error('oopsie')
    })
    expect.assertions(1)
    await putItem(tableName, putItemArgs).catch(error => {
      expect(error).toBeInstanceOf(Error)
    })
  })
})
