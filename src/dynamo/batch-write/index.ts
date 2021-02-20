import { DocClient } from '@/dynamo/shared'

import { BatchWriteItemOutput, BatchWriteItemInput, IndividualBatchArg } from './interfaces'
import { buildBatchParams } from './helpers'

/**
 * Wrapper around DynamoDb `BatchWrite`
 */
export const batchWrite = (
  TableName: string,
  operations: IndividualBatchArg[],
  shouldLogParams?: boolean
): Promise<BatchWriteItemOutput> => {
  const params: BatchWriteItemInput = {
    RequestItems: {
      [TableName]: buildBatchParams(operations),
    },
  }
  if (shouldLogParams) console.log('BatchWrite params', params)

  return DocClient.batchWrite(params).promise()
}

export { IndividualBatchArg }
