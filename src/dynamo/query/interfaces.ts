import { DocumentClient } from '@/dynamo/shared/interfaces'

export interface ExpressionAttributeValues {
  ':par': string
  ':ran'?: string
}

export interface SearchParams {
  KeyConditionExpression: string
  ExpressionAttributeValues: ExpressionAttributeValues
  IndexName?: string
}

export interface QueryInput extends DocumentClient.QueryInput {}
export interface QueryOutput extends DocumentClient.QueryOutput {}
export interface ItemList extends DocumentClient.ItemList {}

export interface SearchConfig {
  tableName: string
  partitionKeyName: string
  partitionKeySearchTerm: string
  rangeKeyName?: string
  rangeKeySearchTerm?: string
  rangeKeyComparisonOperator?: AllowableComparisonOperators
  indexToQuery?: string
  filterExpression?: string
  projectionExpression?: string
}

export type AllowableComparisonOperators =
  | 'EQ'
  | 'NE'
  | 'LE'
  | 'LT'
  | 'GE'
  | 'GT'
  | 'NOT_NULL'
  | 'NULL'
  | 'CONTAINS'
  | 'NOT_CONTAINS'
  | 'BEGINS_WITH'
  | 'IN'
  | 'BETWEEN'
