import { DocClient, AttributeMap } from '@/dynamo/shared'

import { ItemList, SearchConfig, QueryOutput } from './interfaces'
import { buildQueryParams } from './helpers'

/**
 * Wrapper around DynamoDb QueryItem
 */
export const queryItem = async <T extends ItemList>(
  config: SearchConfig,
  shouldThrowErrorOnEmptySet?: boolean,
  shouldLogParams?: boolean
): Promise<ItemList> => {
  const response: AttributeMap[] = []
  let dynamoResponse: QueryOutput = { LastEvaluatedKey: undefined }

  const params = buildQueryParams(config)

  if (shouldLogParams) console.log('params', params)

  do {
    if (dynamoResponse.LastEvaluatedKey !== undefined) params.ExclusiveStartKey = dynamoResponse.LastEvaluatedKey

    dynamoResponse = await DocClient.query(params).promise()

    if (dynamoResponse.Items !== undefined) response.push(...dynamoResponse.Items)
    else throw new Error(`Search for ${config.partitionKeySearchTerm} returned Items as 'undefined'`)
  } while (dynamoResponse.LastEvaluatedKey !== undefined)

  if (response.length === 0 && shouldThrowErrorOnEmptySet) throw new Error('No results found')

  return response as T
}
