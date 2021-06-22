[S3](./README.md#wrappers) / Get Object

# Get Object

Gets an object stored in an S3 bucket

## Usage

```ts
import { getObject, GetObjectRequest } from '@caldwell619/common-aws-actions'

const params: GetObjectRequest = {
  Bucket: '',
  Key: '',
}

const object = await getObject(params)
```

## Arguments

| Name     | Type                                                                                                   | Required?          | Description |
| -------- | ------------------------------------------------------------------------------------------------------ | :------------------: | - |
| `params` | [GetObjectRequest](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property) | :white_check_mark: | The args sent to S3 to retrieve the object |
| `isJson` | `Boolean`                                                                                              | :x:                | If the object is stored as JSON, it will natively come back as a string. Adding this will parse that string into JSON |
