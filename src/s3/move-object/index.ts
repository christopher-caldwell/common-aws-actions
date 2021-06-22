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
): Promise<void> => {
  const deleteParams = generateDeleteParams(sourceBucketName, originalKeyName)
  const copyParams = generateCopyParams(destinationBucketName || sourceBucketName, originalKeyName, newKeyName)
  try {
    await S3Client.copyObject(copyParams).promise()
    if (!keepOriginalObject) await S3Client.deleteObject(deleteParams).promise()
  } catch (error) {
    console.error('Error caught while moving object in S3', error)
  }
}

interface MoveObjectOptions {
  destinationBucketName?: string
  /** If you wish to keep the original object in place. The default behavior is to delete the source of the copied object
   * @default false
   */
  keepOriginalObject?: boolean
}
