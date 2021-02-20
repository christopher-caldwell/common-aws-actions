import { SearchConfig } from '../../../src/dynamo/interfaces'

export const tableName = process.env.TABLE_NAME as string
export const partitionKey = process.env.PARTITION_KEY as string
export const rangeKey = process.env.RANGE_KEY as string
export const gsiName = process.env.GSI_1_NAME as string
export const gsiPartitionKey = process.env.GSI_1_PARTITION_KEY as string
export const gsiPartitionRangeKey = process.env.GSI_1_RANGE_KEY as string

const partitionKeySearchTerm = 'one'
const rangeKeySearchTerm = 'one'

export const getItemArgs = {
  [partitionKey]: partitionKeySearchTerm,
  [rangeKey]: rangeKeySearchTerm,
}

export const putItemArgs = {
  [partitionKey]: partitionKeySearchTerm,
  [rangeKey]: rangeKeySearchTerm,
}

export const queryItemArgsForOnlyPartition: SearchConfig = {
  TableName: tableName,
  partitionKeyName: partitionKey,
  partitionKeySearchTerm,
}

export const queryItemArgsWithSimpleRange: SearchConfig = {
  TableName: tableName,
  partitionKeyName: partitionKey,
  partitionKeySearchTerm,
  rangeKeyName: rangeKey,
}

export const queryItemArgsForWithGsiOnlyPartition: SearchConfig = {
  TableName: tableName,
  partitionKeyName: gsiPartitionKey,
  partitionKeySearchTerm,
  indexToQuery: gsiName,
}

export const queryItemResponse = {
  Count: 1,
  Items: [getItemArgs],
}
