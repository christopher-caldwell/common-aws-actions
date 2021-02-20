[DynamoDB](./README.md#wrappers) **/** Delete Item

# Delete Item

Deletes an item from DynamoDB.

Keep in mind that you are charged as if you had just written this item. If you delete an item that took 1 WCU to write, you are charged at the same 1 WCU rate.
This makes deleting large amounts of items from Dynamo potentially expensive. Just a PSA.

## Usage

```ts
import { deleteItem, Key } from '@ihm-software/music-lab.common-aws-actions'

// This key is the Primary Key of your Dynamo record. `partitionKeyName` is used as a placeholder, this will be whatever you set your table up with.
const params: Key = {
  partitionKeyName: '',
  rangeKeyName: '',
}

const responseForDeletingAnItem = await deleteItem(params)
```

## Arguments

| Name                         | Type                                                                                              |     Required?      | Description                                                                                                                                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------- | :----------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tableName`                  | `string`                                                                                          | :white_check_mark: | The name of your DynamoDB table                                                                                                                                                                                                                  |
| `shouldThrowErrorOnNoResult` | `boolean`                                                                                         |        :x:         | If present, an error will be thrown if the item you looked for wasn't found. Normally the return is undefined. This eliminates the need to check for undefined before moving on. Default is **false**, meaning it **will not** throw by default. |
| `shouldLogParams`            | `boolean`                                                                                         |        :x:         | If present, the params you are sending to Dynamo will be logged. Useful for debugging when something goes unexpected                                                                                                                             |

