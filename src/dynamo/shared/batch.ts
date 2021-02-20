import chopArray from 'array-chop'

import { IndividualBatchArg } from '@/dynamo/batch-write/interfaces'
import { batchWrite } from '@/dynamo/batch-write/'

const maxNumberOfOperations = 20

export const handleBatchesOfOperations = async (
  operationsRemaining: IndividualBatchArg[],
  tableName: string
): Promise<void> => {
  const chunkedBatchOps = chopArray(operationsRemaining, maxNumberOfOperations)
  const operations = chunkedBatchOps.map(operation => batchWrite(tableName, operation))
  try {
    await Promise.all(operations)
  } catch (error) {
    console.error(error)
  }
}
