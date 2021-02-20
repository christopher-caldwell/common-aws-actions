import { Key, AttributeMap } from '@/dynamo/shared'

export interface UpdateItemArgs {
  primaryKey: Key
  propertyToUpdate: string
  newValueOfProperty: string | number | boolean | AttributeMap
  updateExpression?: string
  returnValues?: string
}
