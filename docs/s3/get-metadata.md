[S3](./README.md#wrappers) / Get Metadata

# Get Metadata

Gets the metadata of an object stored in an S3 bucket

## Usage

```ts
import { getObjectMetadata, HeadObjectRequest } from '@caldwell619/common-aws-actions/dist/s3/get-metadata'

const params: HeadObjectRequest = {
  Bucket: '',
  Key: '',
}

const metadata = await getObjectMetadata(params)
```

## Arguments

| Name     | Type                                                                                                   | Required?          | Description |
| -------- | ------------------------------------------------------------------------------------------------------ | :------------------: | - |
| `params` | [HeadObjectRequest](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#headObject-property) | :white_check_mark: | The args sent to S3 to retrieve the metadata |
| `shouldReturnSize` | `Boolean`                                                                                              | :x:                | If present, this function will return the **byte length** of the stored object |


## Variance

This function can also return only the size of the object in the bucket.

```ts
// Size will be the byte length of the stored object
const size = await getObjectMetadata(params, true)
```