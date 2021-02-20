import { Key } from '@/dynamo/shared'

export interface IncrementValueArgs {
  primaryKey: Key
  numberToIncreaseBy?: number
  propertyToUpdate: string
  updateExpression?: string
  returnValues?: string
}
