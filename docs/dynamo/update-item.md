[DynamoDB](./README.md#wrappers) **/** Update Item

# Update Item

Updates a property in an item

You may only update root level properties. Individual nested updates are not supported by AWS. Alternatively, you can update a root level property with the nested properties updated, rather than re-writing the whole object.

Updating an object is challenging. If you do not have experience doing so, I recommend [the opinionated version](./opinionated/update-item.md).

## Usage

```ts
import { basicUpdateItem, UpdateItemInput } from '@caldwell619/common-aws-actions'

const params: UpdateItemInput = {
  TableName: 'table',
  Key: {
    partition: '123',
    range: '123',
  },
  ExpressionAttributeNames: { '#new_key': 'thePropertyYouWantToUpdate' },
  ExpressionAttributeValues: { ':nv': 'newValueOfThatPropertyAbove' },
  UpdateExpression: 'set #new_key = :nv',
}

// this will set the `thePropertyYouWantToUpdate` key inside the record to `newValueOfThatPropertyAbove`
const responseForDeletingAnItem = await basicUpdateItem(params)
```

## Arguments

| Name              | Type                                                                                                  |     Required?      | Description                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------- | :----------------: | -------------------------------------------------------------------------------------------------------------------- |
| `tableName`       | `string`                                                                                              | :white_check_mark: | The name of your DynamoDB table                                                                                      |
| `config`          | [UpdateItemInput](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html) | :white_check_mark: | The config sent to the SDK to update your item                                                                       |
| `shouldLogParams` | `boolean`                                                                                             |        :x:         | If present, the params you are sending to Dynamo will be logged. Useful for debugging when something goes unexpected |
