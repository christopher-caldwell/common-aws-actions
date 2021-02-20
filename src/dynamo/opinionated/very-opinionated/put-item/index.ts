import { basicPutItem } from '@/dynamo/put-item'
import { AttributeMap } from '@/dynamo/shared'
import { partitionKeyName, rangeKeyName, tableName, validateEnv } from '@/dynamo/opinionated/shared'

export const putItem = (
  itemToStore: AttributeMap,
  partitionKeyValue?: string,
  rangeKeyValue?: string
): Promise<AttributeMap> => {
  validateEnv()
  let item: AttributeMap = itemToStore
  if (partitionKeyValue && rangeKeyValue) {
    item = {
      [partitionKeyName]: partitionKeyValue,
      [rangeKeyName]: rangeKeyValue,
      ...item,
    }
  }
  return basicPutItem(tableName, item)
}
