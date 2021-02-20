[DynamoDB](../../README.md#wrappers) **/** [Opinionated](../README.md) **/** [Very Opinionated](../README.md#very-opinionated) **/** Query

# Opinionated Query

An opinionated wrapper around `query`. This function assumes you have set the environment variables for the necessary key names.

## Usage

```ts
import { query, DynamoQueryOptions } from '@caldwell619/common-aws-actions'

interface ExpectedReturnType {
  somethingCool: string
}

const options: DynamoQueryOptions = {
  partitionKeySearchTerm: '',
  rangeKeySearchTerm: '',
}

const itemsIAmLookingFor = await query<ExpectedReturnType>(options)
```

## Arguments

| Name           | Type                                      |     Required?      | Description                                          |
| -------------- | ----------------------------------------- | :----------------: | ---------------------------------------------------- |
| `searchConfig` | [DynamoQueryOptions](#dynamoqueryoptions) | :white_check_mark: | The value of the partition key you are searching for |

## DynamoQueryOptions

| Name                         | Type                                                                                                                                           |     Required?      | Description                                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | :----------------: | -------------------------------------------------------------------------------------------------- |
| `partitionSearchTerm`        | `string`                                                                                                                                       | :white_check_mark: | The value of the partition key you are searching for                                               |
| `rangeSearchTerm`            | `string`                                                                                                                                       |        :x:         | The value of the range key you are searching for                                                   |
| `rangeKeyComparisonOperator` | [Comparison Operator](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Condition.html#DDB-Type-Condition-ComparisonOperator) |        :x:         | The operator Dynamo uses to determine if an item matches your query. The default is `BEGINS_WITH`. |
| `indexToQuery`               | `string`                                                                                                                                       |        :x:         | Used if you are querying on an index that is not the default, like a GSI or LSI                    |
