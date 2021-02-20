import { PutItemInputAttributeMap } from '@/dynamo/shared'
import { handleBatchesOfOperations } from '@/dynamo/shared/batch'
import { aggregateBaseDataIntoBatchWriteParams } from './helpers'

/**
 * Take in an array of objects, writes them in batches of 20.
 */
export const handleBatchWrite = async (
  baseData: PutItemInputAttributeMap[],
  tableName: string,
  operationType?: 'put' | 'delete'
): Promise<void> => {
  const formattedOperations = aggregateBaseDataIntoBatchWriteParams(baseData, operationType)
  await handleBatchesOfOperations(formattedOperations, tableName)
}
