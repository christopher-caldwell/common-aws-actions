import { DocumentClient, DeleteRequest, PutItemInputAttributeMap } from '@/dynamo/shared/interfaces'

export interface BatchWriteItemOutput extends DocumentClient.BatchWriteItemOutput {}
export interface BatchWriteItemInput extends DocumentClient.BatchWriteItemInput {}

export interface IndividualBatchArg {
  operationType: 'put' | 'delete'
  recordInformation: DeleteRequest | PutItemInputAttributeMap
}
