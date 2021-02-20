import { UpdateItemInput, UpdateItemOutput } from '@/dynamo/update-item/interfaces'
import { DocClient } from '@/dynamo/shared'

import { IncrementValueArgs } from './interfaces'

/**
 * Simplified increment property. Property must be at the top level of the item, **not** nested.
 * If the targeted value is `1`, this will make it `2`
 */
export const simpleIncrementItemProperty = (
  TableName: string,
  { propertyToUpdate, primaryKey, returnValues = 'UPDATED_NEW', numberToIncreaseBy = 1 }: IncrementValueArgs,
  shouldLogParams?: boolean
): Promise<UpdateItemOutput> => {
  const ExpressionAttributeNames = { '#new_key': propertyToUpdate }
  const ExpressionAttributeValues = { ':inc': numberToIncreaseBy }
  const params: UpdateItemInput = {
    TableName,
    ReturnValues: returnValues,
    Key: primaryKey,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    UpdateExpression: 'ADD #new_key :inc',
  }
  if (shouldLogParams) console.log('Update params', params)

  return DocClient.update(params).promise()
}
