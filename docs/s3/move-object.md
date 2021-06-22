[S3](./README.md#wrappers) / Move Object

# Move Object

Moves ( re-names ) an object inside of an S3 bucket and returns the new key. Returns [MoveObjectResult][#move-object-result]

## Usage

```ts
import { moveObject } from '@caldwell619/common-aws-actions'

await moveObject('my-awesome-bucket', 'pending/file.csv', 'success/file.csv')
```

## Arguments

| Name               | Type                                      |     Required?      | Description                                                                   |
| ------------------ | ----------------------------------------- | :----------------: | ----------------------------------------------------------------------------- |
| `sourceBucketName` | `string`                                  | :white_check_mark: | The bucket where the original object is.                                      |
| `originalKeyName`  | `string`                                  | :white_check_mark: | The key of the object to be moved                                             |
| `newKeyName`       | `string`                                  | :white_check_mark: | The new key of the object. The original object will be "re-named" as this key |
| `options`          | [MoveObjectOptions](#move-object-options) |        :x:         | Optional configuration to alter the internal behavior                         |

## Move Object Options

| Name                    | Type                                                                                                                         | Required? | Description                                                                   |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- | :-------: | ----------------------------------------------------------------------------- |
| `destinationBucketName` | `string`                                                                                                                     |    :x:    | If you are moving objects across buckets, provide the destination bucket name |
| `keepOriginalObject`    | `boolean`                                                                                                                    |    :x:    | If you wish to preserve the source object. Default behavior is to delete.     |
| `copyOptions`           | [CopyObjectRequest](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/modules/copyobjectrequest.html) |    :x:    | If you wish to preserve the source object. Default behavior is to delete.     |

## Move Object Result

This is the structure returned from `moveObject`

```ts
interface MoveObjectResult {
  /** The URL of the new object */
  s3Url: string
  /** The key within the bucket. This is he key the caller provides, and is returned for convenience */
  newKey: string
}
```
