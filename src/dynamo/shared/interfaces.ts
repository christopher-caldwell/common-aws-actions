import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client'

export { DocumentClient }

export interface WriteRequests extends DocumentClient.WriteRequests {}
export interface DeleteRequest extends DocumentClient.DeleteRequest {}
export interface PutItemInputAttributeMap extends DocumentClient.PutItemInputAttributeMap {}
export interface AttributeMap extends DocumentClient.AttributeMap {}

export interface Key extends DocumentClient.Key {}
