import { PutItemInputAttributeMap } from '@/dynamo/shared'
import { IndividualBatchArg } from '@/dynamo/batch-write/interfaces'

export const aggregateBaseDataIntoBatchWriteParams = (
  baseData: PutItemInputAttributeMap[],
  operationType: 'put' | 'delete' = 'put'
): IndividualBatchArg[] => {
  return baseData.map(data => {
    return {
      recordInformation: data,
      operationType,
    }
  })
}
