import { HeadObjectOutput, HeadObjectRequest, GetObjectRequest, GetObjectOutput } from 'aws-sdk/clients/s3'

export const getObjectParams: GetObjectRequest = {
  Bucket: 'bucket',
  Key: 'key',
}
export const getObjectResponseBody = { key: 'value' }
export const getObjectResponse: GetObjectOutput = {
  Body: JSON.stringify(getObjectResponseBody),
}

export const getObjectMetadataParams: HeadObjectRequest = {
  Bucket: 'bucket',
  Key: 'key',
}
export const getObjectMetadataLength = 100
export const getObjectMetadataResponse: HeadObjectOutput = {
  ContentLength: getObjectMetadataLength,
}
