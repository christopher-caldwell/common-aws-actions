/* eslint-disable max-len */
import { GetItemInput, GetItemOutput } from '../../../src/dynamo/interfaces'
import getItem from '../../../src/dynamo/lib/getItem'
import CustomError from '../../../src/util/ErrorHandler'
// import { JsonObject } from '../../../src/shared/interfaces'

import { getItemArgs, tableName } from '../test-data/dynamo'

const mockedGetItem = jest.fn(
  (params?: GetItemInput): GetItemOutput => {
    return {
      Item: getItemArgs,
    }
  }
)
jest.mock('../../../src/dynamo/helpers/initializeDynamo.ts', () => {
  class DocumentClient {
    get(params: GetItemInput) {
      return {
        promise() {
          return mockedGetItem(params)
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

describe('Dynamo - Get Item', () => {
  test('Calling get item with standard args is successful', async () => {
    const item = await getItem(tableName, getItemArgs, true)
    expect(item).toStrictEqual(getItemArgs)
  })
  test('Calling get item on a non existing item throws an error', async () => {
    mockedGetItem.mockImplementation(() => {
      return { Item: undefined }
    })
    expect.assertions(1)
    await getItem(tableName, getItemArgs).catch(error => {
      expect(error).toBeInstanceOf(CustomError)
    })
  })
  test('An error caught, throws an error', async () => {
    mockedGetItem.mockImplementation(() => {
      throw new Error('oopsie')
    })
    expect.assertions(1)
    await getItem(tableName, getItemArgs).catch(error => {
      expect(error).toBeInstanceOf(CustomError)
    })
  })
})
