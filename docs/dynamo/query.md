[DynamoDB](./README.md#wrappers) **/** Query

# Query

Queries a key for a list of items from DynamoDB.

With query, you do not need to provide the entire key, only an exact match of the partition key.

## Usage

```ts
import { queryItem, Key } from '@ihm-software/music-lab.common-aws-actions'

const params: Key = {
  partitionKeyName: '',
  rangeKeyName: '',
}

const itemsIAmLookingFor = await queryItem('table-name', params)
```

## Arguments

| Name                         | Type                                                                                              |     Required?      | Description                                                                                                                                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------- | :----------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `config`                     | [SearchConfig](#searchconfig)                                                                     | :white_check_mark: | The config to query. The detailed spec is listed below                                                                                                                                                                                           |
| `key`                        | [Primary Key](https://aws.amazon.com/premiumsupport/knowledge-center/primary-key-dynamodb-table/) | :white_check_mark: | The key of the object you are looking for                                                                                                                                                                                                        |
| `shouldThrowErrorOnNoResult` | `boolean`                                                                                         |        :x:         | If present, an error will be thrown if the item you looked for wasn't found. Normally the return is undefined. This eliminates the need to check for undefined before moving on. Default is **false**, meaning it **will not** throw by default. |
| `shouldLogParams`            | `boolean`                                                                                         |        :x:         | If present, the params you are sending to Dynamo will be logged. Useful for debugging when something goes unexpected                                                                                                                             |

## Interfaces

### SearchConfig

The search config mirrors Dynamo closely, but in a more readable way.

| Name                         | Type                                                                                                                                           |     Required?      | Description                                                                                                                                                                                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | :----------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tableName`                  | `string`                                                                                                                                       | :white_check_mark: | The name of your DynamoDB table                                                                                                                                                                                                              |
| `partitionKeyName`           | `string`                                                                                                                                       | :white_check_mark: | The name of your table's partition key                                                                                                                                                                                                       |
| `partitionKeyName`           | `string`                                                                                                                                       | :white_check_mark: | The term you are searching for. **Must be an exact match.**                                                                                                                                                                                  |
| `rangeKeyName`               | `string`                                                                                                                                       |        :x:         | The name of your table's range key                                                                                                                                                                                                           |
| `rangeKeySearchTerm`         | `string`                                                                                                                                       |        :x:         | The term you are searching for. Can be a variety of options, when used with `rangeKeyComparisonOperator`                                                                                                                                     |
| `rangeKeyComparisonOperator` | [Comparison Operator](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Condition.html#DDB-Type-Condition-ComparisonOperator) |        :x:         | The operator Dynamo uses to determine if an item matches your query                                                                                                                                                                          |
| `indexToQuery`               | `string`                                                                                                                                       |        :x:         | If using a [GSI](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html) or [LSI](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html), use this to tell Dynamo to query based on alternate indexes |
| `filterExpression`           | `string`                                                                                                                                       |        :x:         | [Filter Expression Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html#Query.FilterExpression)                                                                                                                |
| `projectionExpression`       | `string`                                                                                                                                       |        :x:         | [Projection Expression Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ProjectionExpressions.html)                                                                                                       |
