import { UpdateItemInput, UpdateItemOutput } from '@/dynamo/update-item/interfaces'
import { DocClient } from '@/dynamo/shared'

import { UpdateItemArgs } from './interfaces'

/**
 * Simplified update for a single property on an Item
 *
 * For the purposes of a custom `updateExpression`, Property being updated will be named `#new_key`.
 * Value will be assigned as `:nv`
 */
export const updateItem = (
  TableName: string,
  {
    propertyToUpdate,
    newValueOfProperty,
    primaryKey,
    updateExpression = 'set #new_key = :nv',
    returnValues = 'UPDATED_NEW',
  }: UpdateItemArgs,
  shouldLogParams?: boolean
): Promise<UpdateItemOutput> => {
  const ExpressionAttributeNames = { '#new_key': propertyToUpdate }
  const ExpressionAttributeValues = { ':nv': newValueOfProperty }
  const params: UpdateItemInput = {
    TableName,
    ReturnValues: returnValues,
    Key: primaryKey,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    UpdateExpression: updateExpression,
  }
  if (shouldLogParams) console.log('Update params', params)

  return DocClient.update(params).promise()
}

export { UpdateItemArgs }
