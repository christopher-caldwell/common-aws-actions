import { Readable } from 'stream'
import { GetObjectOutput, GetObjectRequest } from 'aws-sdk/clients/s3'

import { S3client } from '../shared'

/**
 * Fetches an item from an S3 bucket. If a second argument of `true` is provided, the object will be JSON.parsed before return.
 */
export const getObject = async <T>(params: GetObjectRequest, isJson?: boolean): Promise<GetObjectOutput | T> => {
  const data: GetObjectOutput = await S3client.getObject(params).promise()
  if (isJson) {
    const object = data && data.Body && JSON.parse(data.Body.toString())
    return object as T
  }
  return data
}

export { GetObjectRequest }

export const getObjectStream = (params: GetObjectRequest): Readable => S3client.getObject(params).createReadStream()
