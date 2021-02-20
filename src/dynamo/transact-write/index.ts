import { DocClient } from '@/dynamo/shared'

import { TransactWriteItemsOutput, Operation } from './interfaces'
import { generateTransactionalOperations } from './helpers'

/**
 * Performs a series of DynamoDb operations that either all pass, or all fail
 */
export const transactWrite = (
  operations: Operation[],
  shouldLogParams?: boolean
): Promise<TransactWriteItemsOutput> => {
  const params = generateTransactionalOperations(operations)
  if (shouldLogParams) console.log('Params before beginning transactional operation', params)

  return DocClient.transactWrite(params).promise()
}

export { Operation }
