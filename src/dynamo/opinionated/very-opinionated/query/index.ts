import { AllowableComparisonOperators, ItemList, SearchConfig } from '@/dynamo/query/interfaces'
import { queryItem } from '@/dynamo/query'

import { tableName, partitionKeyName, rangeKeyName, validateEnv } from '@/dynamo/opinionated/shared'

export interface DynamoQueryOptions {
  partitionKeySearchTerm: string
  rangeKeySearchTerm?: string
  rangeKeyComparisonOperator?: AllowableComparisonOperators
  indexToQuery?: string
}

/** An opinionated `queryItem`. This functions assumes you have set the environment variables for the key names and table name in the provided way.
 *
 * `PARTITION_KEY_NAME`, `RANGE_KEY_NAME`, `TABLE_NAME`
 *
 * This function will throw an error if `Items` is undefined. Will not throw an error if the set is empty, `[]`
 */
export const query = async <ReturnType extends ItemList>({
  partitionKeySearchTerm,
  rangeKeySearchTerm,
  rangeKeyComparisonOperator = 'BEGINS_WITH',
  indexToQuery,
}: DynamoQueryOptions): Promise<ReturnType> => {
  validateEnv()
  const params: SearchConfig = {
    tableName: tableName,
    partitionKeyName,
    partitionKeySearchTerm,
  }
  if (rangeKeySearchTerm) {
    params.rangeKeyName = rangeKeyName
    params.rangeKeySearchTerm = rangeKeySearchTerm
    params.rangeKeyComparisonOperator = rangeKeyComparisonOperator
  }

  if (indexToQuery) params.indexToQuery = indexToQuery

  const items = await queryItem<ReturnType>(params, false)
  if (items) return items as ReturnType
  else throw new Error('No items found')
}
