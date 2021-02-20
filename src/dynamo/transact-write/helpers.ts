import { capitalizeWord } from '@/utils/formatter'

import { TransactWriteItemsInput, TransactWriteItemList, TransactWriteItem, Operation } from './interfaces'
import { determineNameOfActionItem } from '@/dynamo/shared'

/**
 * Formats arg into expected param
 */
export const turnOperationIntoFormattedParam = (operation: Operation): TransactWriteItem => {
  const operationType = capitalizeWord(operation.operationType)
  const keyOfItemAction = determineNameOfActionItem(operationType)
  const valueOfItemAction = operation.recordInformation
  const otherParams = operation.otherParams || {}
  return {
    [operationType]: {
      [keyOfItemAction]: valueOfItemAction,
      TableName: operation.tableName,
      ...otherParams,
    },
  }
}

/**
 * Creates params that Dynamo is expecting
 */
export const generateTransactionalOperations = (operations: Operation[]): TransactWriteItemsInput => {
  const constructedOperations: TransactWriteItemList = operations.map(turnOperationIntoFormattedParam)
  return {
    TransactItems: constructedOperations,
  }
}
