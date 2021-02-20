import { DocClient } from '@/dynamo/shared'

import { UpdateItemInput, UpdateItemOutput } from '@/dynamo/update-item/interfaces'
import { AddToSetArgs } from './interfaces'

/**
 * Simplified add to existing set. Property must be at the top level of the item, **not** nested
 */
export const addToItemSet = (
  TableName: string,
  { propertyToUpdate, primaryKey, returnValues = 'UPDATED_NEW', itemToAdd }: AddToSetArgs,
  shouldLogParams?: boolean
): Promise<UpdateItemOutput> => {
  const ExpressionAttributeNames = { '#update_property': propertyToUpdate }
  const ExpressionAttributeValues = { ':new_value': itemToAdd }
  const params: UpdateItemInput = {
    TableName,
    ReturnValues: returnValues,
    Key: primaryKey,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    UpdateExpression: 'SET #update_property = list_append(#update_property, :new_value)',
  }
  if (shouldLogParams) console.log('Update params', params)

  return DocClient.update(params).promise()
}

export { AddToSetArgs }
