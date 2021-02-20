import { DocClient } from '@/dynamo/shared'

import { UpdateItemInput, UpdateItemOutput } from './interfaces'

/**
 * Updates a single Item in DynamoDB. Must be a property at the root of the item. Nested updates are not supported by AWS.
 */
export const basicUpdateItem = (
  TableName: string,
  config: UpdateItemInput,
  shouldLogParams?: boolean
): Promise<UpdateItemOutput> => {
  const params: UpdateItemInput = {
    ...config,
    TableName,
  }
  if (shouldLogParams) {
    console.log('Update params', params)
  }
  return DocClient.update(params).promise()
}

export { UpdateItemInput }
