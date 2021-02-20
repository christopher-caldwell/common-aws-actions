import { Key, AttributeMap, DocClient } from '@/dynamo/shared'

import { GetItemInput } from './interfaces'

/**
 * Wrapper around Dynamo GetItem. If third argument is `true`, an error will be thrown when a searched for item is not found
 */
export const get = async <Result extends AttributeMap>(
  TableName: string,
  key: Key,
  shouldThrowErrorOnNoResult?: boolean,
  shouldLogParams?: boolean
): Promise<Result | undefined> => {
  const params: GetItemInput = { TableName, Key: key }
  if (shouldLogParams) console.log('GetItem params', params)

  const dynamoResponse = await DocClient.get(params).promise()
  if (dynamoResponse.Item) return dynamoResponse.Item as Result

  if (shouldThrowErrorOnNoResult) throw new Error('Requested item was not found')
  return dynamoResponse.Item
}

export { Key }
