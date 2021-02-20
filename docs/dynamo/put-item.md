[DynamoDB](./README.md#wrappers) **/** Put Item

# Put Item

Writes an item to DynamoDB

When an item is written to Dynamo, it overwinters the previous key. There is not a concept of updating nested properties, the entire object is re-written.

## Usage

```ts
import { basicPutItem } from '@caldwell619/common-aws-actions'

const item = {
  anythingYouWant: 123,
}

const responseFromDynamo = await basicPutItem('table-name', item)
```

## Arguments

| Name              | Type                  |     Required?      | Description                                                                                                          |
| ----------------- | --------------------- | :----------------: | -------------------------------------------------------------------------------------------------------------------- |
| `tableName`       | `string`              | :white_check_mark: | The name of your DynamoDB table                                                                                      |
| `item`            | `Record<string, any>` | :white_check_mark: | Any valid Dynamo item. Must include the partition key of the table.                                                  |
| `shouldLogParams` | `boolean`             |        :x:         | If present, the params you are sending to Dynamo will be logged. Useful for debugging when something goes unexpected |
