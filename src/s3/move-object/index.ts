import S3, { CopyObjectRequest, DeleteObjectRequest } from 'aws-sdk/clients/s3'

const S3Client = new S3()

const generateDeleteParams = (bucketName: string, fileName: string): DeleteObjectRequest => ({
  Key: fileName,
  Bucket: bucketName,
})

const generateCopyParams = (bucketName: string, originalKeyName: string, newKeyName: string): CopyObjectRequest => {
  const params = {
    Bucket: bucketName,
    CopySource: bucketName + '/' + originalKeyName,
    Key: newKeyName,
  }
  return params
}

const generateObjectUrl = (bucketName: string, key: string): string => {
  return `https://${bucketName}.s3.amazonaws.com/${key}`
}

/** Rename an object inside the sae bucket. Useful for moving objects.
 * Although S3 does not technically have the concept of folders, this can change the key names to simulate the moving of objects.
 *
 * @example Moving files to be processed from `pending/file.csv` to `successful/file.csv`
 * */
export const moveObject = async (
  sourceBucketName: string,
  originalKeyName: string,
  newKeyName: string,
  { destinationBucketName, keepOriginalObject = false }: MoveObjectOptions = {}
): Promise<MoveObjectResult> => {
  const deleteParams = generateDeleteParams(sourceBucketName, originalKeyName)
  const copyParams = generateCopyParams(destinationBucketName || sourceBucketName, originalKeyName, newKeyName)
  try {
    await S3Client.copyObject(copyParams).promise()
    if (!keepOriginalObject) await S3Client.deleteObject(deleteParams).promise()
    return {
      s3Url: generateObjectUrl(destinationBucketName || sourceBucketName, newKeyName),
      newKey: newKeyName,
    }
  } catch (error) {
    console.error('Error caught while moving object in S3', error)
    throw error
  }
}

interface MoveObjectOptions {
  destinationBucketName?: string
  /** If you wish to keep the original object in place. The default behavior is to delete the source of the copied object
   * @default false
   */
  keepOriginalObject?: boolean
}

interface MoveObjectResult {
  /** The URL of the new object */
  s3Url: string
  /** The key within the bucket. This is he key the caller provides, and is returned for convenience */
  newKey: string
}
