import { PutItemInput, PutItemOutput, PutItemInputAttributeMap } from './interfaces'
import { DocClient } from '@/dynamo/shared'

/**
 * Wrapper around the Dynamo `PutItem`
 */
export const basicPutItem = async (
  TableName: string,
  Item: PutItemInputAttributeMap,
  shouldLogParams?: boolean
): Promise<PutItemOutput> => {
  const params: PutItemInput = { TableName, Item }
  if (shouldLogParams) console.log('Put params', params)

  return DocClient.put(params).promise()
}
