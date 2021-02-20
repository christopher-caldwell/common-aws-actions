[DynamoDB](../README.md#wrappers) **/** [Opinionated](./README.md) **/** Get Item

# Opinionated Update Item

This is a simplified version of [update item](../update-item.md), that makes the usage a little more straightforward.

## Usage

```ts
import { updateItem, UpdateItemArgs } from '@ihm-software/music-lab.common-aws-actions'

const updateConfig: UpdateItemArgs = {
  propertyToUpdate: 'price',
  newValueOfProperty: 100,
  primaryKey: {
    partition: '123',
    range: '234',
  },
}

// The key holding the `price` of the record, will now be `100`
const response = await updateItem('partitionKeyValue', 'rangeKeyValue')
```

## Arguments

| Name              | Type                              |     Required?      | Description                                                                                                          |
| ----------------- | --------------------------------- | :----------------: | -------------------------------------------------------------------------------------------------------------------- |
| `tableName`       | `string`                          | :white_check_mark: | Name of the Dynamo table the record lives on                                                                         |
| `rangeSearchTerm` | [UpdateItemArgs](#updateitemargs) | :white_check_mark: | TThe config to update the record                                                                                     |
| `shouldLogParams` | `boolean`                         |        :x:         | If present, the params you are sending to Dynamo will be logged. Useful for debugging when something goes unexpected |

## UpdateItemArgs

| Name                 | Type                                             |     Required?      | Description                                                                                                                                                                                                                                                                                  |
| -------------------- | ------------------------------------------------ | :----------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `propertyToUpdate`   | `string`                                         | :white_check_mark: | The key name of the property you wish to update. **Must** be at the root level of the object                                                                                                                                                                                                 |
| `newValueOfProperty` | `string` / `number` / `boolean` / `AttributeMap` | :white_check_mark: | The new value to be stored in the `propertyToUpdate` key                                                                                                                                                                                                                                     |
| `primaryKey`         | `Record<string, string>`                         | :white_check_mark: | The primary key of the record you are updating. This is how Dynamo finds the record to update.                                                                                                                                                                                               |
| `updateExpression`   | `string`                                         |        :x:         | This is optional, and if you need to override this, consider using [the lower level version](../update-item.md). A more detailed explanation can be found [here](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html#DDB-UpdateItem-request-UpdateExpression) |
| `returnValues`       | `string`                                         |        :x:         | The return influencer. A more detailed explanation can be found [here](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html#API_UpdateItem_RequestSyntax)                                                                                                      |
