[S3](./README.md#wrappers) / Move Object

# Move Object

Moves ( re-names ) an object inside of an S3 bucket and returns the new key.

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

| Name                    | Type      | Required? | Description                                                                   |
| ----------------------- | --------- | :-------: | ----------------------------------------------------------------------------- |
| `destinationBucketName` | `string`  |    :x:    | If you are moving objects across buckets, provide the destination bucket name |
| `keepOriginalObject`    | `boolean` |    :x:    | If you wish to preserve the source object. Default behavior is to delete.     |
