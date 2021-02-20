import { DocumentClient } from '@/dynamo/shared/interfaces'

export interface TransactWriteItemsInput extends DocumentClient.TransactWriteItemsInput {}
export interface TransactWriteItemList extends DocumentClient.TransactWriteItemList {}
export interface TransactWriteItem extends DocumentClient.TransactWriteItem {}
export interface TransactWriteItemsOutput extends DocumentClient.TransactWriteItemsOutput {}

export interface Operation<T = Record<string, unknown>> {
  operationType: 'delete' | 'put' | 'update' | 'conditionCheck'
  tableName: string
  recordInformation: object
  otherParams?: T
}
