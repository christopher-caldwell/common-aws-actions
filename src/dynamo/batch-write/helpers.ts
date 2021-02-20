import { capitalizeWord } from '@/utils/formatter'
import { determineNameOfActionItem, WriteRequests } from '@/dynamo/shared'

import { IndividualBatchArg } from './interfaces'

/**
 * Helper function to build params for batch jobs
 */
export const buildBatchParams = (operations: IndividualBatchArg[]): WriteRequests => {
  return operations.map(operation => {
    const capitalizedOperationType = capitalizeWord(operation.operationType)
    const requestType = `${capitalizedOperationType}Request`
    const actionItemName = determineNameOfActionItem(capitalizedOperationType)
    return {
      // ex: PutRequest
      [requestType]: {
        // ex: Item
        [actionItemName]: operation.recordInformation,
      },
    }
  })
}
