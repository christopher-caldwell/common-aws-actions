import {
  SearchConfig,
  SearchParams,
  ExpressionAttributeValues as IExpressionAttributeValues,
  QueryInput,
} from './interfaces'

/**
 * Determines if range key was passed to query function
 */
const determineIfRangeKeyIsUsed = (searchConfig: SearchConfig): SearchParams => {
  const {
    partitionKeyName,
    rangeKeyName,
    partitionKeySearchTerm,
    rangeKeySearchTerm,
    rangeKeyComparisonOperator = 'BEGINS_WITH',
    indexToQuery,
  } = searchConfig

  // if there was an `indexToQuery` arg provided, use it
  const IndexName: string | undefined = indexToQuery || undefined

  // only query based on the partition, not using the range key
  let KeyConditionExpression = `${partitionKeyName} = :par`
  let ExpressionAttributeValues: IExpressionAttributeValues = { ':par': partitionKeySearchTerm }

  // if a range key was be provided, use it
  if (rangeKeyName) {
    KeyConditionExpression = `${partitionKeyName} = :par and ${rangeKeyComparisonOperator} (${rangeKeyName} , :ran )`
    ExpressionAttributeValues = {
      ':par': partitionKeySearchTerm,
      ':ran': rangeKeySearchTerm,
    }
  }
  return { KeyConditionExpression, ExpressionAttributeValues, IndexName }
}

export const buildQueryParams = (config: SearchConfig): QueryInput => {
  // setting the values to a default to null if not provided
  const { filterExpression, projectionExpression, tableName } = config
  const { KeyConditionExpression, ExpressionAttributeValues, IndexName } = determineIfRangeKeyIsUsed(config)
  const queryParams: QueryInput = {
    TableName: tableName,
    FilterExpression: filterExpression,
    ProjectionExpression: projectionExpression,
    KeyConditionExpression,
    ExpressionAttributeValues,
    IndexName,
  }

  return queryParams
}
