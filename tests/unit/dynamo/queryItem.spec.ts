/* eslint-disable max-len */
import { SearchConfig, QueryOutput } from '../../../src/dynamo/interfaces'
import queryItem from '../../../src/dynamo/lib/queryItem'

import { queryItemArgs, queryItemResponse, tableName } from '../test-data/dynamo'

const mockedPutItem = jest.fn(
  (params?: SearchConfig): QueryOutput => {
    return {
      Count: 1,
      Items: 
    }
  }
)
jest.mock('../../../src/dynamo/helpers/initializeDynamo.ts', () => {
  class DocumentClient {
    query(params: SearchConfig) {
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
  jest.spyOn(console, 'error').mockImplementation(() => {})
  jest.spyOn(console, 'log').mockImplementation(() => {})
})

describe('Dynamo - Put Item', () => {
  test('Calling get item with standard args is successful', async () => {
    const runTest = async () => {
      await queryItem(tableName, putItemArgs, true)
    }
    expect(runTest).not.toThrow(Error)
  })
  test('An error caught, throws an error', async () => {
    mockedPutItem.mockImplementation(() => {
      throw new Error('oopsie')
    })
    expect.assertions(1)
    await queryItem(tableName, putItemArgs).catch(error => {
      expect(error).toBeInstanceOf(Error)
    })
  })
})
