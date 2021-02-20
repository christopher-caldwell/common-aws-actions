import { Key, DocClient } from '@/dynamo/shared/'

import { DeleteItemInput, DeleteItemOutput } from './interfaces'

/**
 * Wrapper around Dynamo Delete Item
 */
export const deleteItem = async (TableName: string, key: Key, shouldLogParams?: boolean): Promise<DeleteItemOutput> => {
  const params: DeleteItemInput = { TableName, Key: key }

  if (shouldLogParams) console.log('Delete item params', params)
  return DocClient.delete(params).promise()
}

export { Key }
