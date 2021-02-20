import { get } from '@/dynamo/get-item'
import { AttributeMap } from '@/dynamo/shared'

import { partitionKeyName, rangeKeyName, tableName, validateEnv } from '@/dynamo/opinionated/shared'

/** An opinionated `getItem`. This functions assumes you have set the environment variables for the key names and table name in the provided way.
 *
 * `PARTITION_KEY_NAME`, `RANGE_KEY_NAME`, `TABLE_NAME`
 *
 * This function will throw an error on an empty grab
 */
export const getItem = async <Result extends AttributeMap>(
  partitionSearchTerm: string,
  rangeSearchTerm: string,
  shouldLogParams?: boolean
): Promise<Result> => {
  validateEnv()
  const key = {
    [partitionKeyName]: partitionSearchTerm,
    [rangeKeyName]: rangeSearchTerm,
  }
  return get<Result>(tableName, key, true, shouldLogParams) as Promise<Result>
}
