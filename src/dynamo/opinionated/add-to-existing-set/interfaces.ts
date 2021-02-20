import { Key, AttributeMap } from '@/dynamo/shared'

export interface AddToSetArgs {
  primaryKey: Key
  itemToAdd: string | number | boolean | null | AttributeMap
  propertyToUpdate: string
  updateExpression?: string
  returnValues?: string
}
