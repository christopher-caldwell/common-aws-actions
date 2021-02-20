import { DocumentClient } from '@/dynamo/shared/interfaces'

export interface DeleteItemOutput extends DocumentClient.DeleteItemOutput {}
export interface DeleteRequest extends DocumentClient.DeleteRequest {}
export interface DeleteItemInput extends DocumentClient.DeleteItemInput {}
