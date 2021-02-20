import { HeadObjectOutput, HeadObjectRequest } from 'aws-sdk/clients/s3'

import { S3client } from '../shared'

/**
 * Fetches the metadata for an object in a given S3 bucket. If second argument present, will return only the size of the object requested
 */
const getObjectMetadata = async (
  params: HeadObjectRequest,
  shouldReturnSize?: boolean
): Promise<HeadObjectOutput | number> => {
  const data: HeadObjectOutput = await S3client.headObject(params).promise()
  if (shouldReturnSize && data.ContentLength) return data.ContentLength
  return data
}

export { HeadObjectRequest }

export default getObjectMetadata
