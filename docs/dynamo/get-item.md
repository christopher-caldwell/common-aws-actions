[DynamoDB](./README.md#wrappers) **/** Get Item

# Get Item

Gets an item from DynamoDB. Getting an item is the fastest way to use Dynamo.

You need to provide the entire key, meaning the partition and the range key exactly in order to get an item successfully.

## Usage

```ts
import { get, Key } from '@ihm-software/music-lab.common-aws-actions'

// This key is the Primary Key of your Dynamo record. `partitionKeyName` is used as a placeholder, this will be whatever you set your table up with.
const params: Key = {
  partitionKeyName: '',
  rangeKeyName: '',
}

const itemIAmLookingFor = await get(params)
```

## Arguments

| Name                         | Type                                                                                              |     Required?      | Description                                                                                                                                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------- | :----------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tableName`                  | `string`                                                                                          | :white_check_mark: | The name of your DynamoDB table                                                                                                                                                                                                                  |
| `key`                        | [Primary Key](https://aws.amazon.com/premiumsupport/knowledge-center/primary-key-dynamodb-table/) | :white_check_mark: | The key of the object you are looking for                                                                                                                                                                                                        |
| `shouldThrowErrorOnNoResult` | `boolean`                                                                                         |        :x:         | If present, an error will be thrown if the item you looked for wasn't found. Normally the return is undefined. This eliminates the need to check for undefined before moving on. Default is **false**, meaning it **will not** throw by default. |
| `shouldLogParams`            | `boolean`                                                                                         |        :x:         | If present, the params you are sending to Dynamo will be logged. Useful for debugging when something goes unexpected                                                                                                                             |
